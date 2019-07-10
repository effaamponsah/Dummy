import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  NetInfo
} from "react-native";
import NavigationService from "../navigation/NavigationService";
import { colors } from "../constants";

export default class NoInternet extends Component {
  // static navigationOptions ={
  //   header: null
  // }
  constructor(props) {
    super(props);
    this.state = {};
  }

  onRetryPress() {
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        // console.warn("the device is offline");
      } else {
        // NavigationService.navigate("Home");
        console.warn("online");
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={"default"} backgroundColor={colors.darkgreen} />

        <Text> No Internet Please Turn it on Hit Retry </Text>
        <TouchableOpacity
          style={{ backgroundColor: "red" }}
          onPress={() => this.onRetryPress()}
        >
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  }
});
