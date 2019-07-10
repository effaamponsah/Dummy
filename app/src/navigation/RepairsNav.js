import { createStackNavigator } from "react-navigation";
import { Repairs, MainRepairs } from "../screens/Repairs";

import primarystyle from "../utils";
export default (RepairsNav = createStackNavigator(
  {
    Welcome: Repairs,
    Main: MainRepairs
  },
  {
    defaultNavigationOptions: {
      ...primarystyle
    }
  }
));
