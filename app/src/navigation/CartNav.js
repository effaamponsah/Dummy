import { createStackNavigator } from "react-navigation";
import Cart from "../screens/Cart";
import Checkout from "../screens/Checkout";
import PaymentAddress from "../screens/PaymentAddress";
import ShippingAddress from "../screens/ShippingAddress";
import PaymentMethod from "../screens/PaymentMethod";
import ShippingMethods from "../components/ShippingMethods";
import GuestUser from "../screens/GuestUser";
import GuestDetails from "../screens/GuestDetails";
import GuestShipping from "../screens/GuestShipping";
import Confirm from "../screens/Confirm";
import Done from "../screens/Thankyou";
export default (CartStack = createStackNavigator(
    {
        Cart: Cart,
        Checkout: Checkout,
        PaymentAddress: PaymentAddress,
        ShippingAddress: ShippingAddress,
        PaymentMethod: PaymentMethod,
        Done: Done,
        ShippingMethod: ShippingMethods,
        Guest: GuestUser,
        GuestDetails: GuestDetails,
        GuestShipping: GuestShipping,
        Confirm: Confirm,
    },
    {
        defaultNavigationOptions: {
            ...primarystyle
        }
    }
));
