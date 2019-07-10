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

const img = require("../../assets/images/wishlist.png");
export default class WishlistItems extends Component {
  static navigationOptions = {
    title: "My Wishlist"
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
    this.fetchWishlist();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchWishlist();

    // console.warn("I am refreshing");

    this.setState({ refreshing: false });
  };

  fetchWishlist() {
    axios
      .get(api.viewWishlist)
      .then(response => {
        if (this._isMounted == true) {
          if (response.data.success == true) {
            this.setState({
              products: response.data.data.products,
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
          style: 'destructive',
          onPress: () =>
            NetInfo.getConnectionInfo().then(connection => {
              if (connection.type == "none") {
                ToastAndroid.show("Action requires internet", 3000);
              } else {
                axios
                  .delete(api.addToWishList + i)
                  .then(response => {
                    if (response.data.success == true) {
                      this.fetchWishlist();
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
            size="large"
          />
        </View>
      );
    }

    if (products.length == 0) {
      return (
        <View style={styles.container}>
          <EmpytCart
            text1="Your Wishlist is Empty"
            text2="Hit the love icon from the products page "
            image={img}
          />
        </View>
      );
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            colors={[colors.primaryBlue]}
            title="Updating list"
          />
        }
      >
        <List>
          {products.map(data => (
            <ListItem
              thumbnail
              key={data.product_id}
              onPress={() =>
                NavigationService.navigate("Product", {
                  title: data.name,
                  id: data.product_id
                })
              }
            >
              <Left>
                <Thumbnail circular source={{ uri: data.thumb }} />
              </Left>
              <Body>
                <Text>{data.name}</Text>
                <Text note>{data.price}</Text>
                {data.stock == "In Stock" ? (
                  <Text style={{ color: colors.primaryHeaderColor }}>
                    {data.stock}
                  </Text>
                ) : (
                    <Text style={{ color: "red" }}>{data.stock}</Text>
                  )}
                {/* <View style={{ flexDirection: "row" }}>
                 
                </View> */}
              </Body>

              <Right>
                <TouchableOpacity
                  onPress={() => this._deleteItem(data.product_id)}
                >
                  <Icon
                    name="delete"
                    type="MaterialIcons"
                    style={{ color: colors.primaryBlue }}
                  />
                </TouchableOpacity>
              </Right>
            </ListItem>
          ))}
        </List>
      </ScrollView>
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
