import { Icon } from "native-base";
import React from "react";
const baseUrl = "https://moscophones.com/index.php?route=feed/rest_api";
const rootUrl = "https://moscophones.com/index.php?";
export const colors = {
  // primaryHeaderColor : '#559213',
  primaryHeaderColor: "#63b011",
  primaryBlue: "#04a1c0",
  white: "#ffffff",
  primaryGrey: "#999999",
  facebookColor: "#43609c",
  darkgreen: "#447510",
  primaryBackground: "#ece9e9",
  violet: "#600088"
};

export const api = {
  loginUrl: "https://moscophones.com/index.php?route=rest/login/login",
  logoutUrl: "https://moscophones.com/index.php?route=rest/logout/logout",
  newCat: "https://moscophones.com/index.php?route=feed/rest_api/categories",
  new: "http://moscophones.com/index.php?route=feed/rest_api/categories",
  newArrivals: baseUrl + "/latest&limit=5",
  // Something seemed wrong with the endpoint bellow, 'limit=4' gives 3 responses
  featuredItems: baseUrl + "/featured&limit=4",
  product: baseUrl + "/products&id=",
  passwordreset: rootUrl + "route=rest/forgotten/forgotten",
  session: rootUrl + "route=feed/rest_api/session",
  subCat: rootUrl + "route=feed/rest_api/categories&id=",
  products: rootUrl + "route=feed/rest_api/products&category=",
  accountDetails: rootUrl + "route=rest/account/account",
  newArrivalAll: rootUrl + "route=feed/rest_api/latest",
  addToWishList: rootUrl + "route=rest/wishlist/wishlist&id=",
  viewCart: rootUrl + "route=rest/cart/cart",
  register: rootUrl + "route=rest/register/register",
  addToCart: rootUrl + "route=rest/cart/cart",
  search: rootUrl + "route=feed/rest_api/products&search=",
  removeItem: rootUrl + "route=rest/cart/cart",
  relatedItems: rootUrl + "route=feed/rest_api/related&id=",
  moreByManufaturer: rootUrl + "route=feed/rest_api/products&manufacturer=",
  getAddress: rootUrl + "route=rest/account/address",
  bulkEmpty: rootUrl + "route=rest/cart/emptycart",
  socialLogin: rootUrl + "route=rest/login/sociallogin",
  shippingAddress: rootUrl + "route=rest/shipping_address/shippingaddress",
  paymentAddress: rootUrl + "route=rest/payment_address/paymentaddress",
  shippingMethod: rootUrl + "route=rest/shipping_method/shippingmethods",
  paymentMethod: rootUrl + "route=rest/payment_method/payments",
  passwordUpdate: rootUrl + "route=rest/account/password",
  viewWishlist: rootUrl + "route=rest/wishlist/wishlist",
  confirm: rootUrl + "route=rest/confirm/confirm",
  trackOrder: rootUrl + "route=rest/order/orders&id=",
  guestlogin: rootUrl + "route=rest/guest/guest",
  guestshipping: rootUrl + "route=rest/guest_shipping/guestshipping",
  history: rootUrl + "route=rest/order/orders",
  updateCart: rootUrl + "route=rest/cart/updatecartv2"
};

export const slideShowImages = [
  {
    // text: "IPhone XS",
    // description: "New Arrival: Beautiful Design",
    img: require("../../assets/images/iphoneXs.jpg")
  },
  {
    // text: "Oculus Rift",
    // description: "New Arrival: Beautiful Design",
    img: require("../../assets/images/oculus.jpg")
  },
  {
    // text: "Airpod 2",
    // description: "New Arrival: Beautiful Design",
    img: require("../../assets/images/airpods2.jpg")
  }
];

export const Regions = [
  {
    title: "Ashanti Region",
    value: "Ashanti"
  },
  {
    title: "Volta Region",
    value: "Volta"
  },
  {
    title: "Greater Accra Region",
    value: "Accra"
  },
  {
    title: "Northen Region",
    value: "Northen"
  },
  {
    title: "Brong Ahafo Region",
    value: "Brong Ahafo"
  },
  {
    title: "Western Region",
    value: "Western"
  },
  {
    title: "Eatern Region",
    value: "Eastern"
  },
  {
    title: "Central Region",
    value: "Central"
  },
  {
    title: "Upper East Region",
    value: "Upper East"
  },
  {
    title: "Upper West Region",
    value: "Upper West"
  }
];

export const AccountPageLinks = [
  {
    link: "WishList",
    title: "Wish list",
    icon: (
      <Icon
      name="hearto"
      style={{ color: colors.primaryGrey }}
      type="AntDesign"
    />
    )
  },
  {
    link: "History",
    title: "Order History",
    icon: (
      <Icon
        name="book"
        style={{ color: colors.primaryGrey }}
        type="AntDesign"
      />
    )
  },
  {
    link: "Track",
    title: "Track your orders",
    icon: (
      <Icon
        name="track-changes"
        style={{ color: colors.primaryGrey }}
        type="MaterialIcons"
      />
    )
  },
  {
    link: "AccountSettings",
    title: "Edit Personal Information",
    icon: (
      <Icon
      name="setting"
      style={{ color: colors.primaryGrey }}
      type="AntDesign"
    />
    )
  },
  {
    link: "PasswordUpdate",
    title: "Update Password",
    icon: (
      <Icon
        name="unlock"
        style={{ color: colors.primaryGrey }}
        type="AntDesign"
      />
    )
  },
  // {
  //   link: "AddressEdit",
  //   title: "Edit Addresses",
  //   icon: (
  //     <Icon
  //       name="email-open"
  //       style={{ color: colors.primaryGrey }}
  //       type="MaterialCommunityIcons"
  //     />
  //   )
  // },
  {
    link: "About",
    title: "About App",
    icon: (
      <Icon
        name="information-outline"
        style={{ color: colors.primaryGrey }}
        type="MaterialCommunityIcons"
      />
    )
  }
];

export const headerimg = {
  Assesories: require("../../assets/images/accessories.jpg"),
  Laptops: require("../../assets/images/laptops.jpg"),
  "Mobile Phones": require("../../assets/images/phones_header.jpg"),
  Tablets: require("../../assets/images/others.jpg"),
  "Modems/Routers": require("../../assets/images/others.jpg"),
  Other: require("../../assets/images/others.jpg")
};
