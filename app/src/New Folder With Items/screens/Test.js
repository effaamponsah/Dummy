import React, { Component } from "react";
import { View, Text, Picker, NetInfo } from "react-native";
import { observer, inject } from "mobx-react/native";

class Offline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true
    };
  }

  handleConnectivity = isConnected => {
    if (isConnected) {
      this.setState({
        isConnected
      });
    } else {
      this.setState({
        isConnected
      });
    }
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivity
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivity
    );
  }

  render() {
    if (!this.state.isConnected) {
      return (
        <View style={{ backgroundColor: "red", padding: 10 }}>
          <Text style={{ color: "white" }}>This is Offline</Text>
        </View>
      );
    }
    return (
      <View style={{ backgroundColor: "green", padding: 10 }}>
        <Text style={{ color: "white" }}>Online</Text>
      </View>
    );
  }
}

// @inject("user") 
export default class Testing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "",
      show: false,
      test: ""
    };
  }

  componentDidMount() {
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        console.warn("the device is offline");
      }
    });
  }
  render() {
    console.warn("Props", this.props);
    return (
      <View>
        <View>
          {/* <Offline /> */}
          <Text>{this.state.language}</Text>
          <Text>{this.state.test}</Text>
        </View>
        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ language: itemValue, test: "Some" });
          }}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Java" value="java" />

          <Picker.Item label="Javascript" value="js" />
        </Picker>
      </View>
    );
  }
}
