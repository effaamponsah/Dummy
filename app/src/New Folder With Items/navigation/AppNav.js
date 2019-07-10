import {createStackNavigator, createAppContainer} from 'react-navigation';
import Categories from '../components/Categories';
import CatScreen from '../screens/Categories';


const Main = createStackNavigator({
    Categories: Categories,
    CatScreen: CatScreen
})


export default MainNav = createAppContainer(Main)