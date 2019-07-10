import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants";
import NavigationService from "../navigation/NavigationService";

export default class GuestUser extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  loginPress() {
    this.props.navigation.goBack();
    NavigationService.navigate("Login");
  }

  continuePress() {
    this.props.navigation.navigate("GuestDetails");
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity
          style={styles.loginbtn}
          onPress={() => this.loginPress()}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.continuePress()}>
          <Text>Continue as guest</Text>
        </TouchableOpacity> */}

        {/* <View style={styles.container}> */}
        <View style={{ marginBottom: 15, width: 250 }}>
          <Text style={{ fontSize: 35, fontWeight: "bold", color: "black" }}>
            Hello,
          </Text>
        </View>

        {/* Description */}
        <View style={{ marginRight: 90 }}>
          <Text style={{ color: "black" }}>
            When you have an account, you get the chance to view your Wishlist,
            Track your orders, view your history and do more
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
          onPress={() => this.loginPress()}
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
          onPress={() => this.continuePress()}
        >
          <Text style={{ color: colors.primaryBlue }}>
            Continue as guest user
          </Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
  loginbtn: {
    backgroundColor: colors.primaryBlue,
    padding: 10
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    //alignItems: "center",
    justifyContent: "flex-end",
    padding: 30
  }
});
