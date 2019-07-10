import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors, api } from "../constants";
import { Icon } from "native-base";
import axios from "axios";
import NavigationService from "../navigation/NavigationService";

const products = [
  {
    title: "Samsung s9",
    text: "freepickup",
    price: "Ghs 2000",
    image: require("../../assets/images/mac.jpg")
  },
  {
    title: "Samsung s8",
    text: "freepickup",
    price: "Ghs 2000",
    image: require("../../assets/images/demo.jpg")
  },
  {
    title: "Samsung galaxy ace 5",
    price: "Ghs 2000",
    text: "freepickup",
    image: require("../../assets/images/mac.jpg")
  },
  {
    title: "Samsung j5",
    price: "Ghs 2000",
    text: "freepickup",
    image: require("../../assets/images/demo.jpg")
  }
];

export default class ProductsItems extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { data: [], isLoading: true };
  }

  componentDidMount() {
    this._isMounted = true;
    const id = this.props.id;
    this.fetchdata(id);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchdata = i => {
    axios
      .get(api.products + i)
      .then(response => {
        if (this._isMounted) {
          this.setState({
            data: response.data.data,
            isLoading: false
          });
        }
      })
      .catch(e => {
        console.warn("Error", e);
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator color={colors.primaryBlue} />
        </View>
      );
    }
    return (
      <ScrollView>
        {this.state.data ? (
          this.state.data.map((d, i) => (
            <TouchableOpacity
              style={styles.container}
              key={i}
              onPress={() => {
                NavigationService.navigate("Product", {
                  title: d.name,
                  id: d.id
                });
              }}
            >
              <View style={{ justifyContent: "center" }}>
                <Image source={{ uri: d.image }} style={styles.image} />
              </View>
              <View
                style={{ flex: 1, justifyContent: "center", marginLeft: 30 }}
              >
                <Text style={{ fontWeight: "bold" }}>{d.name}</Text>
                {d.quantity == 0 ? (
                  <Text style={{ color: "red" }}>{d.stock_status}</Text>
                ) : (
                  <Text style={{ color: colors.primaryHeaderColor }}>
                    IN STOCK
                  </Text>
                )}
                <Text style={{ color: colors.primaryBlue }}>
                  {d.price_formated}
                </Text>
              </View>
              <View style={{ justifyContent: "center", marginRight: 15 }}>
                <Icon name="ios-arrow-forward" />
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>No items found</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryGrey,
    flexDirection: "row"
  },
  image: {
    height: 100,
    width: 100,
    marginLeft: 30
  }
});
