import { Types } from "mongoose";
import { Member } from "../libs/types/member";
import { Order, OrderInquiry, OrderItemInput, OrderUpdateInput } from "../libs/types/order";
import { OrderStatus } from "../libs/enums/order.enum";
import { ProductStatus } from "../libs/enums/product.enum";
import Errors, { HttpCode, Message } from "../libs/Error";
import { shapeIntoMongooseObjectId } from "../libs/config";
import OrderModel from "../schema/Order.model";
import OrderItemModel from "../schema/OrderItem.model";
import ProductModel from "../schema/Product.schema";
import MemberService from "./Member.service";

class OrderService {
  private readonly orderModel = OrderModel;
  private readonly orderItemModel = OrderItemModel;
  private readonly productModel = ProductModel;
  private readonly memberService = new MemberService();

  public async createOrder(member: Member, input: OrderItemInput[]): Promise<Order> {
    if (!Array.isArray(input) || input.length === 0 || input.length > 100 ||
      input.some(item => !item || typeof item.productId !== "string" ||
        !/^[a-f0-9]{24}$/i.test(item.productId) ||
        !Number.isSafeInteger(item.itemQuantity) || item.itemQuantity < 1)) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }

    // Use current catalogue prices, never prices supplied by the client.
    const quantities = new Map<string, number>();
    for (const item of input) {
      const id = item.productId.toLowerCase();
      const quantity = (quantities.get(id) ?? 0) + item.itemQuantity;
      if (!Number.isSafeInteger(quantity))
        throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
      quantities.set(id, quantity);
    }
    const products = await this.productModel.find({
      _id: { $in: [...quantities.keys()].map(id => new Types.ObjectId(id)) },
      productStatus: ProductStatus.PROCESS,
    }).exec();
    if (products.length !== quantities.size)
      throw new Errors(HttpCode.BAD_REQUEST, Message.NO_DATA_FOUND);

    const items = products.map(product => {
      const itemQuantity = quantities.get(String(product._id))!;
      if (itemQuantity > product.productLeftCount ||
        !Number.isFinite(product.productPrice) || product.productPrice < 0)
        throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
      return { productId: product._id, itemQuantity, itemPrice: product.productPrice };
    });
    const amount = items.reduce((total, item) => total + item.itemPrice * item.itemQuantity, 0);
    if (!Number.isFinite(amount))
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    const delivery = amount < 100 ? 5 : 0;
    const newOrder = await this.orderModel.create({
      orderTotal: amount + delivery,
      orderDelivery: delivery,
      memberId: shapeIntoMongooseObjectId(member._id),
    });
    try {
      await this.recordOrderItem(newOrder._id, items);
    } catch (err) {
      // Clean up partial writes without requiring a different MongoDB setup.
      await this.orderItemModel.deleteMany({ orderId: newOrder._id }).exec();
      await this.orderModel.deleteOne({ _id: newOrder._id }).exec();
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
    return newOrder;
  }

  private async recordOrderItem(
    orderId: Types.ObjectId,
    input: { productId: Types.ObjectId; itemQuantity: number; itemPrice: number }[],
  ): Promise<void> {
    await this.orderItemModel.insertMany(input.map(item => ({ ...item, orderId })));
  }

  public async getMyOrders(member: Member, inquiry: OrderInquiry): Promise<Order[]> {
    if (!Number.isSafeInteger(inquiry.page) || inquiry.page < 1 ||
      !Number.isSafeInteger(inquiry.limit) || inquiry.limit < 1 || inquiry.limit > 100 ||
      !Number.isSafeInteger((inquiry.page - 1) * inquiry.limit) ||
      (inquiry.orderStatus !== undefined && !Object.values(OrderStatus).includes(inquiry.orderStatus)))
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
    const matches = {
      memberId: shapeIntoMongooseObjectId(member._id),
      ...(inquiry.orderStatus === undefined ? {} : { orderStatus: inquiry.orderStatus }),
    };
    return this.orderModel.aggregate([
      { $match: matches },
      { $sort: { updatedAt: -1, _id: -1 } },
      { $skip: (inquiry.page - 1) * inquiry.limit },
      { $limit: inquiry.limit },
      { $lookup: {
        from: this.orderItemModel.collection.name,
        localField: "_id", foreignField: "orderId", as: "orderItems",
      } },
      { $lookup: {
        from: this.productModel.collection.name,
        localField: "orderItems.productId", foreignField: "_id", as: "productData",
      } },
    ]).exec();
  }

  public async updateOrder(member: Member, input: OrderUpdateInput): Promise<Order> {
    if (!input || typeof input.orderId !== "string" || !/^[a-f0-9]{24}$/i.test(input.orderId) ||
      !Object.values(OrderStatus).includes(input.orderStatus))
      throw new Errors(HttpCode.BAD_REQUEST, Message.UPDATE_FAILED);
    const filter = {
      memberId: shapeIntoMongooseObjectId(member._id),
      _id: new Types.ObjectId(input.orderId),
    };
    const current = await this.orderModel.findOne(filter).exec();
    if (!current) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    if (current.orderStatus === input.orderStatus) return current;
    const transitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PAUSE]: [OrderStatus.PROCESS, OrderStatus.DELETE],
      [OrderStatus.PROCESS]: [OrderStatus.FINISH],
      [OrderStatus.FINISH]: [],
      [OrderStatus.DELETE]: [],
    };
    if (!transitions[current.orderStatus]?.includes(input.orderStatus))
      throw new Errors(HttpCode.BAD_REQUEST, Message.UPDATE_FAILED);
    const result = await this.orderModel.findOneAndUpdate(
      { ...filter, orderStatus: current.orderStatus },
      { $set: { orderStatus: input.orderStatus } },
      { new: true, runValidators: true },
    ).exec();
    if (!result) throw new Errors(HttpCode.BAD_REQUEST, Message.UPDATE_FAILED);
    // Only the request that changes PAUSE to PROCESS can award a point.
    if (input.orderStatus === OrderStatus.PROCESS)
      await this.memberService.addUserPoint(member, 1);
    return result;
  }
}

export default OrderService;
