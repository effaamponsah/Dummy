
import { Platform } from 'react-native';
import { colors } from '../constants';

// Primary header configurations
export default primarystyle = {
  headerTitleStyle: {
    color: Platform.OS == 'ios' ? 'black' : colors.white
  },
  // headerTintColor: "#ffff",
  headerTintColor: Platform.OS === 'ios' ? colors.primaryBlue : colors.white,
  headerStyle: {
    //  backgroundColor: '#539310',
    // backgroundColor: colors.primaryHeaderColor
    // backgroundColor: Platform.OS == 'ios' ? colors.primaryBlue : colors.primaryHeaderColor,
    //  headerTitleStyle: {
    //   color: Platform.OS == 'android' ? 'black' : colors.white}
  }
};