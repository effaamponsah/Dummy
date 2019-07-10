import { types } from "mobx-state-tree";
import { ProductModel } from "../models/Product";

export const ProductStore = types.model({
  data: types.maybe(types.array(types.reference(ProductModel)))
});
