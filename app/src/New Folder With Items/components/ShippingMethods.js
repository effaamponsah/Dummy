import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  NetInfo,
  Button
} from "react-native";
import axios from "axios";
import { api, colors } from "../constants";
import { Object } from "core-js";
import { ListItem, Right, Left, Radio, Body } from "native-base";
export default class ShippingMethods extends Component {
  static navigationOptions = {
    title: "Delivery Method"
  };
  constructor(props) {
    super(props);
    this.state = {
      shippingMethods: [],
      isLoading: true,
      shippingCode: "",
      methodName: "",
      code: ""
    };
  }
  _isMounted = false;

  componentDidMount() {
    _isMounted = true;
    this.fetchMethod();
  }

  fetchMethod() {
    const data = [];
    axios
      .get(api.shippingMethod)
      .then(res => {
        if (res.data.success == true) {
          Object.keys(res.data.data.shipping_methods).forEach(key => {
            // console.warn(shippingMethods[key]);
            data.push(res.data.data.shipping_methods[key].quote[key]);
          });
          this.setState({
            shippingMethods: data,
            isLoading: false
          });
        }
        // JSON.parse()
        // console.warn("Response", res.data);
      })
      .catch(error => {
        Alert.alert("Error", error);
      });
  }

  addMethod(i) {
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        ToastAndroid.show(
          "Please check your internet connnection and try again",
          2000
        );
      } else {
        axios
          .post(api.shippingMethod, {
            shipping_method: i,
            comment: "I agree to this method"
          })
          .then(response => {
            this.setState({ code: i });
            if (response.data.success == true) {
              ToastAndroid.show("Shipping Method selected", 3000);
            }
            console.warn(response.data);
          })
          .catch(error => {
            Alert.alert("Error ocurred", error);
          });
      }
    });
  }
  move() {
    if (this.state.code == "") {
      Alert.alert("Error", "Please select one of the above");
    } else {
      this.props.navigation.navigate("PaymentMethod");
    }
  }
  render() {
    const { shippingMethods, isLoading, code } = this.state;
    if (isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator
            color={{ color: colors.primaryBlue }}
            size="large"
          />
        </View>
      );
    }
    return (
      <View>
        <View>
          {shippingMethods.map(data => {
            return (
              <ListItem onPress={() => this.addMethod(data.code)}>
                <Body>
                  <Text>{data.title}</Text>
                  <Text note style={{ color: colors.primaryBlue }}>
                    {data.text}
                  </Text>
                </Body>
                <Right>
                  <Radio
                    color={colors.primaryGrey}
                    selected={code == data.code}
                    selectedColor={colors.primaryBlue}
                  />
                </Right>
                {/* <Text>{data.code}</Text> */}
              </ListItem>
            );
          })}
        </View>
        <View style={{ marginLeft: 30, marginRight: 30, marginTop: 20 }}>
          <Button
            title="Proceed"
            color={colors.primaryBlue}
            onPress={() => this.move()}
          >
            {/* <Text style={{ color: "white" }}>Proceed</Text> */}
          </Button>
        </View>
      </View>
    );
  }
}
