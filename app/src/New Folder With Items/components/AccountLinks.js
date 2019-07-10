// This is to render the content in the acccount screen

import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NetInfo,
  ToastAndroid
} from "react-native";
import { colors } from "../constants";
import NavigationService from "../navigation/NavigationService";

const Left = ({ children }) => (
  <View style={{ flex: 1, justifyContent: "flex-start" }}>{children}</View>
);
const Right = ({ children }) => (
  <View style={{ justifyContent: "flex-end" }}>{children}</View>
);

export default class AccountLinks extends PureComponent {
  static Left = Left;
  static Right = Right;

  _handlePress = () => {
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        ToastAndroid.show(
          "Couldn't establish an internet connection. Connect to the internet and try again",
          3000
        );
      } else {
        NavigationService.navigate(this.props.link);
      }
    });
  };

  renderItems() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.primaryGrey,
          padding: 9
        }}
      >
        {this.props.children}
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity onPress={this._handlePress}>
        {this.renderItems()}
      </TouchableOpacity>
    );
  }
}
