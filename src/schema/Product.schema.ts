import mongoose, { Schema } from "mongoose";
import { Member } from "../libs/types/member";
import {
  ProductCollection,
  ProductSize,
  ProductStatus,
  ProductVolume,
} from "../libs/enums/product.enum";
import { Product } from "../libs/types/product";

const productSchema = new Schema<Product>(
  {
    productStatus: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.PUASE,
    },
    productCollection: {
      type: String,
      enum: ProductCollection,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productLeftCount: {
      type: Number,
      required: true,
    },
    productSize: {
      type: String,
      enum: ProductSize,
      default: ProductSize.NORMAL,
    },
    productVolume: {
      type: Number,
      enum: ProductVolume,
      default: ProductVolume.ONE,
    },
    productDesc: {
      type: String,
    },
    productImages: {
      type: [String],
      default: [],
    },
    productViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
productSchema.index(
  { productName: 1, productSize: 1, productVolume: 1 },
  { unique: true },
);
export default mongoose.model<Product>("Product", productSchema);
