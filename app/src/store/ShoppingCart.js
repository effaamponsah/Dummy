import { types } from "mobx-state-tree";
import { ProductModel } from "../models/Product";

export const ShoppingCartstore = types.model("ShoppingCart",{
  products: types.maybe(types.array(types.reference(ProductModel))),
  items: types.optional(types.array(ProductModel), [])
})
.actions(self => ({
  addProduct(newProduct){
    self.products.push(newProduct)
  },
  add(item){
    self.items.push(item)
  },
  remove(){
    self.items.length = 0
  }
}))
