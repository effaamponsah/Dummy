import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  Linking,
  ToastAndroid,
  Dimensions
} from "react-native";
import {
  List,
  ListItem,
  Card,
  CardItem,
  Body,
  Row,
  Grid,
  Toast,
  Root,
  Col
} from "native-base";
import { colors, api } from "../constants";
import { Total, Items } from "./Track";
import NavigationService from "../navigation/NavigationService";
import axios from "axios";
import PrimaryButton from "../components/PrimaryButton";
import { Overlay, Image, Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
const SCREEN = Dimensions.get("window");
export default class Confirm extends Component {
  static navigationOptions = {
    title: "Confirm Items"
  };
  constructor(props) {
    super(props);
    this.state = {
      momo: false
    };
  }

  momocheckout() {
    this.setState({ momo: false });
    // NavigationService.navigate("Done");
    // this.props.navigation.navigate("Thankyou")
    axios
      .put(api.confirm)
      .then(response => {
        console.warn(response.data)
        if (response.data.success == true) {
          NavigationService.navigate("Done");
        } else {
          Alert.alert("Error occured", "Error placing order. Please try again");
        }
      })
      .catch(error => {
        ToastAndroid.show("Connect to the internet and try again", 3000);
      });
  }

  // momo =() => {
  //   // console.warn("On the path")
  //   // this.setState({ momo: false });
  //   NavigationService.navigate("Done");
  //   // this.props.navigation.navigate("Okay")
  // }
  
  handleCheckout = x => {
    if (x == "MTN Mobile Money") {
      // Alert.alert("Please wait", "We are processing the mobile money payment");
      this.setState({ momo: true });
    } else {
      // NavigationService.navigate("Thankyou");
      // this.momocheckout();
      // NavigationService.navigate("Okay")
      // console.warn("On the path")
    }
  };

  opendialler = url => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          ToastAndroid.show("Cant handle it");
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(error => {
        console.warn("Error occured", error);
      });
  };

  render() {
    const { navigation } = this.props;
    const invoice = navigation.getParam("invoice", "NO-ID");
    const products = navigation.getParam("products", "some default value");
    const total = navigation.getParam("totals", "some default value");
    const method = navigation.getParam("method", "some default value");

    return (
      <Root>
      <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }}>
        <View>
          <Items products={products} total={total} />

          <View style={{ marginBottom: 7 }}>
            <View style={{ marginTop: 10, marginBottom: 5 }}>
              <Text
                style={{
                  color: colors.primaryBlue,
                  fontWeight: "bold",
                  fontSize: 15,
                  marginLeft: 3
                }}
              >
                Payment Address
              </Text>
            </View>
            <Card>
              <CardItem header>
                <Grid>
                  <Row>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 18
                      }}
                    >
                      {invoice.payment_firstname} {invoice.payment_lastname}{" "}
                      {invoice.payment_zone}
                    </Text>
                  </Row>
                  <Row>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 18
                      }}
                    >
                      {invoice.payment_city}{" "}
                    </Text>
                  </Row>
                  <Row>
                    <Text style={{ color: colors.primaryGrey }}>
                      {invoice.email}
                    </Text>
                  </Row>
                </Grid>
              </CardItem>
            </Card>
          </View>

          {/* over */}
          <Overlay
            isVisible={this.state.momo}
            onBackdropPress={() => this.setState({ momo: false })}
            height={SCREEN.height - 130}
            width={SCREEN.width - 50}
            containerStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                // paddingLeft:10,
                // paddingRight: 10
              }}
            >
              <Avatar
                source={require("../../assets/images/momo2.jpg")}
                size="large"
                rounded
                containerStyle={{ marginBottom: 40 }}
              />
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 17,
                    textAlign: "center"
                  }}
                >
                  PAYMENT INSTRUCTIONS
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ color: "black", fontSize: 15, textAlign: "center" }}
                >
                  1. Send exactly {total[2]["text"]} to
                </Text>
                <TouchableOpacity
                  onPress={() => this.opendialler(`tel: 0548879658`)}
                >
                  <Text
                    style={{ color: "black", fontWeight: "bold", fontSize: 15 }}
                  >
                    {" "}
                    0243176014{" "}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 15,
                  textAlign: "center"
                }}
              >
                {" "}
                (Mosco Phones & Trading Ent).{" "}
              </Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text
                  style={{ color: "black", fontSize: 15, textAlign: "center" }}
                >
                  2. Navigate to
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  {" "}
                  Portals Tab and to{" "}
                </Text>
              </View>
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 15,
                  textAlign: "center"
                }}
              >
                {" "}
                Payment Confirmation.{" "}
              </Text>

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text
                  style={{ color: "black", fontSize: 15, textAlign: "center" }}
                >
                  3. Complete the form and press
                </Text>
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  {" "}
                  Submit{" "}
                </Text>
              </View>

              <View style={{ marginBottom: 20, marginTop: 20 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 17,
                    textAlign: "center"
                  }}
                >
                  YOUR ORDER WILL NOT BE PROCESSED UNTIL WE RECEIVE PAYMENT
                </Text>
              </View>

              {/* <TouchableOpacity
                style={style.buttonStyles}
                onPress={() => console.warn("me")}
              >
                <Text style={{ color: "white" }}>Checkout</Text>
              </TouchableOpacity> */}
              {/* <Button
                title="Checkout"
                onPress={() => this.momocheckout()}
                color={colors.primaryBlue}
              /> */}
              <PrimaryButton
            btntitle="Okay"
            func={() => this.momocheckout()}
          />
            </View>
          </Overlay>

          <View style={{ marginBottom: 7 }}>
            <View style={{ marginTop: 10, marginBottom: 5 }}>
              <Text
                style={{
                  color: colors.primaryBlue,
                  fontWeight: "bold",
                  fontSize: 15,
                  marginLeft: 3
                }}
              >
                Delivery Address
              </Text>
            </View>
            <Card>
              <CardItem header>
                <Grid>
                  <Row>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 18
                      }}
                    >
                      {invoice.shipping_firstname} {invoice.shipping_lastname}{" "}
                      {invoice.shipping_zone}
                    </Text>
                  </Row>
                  <Row>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 18
                      }}
                    >
                      {invoice.shipping_city}{" "}
                    </Text>
                  </Row>
                  <Row>
                    <Text style={{ color: colors.primaryGrey }}>
                      {invoice.email}
                    </Text>
                  </Row>
                </Grid>
              </CardItem>
            </Card>
          </View>

          <PrimaryButton
            btntitle="Checkout"
            func={() => this.handleCheckout(method)}
          />
        </View>
      </ScrollView>
      </Root>
    );
  }
}

const style = StyleSheet.create({
  buttonStyles: {
    backgroundColor: colors.primaryBlue,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    alignItems: "center",
    borderRadius: 5
  }
});
