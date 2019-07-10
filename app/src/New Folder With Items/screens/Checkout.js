import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import axios from "axios";
import { api, colors } from "../constants";
import {
  ListItem,
  Left,
  Thumbnail,
  List,
  Body,
  Right,
  Separator,
  Toast,
  Radio,
  Icon
} from "native-base";
export default class Checkout extends Component {
  static navigationOptions = {
    title: "Checkout"
  };
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: true,
      deliveryaddress: [],
      addressSelected: "",
      paymentAddress:""
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchCartItems();
    this.fetchAddress();
  }

  fetchCartItems() {
    axios
      .get(api.viewCart)
      .then(res => {
        if (this._isMounted) {
          this.setState({
            products: res.data.data,
            isLoading: false
          });
        }
        // console.warn(res.data.data.products)
      })
      .catch(e => {
        Alert.alert("Ooops", e);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchAddress() {
    axios
      .get(api.shippingAddress)
      .then(response => {
        if (this._isMounted) {
          if (response.data.success == true) {
            this.setState({
              address: response.data.data.addresses
            });
          }
        }

        console.warn("Addresses", response.data.data.addresses);
      })
      .catch(e => {
        Toast.show({
          text: "Something strange happend"
        });
      });
  }

  // fetchPaymentAddress(){
  //   axios.get(api.paymentAddress).then(res => {
  //     if (this._isMounted) {
  //       if (res.data.success == true) {
  //         this.setState({
  //           paymentAddress: res.data.data.addresses
  //         });
  //       }
  //     }
  //   })
  // }
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
          <Text>Total </Text>
          <Text style={{ fontWeight: "bold", color: colors.primaryBlue }}>
            {this.state.products.totals[0].text}
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
          onPress={() => Alert.alert("Hello")}
          // onPress ={() => this.props.navigation.navigate('Verify')}
        >
          <Text style={{ color: "white" }}>Complete Purchase</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {

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
    return (
      <View>
        <ScrollView>
          <List>
            <ListItem itemDivider>
              <Text>Products</Text>
            </ListItem>
            {this.state.products.products.map((data, i) => (
              <ListItem thumbnail key={data.id}>
                <Left>
                  <Thumbnail square source={{ uri: data.thumb }} />
                </Left>
                <Body>
                  <Text>{data.name}</Text>
                  <Text note numberOfLines={1}>
                    {data.price}
                  </Text>
                </Body>
                <Right>
                  <Text>{data.quantity}</Text>
                </Right>
              </ListItem>
            ))}

            <ListItem itemDivider>
              <Text>Payment Addresses</Text>
            </ListItem>
            {/* Displays */}
            {this.state.address.map((data) => (
              <ListItem key={data.address_id}
                onPress={() => this.setState({ addressSelected: data.address_id })}
              >
                <Left>
                  <Text>{data.firstname} {data.lastname}, {data.address_1} {data.city} {data.zone}</Text>
                </Left>
                <Right>
                  <Radio
                    color={colors.primaryGrey}
                    // onPress={() => this.setState({ addressSelected: "itemOne" })}
                    selected={this.state.addressSelected ==  data.address_id}
                    selectedColor={colors.primaryBlue}
                  />
                </Right>
              </ListItem>
            ))}
            <ListItem
              onPress={() => Alert.alert('Damn')}
            >
              <Left>
                <Text>Add Address</Text>
              </Left>
              <Right>
            <Icon name="md-add-circle" style={{ color: colors.primaryBlue }} />                
              </Right>
            </ListItem>
            

            <ListItem itemDivider>
              <Text>Payment Method</Text>
            </ListItem>

            {/* <ListItem  onPress={() => this.setState({ addressSelected: "itemTwo" })}
                 >
              <Left>
                <Text>Discussion with Client</Text>
              </Left>
              <Right>
                <Radio
                 color={colors.primaryGrey}
                 selected={this.state.addressSelected == "itemTwo"}
                  // onPress={() => this.setState({ addressSelected: "itemTwo" })}
                  // selected={this.state.addressSelected == "itemTwo"}
                  selectedColor={colors.primaryBlue}
                />
              </Right>
            </ListItem> */}

            {/* <View>
            {this.state.address ? (
              <View
                style={{
                  height: 20,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text>No address</Text>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row"
                }}
              >
                <Text>{this.state.address.data.addresses}</Text>
              </View>
            )}
          </View> */}
          </List>
        {this.renderCheckout()}
        </ScrollView>
      </View>
    );
  }
}
