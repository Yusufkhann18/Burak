import Errors, { HttpCode, Message } from "../libs/Error";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import ProductService from "../model/Product.service";
import { AdminRequest } from "../libs/types/member";
import { ProductInput } from "../libs/types/product";
const productService = new ProductService();

const productController: T = {};
/* SPA */

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
      `<script>alert('Sucessful creation!'); window.location.replace('/admin/product/all')</script>`,
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

productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");
    const id = req.params.id;
    const result = await productService.updateChosenProduct(id, req.body);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.error("Error updateChosenProduct page:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
    //res.json({member:err})
  }
};
export default productController;
