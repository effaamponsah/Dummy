import { types } from "mobx-state-tree";
import { store } from "../store";

export const ProductModel = types
  .model("ProductModel", {
    id: types.identifier,
    // name: types.string,
    // qty: 0,
    // inCart: false,
    // cartQty: 0,
    // price: types.number
  })
  .actions(self => ({
    incCart() {
      self.qty += 1;
    },
    addToCart(x) {
      store.shoppingcartstore.addProduct(x);
      self.inCart = true
      // self.incCart();
    }
  }));
