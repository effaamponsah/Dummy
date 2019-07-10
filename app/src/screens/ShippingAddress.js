import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  NetInfo,
  ToastAndroid,
  TextInput
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
  Icon,
  Root,
  ActionSheet
} from "native-base";
import { Overlay } from "react-native-elements";
import NavigationService from "../navigation/NavigationService";
export default class ShippingAddress extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Shipping address",
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 8 }}
          onPress={() => console.warn("Later")}
        >
          <Icon name="edit" type="MaterialIcons" style={{ color: "white" }} />
        </TouchableOpacity>
      )
    };
  };

  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      activeAddress: "",
      isLoading: true,
      edit: false
    };
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
          onPress={() => this.props.navigation.navigate("ShippingMethod")}
        // onPress ={() => this.props.navigation.navigate('Verify')}
        >
          <Text style={{ color: "white" }}>Proceed to payment methods</Text>
        </TouchableOpacity>
      </View>
    );
  }

  something() {
    console.warn("something is fired");
    this.setState({ edit: true });
  }
  componentDidMount() {
    this._isMounted = true;
    this.fetchPaymentAddress();
  }

  fetchPaymentAddress() {
    axios
      .get(api.shippingAddress)
      .then(res => {
        if (this._isMounted) {
          if (res.data.success == true) {
            this.setState({
              activeAddress: res.data.data.address_id,
              addresses: res.data.data.addresses,
              isLoading: false
            });
          }
        }
      })
      .catch(error => {
        Alert.alert("Error occured", error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setExistingAddress(address_id) {
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        ToastAndroid.show(
          "Please check your internet connection and try again",
          2000
        );
      } else {
        axios
          .post(api.shippingAddress, {
            shipping_address: "existing",
            address_id: address_id
          })
          .then(response => {
            if ((response.data.success = true)) {
              console.warn("Address set");
            }
          })
          .catch(error => {
            Alert.alert("Error occured", error);
          });
        this.setState({ activeAddress: address_id });
        console.warn("this is the address id", address_id);
      }
    });
  }

  addNewAddress() {
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        ToastAndroid.show(
          "Please check your internet connection and try again",
          2000
        );
      } else {
        // axios
        //   .post(api.shippingAddress, {
        //     address_1: "Another Address1",
        //     city: "New City",
        //     country_id: "97",
        //     firstname: "Daniel",
        //     lastname: "Shiebe",
        //     postcode: "1111",
        //     zone_id: "1433"
        //   })
        //   .then(response => {
        //     if ((response.data.success = true)) {
        //       console.warn("New address set");
        //       this.fetchPaymentAddress();
        //     }
        //   })
        //   .catch(error => {
        //     Alert.alert("Error occured", error);
        //   });
      }
    });
  }

  render() {
    const { isLoading, addresses, activeAddress, edit } = this.state;
    if (isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={colors.primaryBlue} />
          <Text>Fetching your Adresses</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        {addresses.map(data => (
          <ListItem
            key={data.address_id}
            onPress={() => this.setExistingAddress(data.address_id)}
          >
            <Left>
              <Text>
                {data.firstname} {data.lastname}, {data.address_1} {data.city}{" "}
                {data.zone}
              </Text>
            </Left>
            <Right>
              {edit == false ? (
                <Radio
                  color={colors.primaryGrey}
                  // onPress={() => this.setState({ addressSelected: "itemOne" })}
                  selected={activeAddress == data.address_id}
                  selectedColor={colors.primaryBlue}
                />
              ) : (
                  <Icon
                    name="edit"
                    type="MaterialIcons"
                    style={{ color: colors.primaryBlue }}
                  />
                )}
            </Right>
          </ListItem>
        ))}
        <ListItem onPress={() => this.addNewAddress()}>
          <Left>
            <Text>Add new address</Text>
          </Left>
          <Right>
            <Icon name="md-add-circle" style={{ color: colors.primaryBlue }} />
          </Right>
        </ListItem>
        {this.renderCheckout()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
