// this is the shopping cart screen
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from "react-native";
import EmpytCart from "../components/EmptyCart";
import axios from "axios";
import { api, colors } from "../constants";
import CartItems from "../components/CartItem";
import { inject, observer } from "mobx-react/native";

@inject("shoppingcartstore")
@observer
export default class Cart extends Component {
  _isMounted = false;
  static navigationOptions = {
    title: "My Cart"
  };
  constructor(props) {
    super(props);
    this.state = {
      products: "",
      isLoading: true
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchCartItems();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillUpdate() {
    this.fetchCartItems();
  }
  componentDidUpdate() {}

  // componentWillReceiveProps(){
  // }
  fetchCartItems() {
    axios
      .get(api.viewCart)
      .then(res => {
        if (this._isMounted) {
          this.setState({
            products: res.data,
            isLoading: false
          });
        }
        // console.warn(res.data.data.products)
      })
      .catch(e => {
        Alert.alert("Ooops", e);
      });
  }
  renderList() {
    const { products } = this.props.shoppingcartstore;
    // if (this.props.shoppingcartstore.items.length == 0) {
    if (this.state.products.data.products.length == 0) {
      return (
        <View
          style={{
            backgroundColor: "#fff",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <EmpytCart />
        </View>
      );
    }
    // console.warn(this.state.products);

    // return this.state.products.map(data => (
    //   <View key={data.key}>
    //     <Text numberOfLines={1}>{data.name}</Text>
    //     <Text numberOfLines={1}>{data.price}</Text>
    //   </View>
    // )

    // return (<CartItems /*products={this.state.products.data.products}*/ />)
    
    // Working prototype
    return (
      <ScrollView>
        {this.state.products.data.products.map((d, i) => (
          <View>
            <Text>{d.name}</Text>
            <Text>{d.quantity}</Text>
          </View>
        ))}
      </ScrollView>
    );

    // return this.props.shoppingcartstore.items.map(p => (
    //   // <View key={products.id}>
    //   //   <Text>{products.name}</Text>
    //   //   <Text>{products.price}</Text>
    //   // </View>
    //   <View>
    //     {/* <CartItems products={this.state.products.data.products} /> */}
    //     <Text>{p.id}</Text>
    //     {/* <Text>{this.state.props.data}</Text> */}
    //   </View>
    // ));
  }

  renderCheckout() {
    return (
      <View
        style={{
          borderTopWidth: StyleSheet.hairlineWidth,
          backgroundColor: "#fff",
          paddingBottom: 10
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10
          }}
        >
          <Text>Cart subtotal</Text>
          <Text style={{ fontWeight: "bold", color: colors.primaryBlue }}>
            {this.state.products.data.totals[0].text}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primaryBlue,
            paddingTop: 15,
            paddingBottom: 15,
            alignItems: "center",
            borderRadius: 5,
            marginTop: 18,
            marginLeft: 30,
            marginRight: 30
          }}
          onPress={this._checkOutPress}
          // onPress ={() => this.props.navigation.navigate('Verify')}
        >
          <Text style={{ color: "white" }}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _checkOutPress = () => {
    console.warn("Checkout Pressed");
  };

  render() {
    // console.warn(this.props);
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={colors.primaryBlue} />
          <Text>Please wait</Text>
        </View>
      );
    }
    // console.warn(this.state.products)
    return (
      <View style={styles.container}>
        {this.renderList()}
        {/* {this.props.shoppingcartstore.items.length */}
        {this.state.products.data.products.length != 0
          ? this.renderCheckout()
          : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground
    // alignItems: "center",
    // justifyContent: "center"
  }
});
