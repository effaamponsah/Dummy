import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert
} from "react-native";
import {
  List,
  ListItem,
  Card,
  CardItem,
  Body,
  Row,
  Grid,
  Col
} from "native-base";
import { colors } from "../constants";
import { Total, Items } from "./Track";
import NavigationService from "../navigation/NavigationService";
import axios from "axios";
export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCheckout(x) {
    if (x == "MTN Mobile Money") {
      Alert.alert("Please wait", "We are processing the mobile money payment");
    } else {
      axios
        .put(api.confirm)
        .then(response => {
          if (response.data.success == true) {
            Alert.alert(
              "Success",
              "Order placed successfully. Check your email for the order id",
              [
                {
                  text: "Track Order",
                  onPress: () => NavigationService.navigate("Track")
                },
                { text: "OK" }
              ]
            );
            NavigationService.navigate("Home");
          } else {
            Alert.alert("Error", "Error placing order. Please try again");
          }
        })
        .catch(error => {
          Alert.alert("Error occured", "Coundnt connect to server");
        });
    }
  }

  render() {
    const { invoice, products, total, method } = this.props;
    return (
      <ScrollView>
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

          <Button
            title="Checkout"
            onPress={() => this.handleCheckout(method)}
          />
        </View>
      </ScrollView>
    );
  }
}

// <View
//   style={{
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row"
//   }}
// >
//   {/* <Text style={{ marginLeft: 20 }}>Something</Text> */}
//   <Text style={{ fontWeight: "bold" }}>Confirm Checkout</Text>
//   <Text style={{ marginLeft: 20 }}>
//     Invoice number {invoice.invoice_prefix}
//   </Text>
//   <Text>
//     Order by : {invoice.firstname} {invoice.lastname}
//   </Text>
//   <Text>Email : {invoice.email}</Text>
//   <Text>
//     Payment Address {invoice.payment_firstname} {invoice.payment_lastname}{" "}
//     {invoice.payment_address_1} {invoice.payment_city}
//   </Text>
//   <Text>Payment Method : {invoice.payment_method}</Text>
//   <Text>
//     Shipping Address : {invoice.shipping_firstname} {invoice.shipping_lastname}{" "}
//     {invoice.shipping_address_1} {invoice.shipping_city}
//   </Text>
//   <Text>Shipping Method : {invoice.shipping_method}</Text>
//   {/* <View>
//   <Text>Items: </Text>
//   {products.map(data => (
//     <View key={data.product_id}>
//       <Text>
//         {data.name} x {data.quantity}
//       </Text>
//       <Text>{data.price}</Text>
//     </View>
//   ))}
// </View> */}
//   {/* <View>
//   <Text>Items: </Text>
//   {totals.map(data => (
//     <View>
//       <Text>
//         {data.title} {" "}{data.text}
//       </Text>
//       <Text>{data.price}</Text>
//     </View>
//   ))}
// </View> */}
//   <Text>Total GHS {invoice.total}</Text>
// </View>;
