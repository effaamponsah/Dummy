import { ProductStore } from "./Products";
import { ShoppingCartstore } from "./ShoppingCart";
import { ProductModel } from "../models/Product";

const shoppingcartstore = ShoppingCartstore.create({ products: [] }); //when a user visits the app for the first time,
//the products is empty

const productStore = ProductStore.create({
  data: [
    ProductModel.create({
      id: '1',
      name: "Iphone",
      price: 200
    }),
    ProductModel.create({
      id:'2',
      name: "Samsung",
      price: 400
    })
  ]
});

export const store = {
  shoppingcartstore,
  productStore
};

// window.MobxStore = store
