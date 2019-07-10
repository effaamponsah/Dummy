import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import ProfileNav from "./ProfileNav";
import CatScreen from "../screens/Categories";
import Product from "../screens/Product";
import Cart from "../screens/Cart";
import { colors } from "../constants/index";
import SubCategories from "../screens/SubCategories";
import { Icon } from "native-base";
import React from "react";
import RepairsNav from "./RepairsNav";
import primarystyle from "../utils";
import Products from "../screens/Products";
import Search from "../screens/Search";
import Featured from "../screens/Featured";
import NoInternet from "../screens/NoConnection";
import Anomally from "../screens/Assesories";
import CartIcon from "../components/ShoppingCartIcon";
import Checkout from "../screens/Checkout";
import PaymentAddress from "../screens/PaymentAddress";
import ShippingAddress from "../screens/ShippingAddress";
import PaymentMethod from "../screens/PaymentMethod";
import ShippingMethods from "../components/ShippingMethods";
import GuestUser from "../screens/GuestUser";
import GuestDetails from "../screens/GuestDetails";
import GuestShipping from "../screens/GuestShipping";
import History from "../screens/History";
import Confirm from "../screens/Confirm";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Categories: CatScreen,
    Product: Product,
    SubCat: SubCategories,
    Products: Products,
    Search: Search,
    Featured: Featured,
    Nointernet: NoInternet,
    Anomally: Anomally
  },
  {
    defaultNavigationOptions: {
      ...primarystyle
    }
  }
);

const CartStack = createStackNavigator(
  {
    Cart: Cart,
    Checkout: Checkout,
    PaymentAddress: PaymentAddress,
    ShippingAddress: ShippingAddress,
    PaymentMethod: PaymentMethod,
    ShippingMethod: ShippingMethods,
    Guest: GuestUser,
    GuestDetails: GuestDetails,
    GuestShipping: GuestShipping,
    Confirm: Confirm
  },
  {
    defaultNavigationOptions: {
      ...primarystyle
    }
  }
);

const Tab = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" style={{ color: tintColor }} type="AntDesign" />
        )
      })
    },

    // The cart would have to be re rendered with the component suit the badges
    Cart: {
      screen: CartStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          // <Icon name="cart" style={{ color: tintColor }} />
          <CartIcon color={tintColor} />
        )
      })
    },
    Repairs: {
      screen: RepairsNav,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="setting" style={{ color: tintColor }} type="AntDesign" />
        )
      })
    },
    Profile: {
      screen: ProfileNav,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" style={{ color: tintColor }} type="Entypo" />
        )
      })
    }
  },
  {
    tabBarOptions: {
      activeTintColor: colors.primaryHeaderColor,
      inactiveTintColor: colors.primaryGrey
    }
  }
);

export default (TabNav = createAppContainer(Tab));
