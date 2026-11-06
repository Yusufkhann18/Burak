import Errors, { HttpCode, Message } from "../libs/Error";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import ProductService from "../model/Product.service";
import { ProductCollection } from "../libs/enums/product.enum";
import { ProductInquiry } from "../libs/types/product";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { ProductInput, ProductUpdateInput } from "../libs/types/product";
const productService = new ProductService();

const productController: T = {};
/* SPA */

productController.getProducts = async (req: Request, res: Response) => {
    try {
        console.log("getProducts");
        const {page, limit, order, productCollection, search} = req.query;
        const inquiry: ProductInquiry = {
            order: order ? String(order) : "createdAt",
            page: page === undefined ? 1 : Number(page),
            limit: limit === undefined ? 10 : Number(limit),
        };
        if (!Number.isInteger(inquiry.page) || inquiry.page < 1 ||
            !Number.isInteger(inquiry.limit) || inquiry.limit < 1 || inquiry.limit > 100 ||
            !["createdAt", "updatedAt", "productPrice", "productViews", "productName"].includes(inquiry.order))
            throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
        if (productCollection && !Object.values(ProductCollection).includes(productCollection as ProductCollection))
            throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
        if (productCollection)
            inquiry.productCollection = productCollection as ProductCollection;
        if (search) inquiry.search = String(search);

        const result = await productService.getProducts(inquiry);

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getProducts: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

productController.getProduct = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("getProduct");
        if (!/^[a-f0-9]{24}$/i.test(String(req.params.id)))
            throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
        const id: string = req.params.id as string,
            memberId = req.member?._id ?? null,
            result = await productService.getProduct(memberId, id);

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getProduct: ", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};



/* SSR */
productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    const data = await productService.getAllProducts();

    res.render("products", { products: data });
  } catch (err) {
    console.error("Error getAllProducts page:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("createNewProduct");
    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);
    const data: ProductInput = req.body;
    data.productImages = req.files.map((ele) => {
      return ele.path;
    });
    await productService.createNewProduct(data);
    res.send(
      `<script>alert('Successful creation!'); window.location.replace('/admin/product/all')</script>`,
    );
  } catch (err) {
    console.error("Error createNewProduct page:", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;

    res.send(
      `<script>alert('${message} !'); window.location.replace('/admin/product/all')</script>`,
    );
  }
};

productController.updateChosenProduct = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("updateChosenProduct");
    const id = req.params.id;
    const data: ProductUpdateInput = req.body;
    if (req.files?.length) {
      data.productImages = req.files.map((ele) => ele.path);
    }

    const result = await productService.updateChosenProduct(id, data);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.error("Error updateChosenProduct page:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
    //res.json({member:err})
  }
};
export default productController;
