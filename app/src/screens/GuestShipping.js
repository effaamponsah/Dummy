import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NetInfo,
  Alert,
  ScrollView,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import { Form, Item, Label, Input, Picker } from "native-base";
import { Regions, api, colors } from "../constants";
import { Overlay } from "react-native-elements";
export default class GuestShipping extends Component {
  static navigationOptions = {
    title: "Delivery Address"
  };
  constructor(props) {
    super(props);
    this.state = {
      address_1: "",
      city: "",
      firstname: "",
      lastname: "",
      postcode: "",
      zone_id: "",
      country_id: 82,
      isVisible: false
    };
  }

  onButtonPress() {
    if (
      this.state.address_1 == "" ||
      this.state.city == "" ||
      this.state.firstname == "" ||
      this.state.lastname == "" ||
      //   this.state.postcode == "" ||
      this.state.zone_id == ""
    ) {
      ToastAndroid.show("All fields are required", 4000);
    } else {
      this.setState({ isVisible: true });
      NetInfo.getConnectionInfo().then(connection => {
        if (connection.type == "none") {
          ToastAndroid.show("Connect to the internet and try again", 4000);
        } else {
          axios
            .post(api.guestshipping, {
              address_1: this.state.address_1,
              city: this.state.city,
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              // postcode: this.state.postcode,
              zone_id: this.state.zone_id,
              country_id: 82

              // address_1: "Same",
              // city: "Same",
              // firstname: "Same",
              // lastname: "Same",
              // // postcode: this.state.postcode,
              // zone_id: "Same",
              // country_id: 82
            })
            .then(response => {
              //   console.warn(response.data);
              this.setState({ isVisible: false });
              if (response.data.success == true) {
                this.props.navigation.navigate("ShippingMethod");
              } else {
                // ToastAndroid.show("Error occured, try again later", 4000);
                console.warn(response.data);
              }
            })
            .catch(error => {
              //   Alert.alert("Error occured", "Couldn't connect to server");
              this.setState({ isVisible: false });
              console.warn("Error", error);
            });
        }
      });
    }
  }

  render() {
    const {
      address_1,
      city,
      firstname,
      lastname,
      postcode,
      zone_id,
      country_id,
      isVisible
    } = this.state;
    return (
      //   <View style={styles.container}>
      //     <Text> This is the guest shipping address </Text>
      //   </View>
      <ScrollView>
        <View>
          <Form>
            <Item floatingLabel>
              <Label>Firstname</Label>
              <Input
                // value=""
                onChangeText={firstname => this.setState({ firstname })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Lastname</Label>
              <Input
                // value=""
                onChangeText={lastname => this.setState({ lastname })}
              />
            </Item>
            <Item floatingLabel>
              <Label>City</Label>
              <Input
                // value=""
                onChangeText={city => this.setState({ city })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Delivery Address</Label>
              <Input
                // value=""
                onChangeText={address_1 => this.setState({ address_1 })}
              />
            </Item>
            <View style={styles.singleFields}>
              <Picker
                selectedValue={zone_id}
                onValueChange={(zone_id, itemIndex) => {
                  this.setState({ zone_id });
                }}
                style={{ color: colors.primaryGrey, height: 45 }}
              >
                <Picker.Item label="Select Region" value="" />
                {Regions.map(d => (
                  <Picker.Item label={d.title} value={d.value} key={d.title} />
                ))}
              </Picker>
            </View>
          </Form>
        </View>

        {/* Loading */}
        <Overlay
          isVisible={isVisible}
          height={80}
          //   onBackdropPress={() => this.setState({ isVisible: false })}
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
              flexDirection: "row"
            }}
          >
            <ActivityIndicator size="large" />
            <Text style={{ marginLeft: 20 }}>Loading</Text>
          </View>
        </Overlay>
        <View style={{ marginLeft: 30, marginRight: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primaryBlue,
              paddingTop: 15,
              paddingBottom: 15,
              alignItems: "center",
              borderRadius: 5,
              marginTop: 18
            }}
            onPress={() => this.onButtonPress()}
          // onPress ={() => this.props.navigation.navigate('Verify')}
          >
            <Text style={{ color: "white" }}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  singleFields: {
    paddingLeft: 15,
    borderRadius: 5,
    marginTop: 10,
    // borderColor: StyleSheet.hairlineWidth,
    borderWidth: StyleSheet.hairlineWidth,
    marginLeft: 30,
    marginRight: 30
  }
});
