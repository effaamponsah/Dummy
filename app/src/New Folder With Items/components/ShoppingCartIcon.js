import React, { Component } from "react";
import { View, Text } from "react-native";
import { Icon } from "native-base";
import { colors } from "../constants";
import { inject, observer } from "mobx-react/native";
@inject("shoppingcartstore")
@observer
export default class CartIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false
    };
  }

  componentDidMount() {
    if (this.props.shoppingcartstore.items.length != 0) {
      this.setState({ display: true });
    }
  }

  componentWillUpdate() {
    // if (this.props.shoppingcartstore.items.length != 0) {
    //   // this.setState({ display: true });
    //   console.warn("PRops", this.props.shoppingcartstore.items);
    // }
    // this.chseck()
  }


  // check() {
  //   if (this.props.shoppingcartstore.items.length != 0) {
  //     // this.setState({ display: true });
  //     console.warn("PRops", this.props.shoppingcartstore.items);
  //   }
  // }

  render() {
    return (
      <View style={{ position: "relative" }}>
        <Icon
          name="shoppingcart"
          style={{ color: this.props.color }}
          type="AntDesign"
        />

        {this.props.shoppingcartstore.items.length != 0 ? (
          <View
            style={{
              position: "absolute",
              backgroundColor: colors.primaryBlue,
              top: 0,
              right: 0,
              height: 10,
              width: 10,
              borderRadius: 15
            }}
          />
        ) : null}
      </View>
    );
  }
}
