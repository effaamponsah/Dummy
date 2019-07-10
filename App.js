/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NetInfo
} from "react-native";
import { observable } from "mobx";
import { Provider } from "mobx-react/native";
import TabNav from "./app/src/navigation/TabNav";
import NavigationService from "./app/src/navigation/NavigationService";
import Products from "./app/src/screens/Products";
import Product from "./app/src/screens/Product";
import Account from "./app/src/screens/Account";
import Testing from "./app/src/screens/Test";
import { store } from "./app/src/store";
import NoInternet from "./app/src/screens/NoConnection";
import { Root } from "native-base";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internet: true
    };
  }

  componentDidMount() {
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        this.setState({ internet: false });
      }
    });
  }

  @observable list = [];
  render() {
    return (
      <Provider {...store}>
        {/* {this.state.internet == true ? ( */}
        <TabNav
          ref={r => {
            NavigationService.setTopLevelNavigator(r);
          }}
        />
        {/* <Track /> */}
        {/* ) : ( */}
        {/* <View style={styles.container}> */}
        {/* <NoInternet /> */}
        {/* </View> */}
        {/* )} */}
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
