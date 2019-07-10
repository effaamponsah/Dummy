import { User } from "./Test";
import { ProductModel } from "./Product";
import { Session } from "./Session";

import axios from "axios";
import { api } from "../constants";

hamza =() => {
  axios
  .get(api.session)
  .then(res => {
    // Session.create({
    //   session: res.data.data
    // })
  return res.data.data
  })
  .catch(e => {
    console.log("Error", e);
  });
}

const me = Session.create({
  session: '2nhdod9f7qff1porq16lv6hkk7'
})
const user = User.create();
const product = ProductModel.create();

export const store = {
  user,
  product, 
  me
};

// window.MobxStore = store
