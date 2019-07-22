import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  WebView
} from "react-native";
import { Icon } from "native-base";
import { colors } from "../constants";
import PrimaryButton from "../components/PrimaryButton";
import NavigationService from "../navigation/NavigationService";

let userToken;
export default class Done extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      token: false
    };
  }

  componentDidMount = async () => {
    // userToken = await AsyncStorage.getItem("userToken");
    try {
      const value = await AsyncStorage.getItem("userToken");
      if (value !== null) {
        // We have data!!
        this.setState({ token: true });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  homePress = () => {
    NavigationService.popTotop();
    NavigationService.navigate("Home");
  };
  cancelPress = () => {
    // NavigationService.popTotop();
    // NavigationService.navigate("Cart");
    NavigationService.navigate("Home");


  };

  track = () => {
    NavigationService.popTotop();
    NavigationService.navigate("Track");
  };

  confirm = () => {
    NavigationService.popTotop();
    NavigationService.navigate("Portals");
  };
  render() {
    const { token } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.cancelPress}
          style={{ marginLeft: 30, marginTop: 50 }}
        >
          <Icon
            name="closecircleo"
            type="AntDesign"
            // color={colors.primaryHeaderColor}
            fontSize={10}
          />
        </TouchableOpacity>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Icon
            name="ios-checkbox-outline"
            style={{ color: colors.primaryHeaderColor, fontSize: 180 }}
          />
        </View>
        <View style={styles.middle}>
          <Text style={{ color: "black", fontSize: 25, fontWeight: "bold" }}>
            Thank you
          </Text>
          <Text>Order Successfully placed</Text>
          <Text>Check your email for your order ID</Text>
          <View style={{ marginTop: 10 }}>
            <PrimaryButton btntitle="Shop again" func={this.homePress} />
            {/* I display the track oders to only users that are signed in */}
            {token ? (
              <TouchableOpacity
                onPress={this.track}
                style={{
                  flex: 1,
                  marginTop: -20,
                  alignItems: "center"
                }}
              >
                <Text style={{ color: colors.primaryBlue }}>Track Order</Text>
              </TouchableOpacity>
            ) : null}
            {/* <TouchableOpacity
              onPress={this.confirm}
              style={{
                flex: 1,
                marginTop: -20,
                alignItems: "center"
              }}
            >
              <Text style={{ color: colors.primaryBlue }}>Confirm Payment</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  middle: {
    flex: 1,
    alignItems: "center"
  }
});
