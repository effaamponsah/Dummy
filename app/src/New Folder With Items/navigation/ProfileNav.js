import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Login from "../screens/SignIn";
import Recovery from "../screens/AccountRecovery";
import primarystyle from "../utils";
import ProfileScreen from "../screens/ProfileScreen";
import Account from "../screens/Account";
import AuthLoading from "../screens/AuthLoading";
import Settings from "../screens/Settings";
import AccountSettings from "../screens/AccountSettings";
import WishlistItems from "../screens/WishListItems";
// export default (ProfileNav = createStackNavigator(
//   {
//     Profile: Profile,
//     SignUp: Register,
//     Login: Login,
//     Recovery: Recovery
//     // Main: ProfileScreen
//   },
//   {
//     defaultNavigationOptions: {
//       ...primarystyle
//     }
//   }
// ));

const AccountStack = createStackNavigator(
  {
    Account: Account,
    Settings: Settings,
    AccountSettings: AccountSettings,
    WishList: WishlistItems
  },
  {
    defaultNavigationOptions: {
      ...primarystyle
    }
  }
);

const AuthStack = createStackNavigator(
  {
    Profile: Profile,
    SignUp: Register,
    Login: Login,
    Recovery: Recovery
    // Main: ProfileScreen
  },
  {
    defaultNavigationOptions: {
      ...primarystyle
    }
  }
);

export default (ProfileNav = createSwitchNavigator(
  {
    Account: AccountStack,
    Auth: AuthStack,
    AuthLoading: AuthLoading
  },
  {
    initialRouteName: "AuthLoading"
  }
));

// The lines below sets the navigation route to remove the nav

// Auth.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }

//   return {
//     tabBarVisible
//   };
// };
