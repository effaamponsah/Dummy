import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  NetInfo,
  ToastAndroid,
  StyleSheet
} from "react-native";
import axios from "axios";
import { api, colors } from "../constants";
import {
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Icon
} from "native-base";
import NavigationService from "../navigation/NavigationService";
import EmpytCart from "../components/EmptyCart";
import OrderItems from "../components/OrderItem";

const img = require("../../assets/images/list.png");
export default class History extends Component {
  static navigationOptions = {
    title: "My History"
  };

  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: true,
      refreshing: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchOrders();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchOrders();

    // console.warn("I am refreshing");

    this.setState({ refreshing: false });
  };

  fetchOrders() {
    axios
      .get(api.history)
      .then(response => {
        if (this._isMounted == true) {
          if (response.data.success == true) {
            this.setState({
              products: response.data.data.orders,
              isLoading: false
            });
            // console.warn(response.data);
          }
        }
      })
      .catch(error => {
        Alert.alert("Error occurred", error);
      });
  }

  _deleteItem(i) {
    Alert.alert(
      "Delete Item?",
      "This action will delete the item from your list",
      [
        {
          text: "Delete",
          onPress: () =>
            NetInfo.getConnectionInfo().then(connection => {
              if (connection.type == "none") {
                ToastAndroid.show("Action requires internet", 3000);
              } else {
                axios
                  .delete(api.addToWishList + i)
                  .then(response => {
                    if (response.data.success == true) {
                      this.fetchOrders();
                      ToastAndroid.show("Item removed", 3000);
                    }
                  })
                  .catch(error => {
                    Alert.alert("Error occured", error);
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
  }
  render() {
    const { products, isLoading } = this.state;
    if (isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator
            color={{ color: colors.primaryBlue }}
            size="small"
          />
        </View>
      );
    }

    if (products.length == 0) {
      return (
        <View style={styles.container}>
          <EmpytCart
            text1="No Items Ordered yet"
            text2="Begin by placing orders"
            image={img}
          />
        </View>
      );
    }
    return (
      <OrderItems data={products} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
