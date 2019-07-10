import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  NetInfo,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import { Form, Item, Label, Input, Container } from "native-base";
import PrimaryButton from "../components/PrimaryButton";
import { Overlay } from "react-native-elements";
import { api } from "../constants";

export default class PasswordUpdate extends Component {
  static navigationOptions = {
    title: "Update Password"
  };
  constructor(props) {
    super(props);
    this.state = {
      password1: "",
      confirmPassword: "",
      isVisible: false
    };
  }

  updatePassword(password1, confirmPassword) {
    NetInfo.getConnectionInfo().then(c => {
      if (c.type == "none") {
        ToastAndroid.show("Connect to the internet and try again", 3000);
      } else if (password1 !== confirmPassword) {
        Alert.alert("Ooops", "Ensure both passwords are the same");
      } else {
        this.setState({ isVisible: true });
        axios
          .put(api.passwordUpdate, {
            password: password1,
            confirm: confirmPassword
          })
          .then(response => {
            if (response.data.success == true) {
              this.setState({ isVisible: false });
              ToastAndroid.show("Password Successfully Updated", 3000);
            }
          })
          .catch(e => {
            console.warn("Error");
          });
      }
    });
  }

  render = () => {
    const { password1, confirmPassword, isVisible } = this.state;
    return (
      <Container style={{ flex: 1 }}>
        <Form>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              onChangeText={password1 => this.setState({ password1 })}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Confirm Password</Label>
            <Input
              onChangeText={confirmPassword =>
                this.setState({ confirmPassword })
              }
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Item>
        </Form>

        <PrimaryButton
          btntitle="Update"
          func={() => this.updatePassword(password1, confirmPassword)}
        />
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
      </Container>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
