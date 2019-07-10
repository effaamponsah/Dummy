// this is the shopping cart screen
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  NetInfo,
  ToastAndroid,
  AsyncStorage
} from "react-native";
import EmpytCart from "../components/EmptyCart";
import axios from "axios";
import { api, colors } from "../constants";
import CartItems from "../components/CartItem";
import { inject, observer } from "mobx-react/native";
import NavigationService from "../navigation/NavigationService";
import { Root, Toast, Icon } from "native-base";

const img = require("../../assets/images/cart.png");
@inject("shoppingcartstore")
@observer
export default class Cart extends Component {
  _isMounted = false;
  static navigationOptions = {
    title: "My Cart",
    headerRight: (
      <TouchableOpacity
        style={{ marginRight: 15 }}
        onPress={() => {
          Alert.alert(
            "Empty your cart?",
            "This action deletes the entire items in your cart. Please note that it is not reversable",
            [
              {
                text: "Delete",
                onPress: () =>
                  NetInfo.getConnectionInfo().then(connection => {
                    if (connection.type == "none") {
                      Toast.show({
                        text: "Connect to the internet and try again",
                        type: "danger",
                        buttonText: "Okay"
                      });
                    } else {
                      axios
                        .delete(api.bulkEmpty)
                        .then(response => {
                          console.warn(response.data);
                        })
                        .catch(e => {
                          console.warn(e);
                        });
                    }
                  })
              },
              {
                text: "Cancel",
                style: "cancel"
              }
            ],
            { cancelable: false }
          );
        }}
      >
        <Icon name="delete" type="AntDesign" style={{ color: colors.primaryBlue, fontSize: 22 }} />
      </TouchableOpacity>
    )
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
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        this.retrieve();
        // this.props.navigation.navigate('Home')
      } else {
        this.fetch();
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillUpdate() {
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        this.retrieve();
      } else {
        this.fetch();
      }
    });
  }
  componentDidUpdate() { }

  // componentWillReceiveProps(){
  // }
  fetch() {
    axios
      .get(api.viewCart, {
        timeout: 7000,
        headers: {
          "X-Oc-Image-Dimension": "2500 x 2500"
        }
      })
      .then(res => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            products: res.data
          });
          this.set(res.data);
        }
      })
      .catch(e => {
        // Alert.alert("Ooops", e);
        this.retrieve();
      });
    //   }
    // });
  }

  async set(x) {
    try {
      await AsyncStorage.setItem("CART", JSON.stringify(x));
      // await this.setState({data: x})
      // await console.warn("Items set", x);
    } catch (error) {
      Alert.alert("Error caching data");
    }
  }

  async retrieve() {
    try {
      const value = await AsyncStorage.getItem("CART");
      if (value !== null) {
        // Alert.alert("We have data");
        //log and set state here if everything works
        this.setState({
          products: JSON.parse(value),
          isLoading: false
        });
        //  console.warn(value);
      } else {
        // Alert.alert("We have no data");
        //  this.setState({isLoading: false})
        this.fetch();
      }
    } catch (error) {
      Alert.alert("Error Fetching Data, Please restart the APP");
    }
  }

  renderList() {
    const { products } = this.props.shoppingcartstore;

    if (this.state.products.success == false) {
      this.props.shoppingcartstore.remove();
      return (
        <View
          style={{
            backgroundColor: "#fff",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <EmpytCart
            text1="You have no items in your cart"
            text2="Please add items"
            image={img}
            btn
          />
        </View>
      );
    } else {
      this.props.shoppingcartstore.add({ id: "trigger" });
      return <CartItems item={this.state.products.data.products} />;
    }
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

  _checkOutPress = async () => {
    // console.warn("Checkout Pressed");
    const userToken = await AsyncStorage.getItem("userToken");
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        ToastAndroid.show("Connect to the internet and try again", 4000);
      }
      // else if (userToken == "") {
      //   this.props.navigation.navigate("Guest");
      // }
      else {
        // NavigationService.navigate("PaymentAddress");
        // this.props.goBack();
        this.props.navigation.navigate(userToken ? "PaymentAddress" : "Guest");
      }
    });
  };

  render() {
    // console.warn(this.props);
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={colors.primaryBlue} />
          <Text>Loading items in your Cart</Text>
        </View>
      );
    }
    // console.warn(this.state.products)
    return (
      <Root>
        <View style={styles.container}>
          {this.renderList()}
          {/* {this.props.shoppingcartstore.items.length */}
          {this.state.products.success != false ? this.renderCheckout() : null}
        </View>
      </Root>
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
