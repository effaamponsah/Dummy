import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import { colors } from "../constants";

export default class Placeholder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
      //   style={{backgroundColor: '#e1e4e8'}}
      >
        <Image
          {...this.props}
          PlaceholderContent={
            <ActivityIndicator size="small" color={colors.primaryBlue} />
          }
        />
      </View>
    );
  }
}
