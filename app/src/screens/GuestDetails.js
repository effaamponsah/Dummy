import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NetInfo,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { Container, Content, Form, Item, Label, Input, Picker, Toast, Root } from "native-base";
import { colors, api, Regions } from "../constants";
import { Overlay } from "react-native-elements";
export default class GuestDetails extends Component {
  static navigationOptions = {
    title: "Personal Details"
  };
  constructor(props) {
    super(props);
    this.state = {
      address_1: "",
      city: "",
      country_id: 82,
      firstname: "",
      lastname: "",
      telephone: "",
      email: "",
      isVisible: false,
      zone: ""
      //   postcode: "1111",
      //   zone_id: "1433"
    };
  }

  onContinuePress() {
    if (
      this.state.address_1 == "" ||
      this.state.city == "" ||
      this.state.country_id == "" ||
      this.state.firstname == "" ||
      this.state.lastname == "" ||
      this.state.telephone == "" ||
      this.state.email == "" ||
      this.state.zone == ""
    ) {
      Toast.show({
        text: "All fields are required",
        type: 'danger'
      });
    } else {
      NetInfo.getConnectionInfo().then(connection => {
        if (connection.type == "none") {
          Toast.show({
            text: "Connect to the internet and try again",
            type: "danger"
          });
        } else {
          this.setState({ isVisible: true });
          axios
            .post(api.guestlogin, {
              address_1: this.state.address_1,
              city: this.state.city,
              country_id: 82,
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              telephone: this.state.telephone,
              email: this.state.email,
              isVisible: false,
              zone_id: this.state.zone
            })
            .then(response => {
              this.setState({ isVisible: false });
              //   console.warn(response.data);
              if (response.data.success == true) {
                // ToastAndroid.show(response.data.error, 4000);
                // console.warn(response.data);
                this.props.navigation.navigate("GuestShipping");

              }
              else if (response.data.error.email) {
                Toast.show({
                  text: response.data.error.email,
                  type: "warning",
                  duration: 5000
                });
              }
              else if (response.data.error.telephone) {
                Toast.show({
                  text: response.data.error.telephone,
                  type: "warning",
                  duration: 5000
                });
              }
            })
            .catch(error => {
              Alert.alert("Error occurred", error);
            });
        }
      });
    }
  }

  render() {
    const {
      address_1,
      city,
      country_id,
      firstname,
      lastname,
      telephone,
      email,
      zone,
      isVisible
    } = this.state;
    return (
      <Root>
        <ScrollView>
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
              <Label>Email</Label>
              <Input
                // value=""
                keyboardType="email-address"
                onChangeText={email => this.setState({ email })}
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
              <Label>Phone</Label>
              <Input
                // value=""
                onChangeText={telephone => this.setState({ telephone })}
                keyboardType="number-pad"
              />
            </Item>
            <Item floatingLabel>
              <Label>Address</Label>
              <Input
                // value=""
                onChangeText={address_1 => this.setState({ address_1 })}
              />
            </Item>
            {/* Picker */}
            <View style={styles.singleFields}>
              <Picker
                selectedValue={zone}
                onValueChange={(zone, itemIndex) => {
                  this.setState({ zone });
                }}
                style={{ height: 45 }}
              >
                <Picker.Item label="Select Region" value="" />
                {Regions.map(d => (
                  <Picker.Item label={d.title} value={d.value} key={d.title} />
                ))}
              </Picker>
            </View>
          </Form>

          {/* Loading */}
          <Overlay
            isVisible={isVisible}
            height={80}
            onBackdropPress={() => this.setState({ isVisible: false })}
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

          {/* Button */}
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
              onPress={() =>
                this.onContinuePress(
                  firstname,
                  lastname,
                  email,
                  address_1,
                  city,
                  telephone
                )
              }
            // onPress ={() => this.props.navigation.navigate('Verify')}
            >
              <Text style={{ color: "white" }}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
