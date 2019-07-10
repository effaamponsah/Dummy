import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  TextInput,
  Button
} from "react-native";
import { colors, api } from "../constants";
import { Card, CardItem, Body } from "native-base";
import { Overlay } from "react-native-elements";
import axios from "axios";
export default class Settings extends Component {
  static navigationOptions = {
    title: "Details and Password"
  };
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      password: "",
      confirmpass: ""
    };
  }

  updatePassword(pass, confirm) {
    if (pass !== confirm) {
      Alert.alert("Ooops", "Ensure both passwords are the same");
    } else {
      axios
        .put(api.passwordUpdate, {
          password: pass,
          confirm: confirm
        })
        .then(response => {
          if (response.data.success == true) {
            this.setState({ isVisible: false });
            ToastAndroid.show("Password Successfully Updated", 3000);
          }
        })
        .catch(error => {
          Alert.alert("Error occurred", error);
        });
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: colors.primaryBackground, flex: 1 }}>
        {/* <TouchableOpacity
          onPress={() => this.props.navigation.navigate("AccountSettings")}
        >
          <Text>Account</Text>
        </TouchableOpacity> */}

        <Card>
          <CardItem
            button
            onPress={() => this.props.navigation.navigate("AccountSettings")}
          >
            <Body
              style={{
                flex: 1,
                justifyContent: "center",
                padding: 20,
                alignItems: "center"
              }}
            >
              <Text>Details</Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem
            button
            onPress={() =>
              this.setState({
                isVisible: true
              })
            }
          >
            <Body
              style={{
                flex: 1,
                justifyContent: "center",
                padding: 20,
                alignItems: "center"
              }}
            >
              <Text>Change Password</Text>
            </Body>
          </CardItem>
        </Card>

        <Overlay
          isVisible={this.state.isVisible}
          height={200}
          onBackdropPress={() => this.setState({ isVisible: false })}
          containerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View>
            <TextInput
              placeholder="New Password"
              returnKeyType="next"
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
            <TextInput
              placeholder="Confirm Password"
              returnKeyType="go"
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              onChangeText={confirmpass => this.setState({ confirmpass })}
            />

            <Button
              title="Update"
              onPress={() =>
                this.updatePassword(this.state.password, this.state.confirmpass)
              }
            />
          </View>
        </Overlay>

        <Card>
          <CardItem
            button
            onPress={() =>
              this.setState({
                isVisible: true
              })
            }
          >
            <Body
              style={{
                flex: 1,
                justifyContent: "center",
                padding: 20,
                alignItems: "center"
              }}
            >
              <Text>Address</Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}
