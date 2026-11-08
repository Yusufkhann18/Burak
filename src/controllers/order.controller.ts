import { Response } from "express";
import { ExtendedRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import Errors, { HttpCode } from "../libs/Error";
import OrderService from "../model/Order.service";
import { OrderInquiry } from "../libs/types/order";
import { OrderStatus } from "../libs/enums/order.enum";

const orderService = new OrderService();
const orderController: T = {};

orderController.createOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    const result = await orderService.createOrder(req.member, req.body);
    res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

orderController.getMyOrders = async (req: ExtendedRequest, res: Response) => {
  try {
    const { page, limit, orderStatus } = req.query;
    const inquiry: OrderInquiry = {
      page: page === undefined ? 1 : Number(page),
      limit: limit === undefined ? 10 : Number(limit),
      orderStatus: orderStatus as OrderStatus | undefined,
    };
    const result = await orderService.getMyOrders(req.member, inquiry);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

orderController.updateOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    const result = await orderService.updateOrder(req.member, req.body);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default orderController;
