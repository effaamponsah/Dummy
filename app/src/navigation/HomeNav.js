import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import CatScreen from "../screens/Categories";
import Product from "../screens/Product";
import SubCategories from "../screens/SubCategories";
import Products from "../screens/Products";
import Search from "../screens/Search";
import Featured from "../screens/Featured";
import NoInternet from "../screens/NoConnection";
import Anomally from "../screens/Assesories";
import primarystyle from "../utils";
import Related from "../components/Related";
import CardItems from "../components/Card";

const HomeNav = createStackNavigator(
    {
        Home: HomeScreen,
        Categories: CatScreen,
        Product: Product,
        SubCat: SubCategories,
        Products: Products,
        Search: Search,
        Featured: Featured,
        Nointernet: NoInternet,
        Anomally: Anomally,
        Related: Related,
        Cards: CardItems
    },
    {
        defaultNavigationOptions: {
            ...primarystyle
        }
    }
);

export default createAppContainer(HomeNav);
