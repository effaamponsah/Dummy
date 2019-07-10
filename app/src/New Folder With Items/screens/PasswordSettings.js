 import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert
} from "react-native";
import axios from "axios";
import { api, colors } from "../constants";
import { Button, Form, Item, Label, Input } from "native-base";
export default class PasswordSettings extends Component {
  static navigationOptions = {
    title: "Account Settings"
  };
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      password1,
      confirm
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  updatePassword(password, confirm) {
    if (password !== confirm) {
      Alert.alert("Check that both are equal before");
    } else {
      axios
        .post(api.passwordUpdate, {
          password: this.state.password1,
          confirm: this.state.confirm
        })
        .then(response => {
          console.warn(response.data);
        })
        .catch(e => {
          Alert.alert("Error", e);
        });
    }
  }
  componentWillUnmount() {
    _isMounted = false;
  }

  render() {
    const { firstname, lastname, email, telephone } = this.state;
    if (this.state.isLoading) {
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
    return (
      <View>
        {/* <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={firstname => this.setState({ firstname })}
          value={firstname}
        /> */}

        <Form>
          <Item floatingLabel>
            <Label>Firstname</Label>
            <Input
              value={firstname}
              onChangeText={firstname => this.setState({ firstname })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Lastname</Label>
            <Input
              value={lastname}
              onChangeText={lastname => this.setState({ lastname })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              value={email}
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Telephone</Label>
            <Input
              value={telephone}
              onChangeText={telephone => this.setState({ telephone })}
            />
          </Item>
        </Form>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center"
          }}
        >
          <Button
            info
            onPress={() =>
              this.updatePassword(this.state.password, this.state.password1)
            }
          >
            <Text>Update</Text>
          </Button>
        </View>
      </View>
    );
  }
}
