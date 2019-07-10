import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { colors } from "../constants";
const height = Dimensions.get("window");
export default class Profile extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      userToken: ""
    };
  }

  render() {
    if (this.state.userToken == "") {
      return (
        <View style={styles.container}>
          <View style={{ marginBottom: 15, width: 250 }}>
            <Text style={{ fontSize: 35, fontWeight: "bold" }}>
              Login to your account
            </Text>
          </View>

          {/* Description */}
          <View style={{ marginRight: 90 }}>
            <Text>
              You get the chance to track your orders, check your history and do
              more
            </Text>
          </View>

          {/* Buttons */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.primaryBlue,
              paddingTop: 15,
              paddingBottom: 15,
              alignItems: "center",
              borderRadius: 5,
              marginTop: 18
            }}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginTop: 20,
              marginBottom: 25,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={{ color: colors.primaryBlue }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      );
    } else
      return (
        <View style={styles.container}>
          <Text> This is the profile Screen </Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    //alignItems: "center",
    justifyContent: "flex-end",
    padding: 30
  }
});
