import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  Button
} from "react-native";
import axios from "axios";
import { api, colors } from "../constants";
import { Form, Item, Label, Input } from "native-base";
export default class AccountSettings extends Component {
  static navigationOptions = {
    title: "Account Settings"
  };
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: "",
      firstname: "",
      lastname: "",
      email: "",
      telephone: ""
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchDetails();
  }

  fetchDetails() {
    axios
      .get(api.accountDetails)
      .then(response => {
        if (this._isMounted) {
          this.setState({
            firstname: response.data.data.firstname,
            lastname: response.data.data.lastname,
            email: response.data.data.email,
            telephone: response.data.data.telephone,
            isLoading: false
          });
        }
      })
      .catch(e => {
        Alert.alert("Error occured", e);
      });
  }

  updateData() {
    axios
      .post(api.accountDetails, {
        firstname: this.state.firstname,
        email: this.state.email,
        lastname: this.state.lastname,
        telephone: this.state.telephone
      })
      .then(response => {
        console.warn(response.data);
      })
      .catch(e => {
        Alert.alert("Error", e);
      });
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
            alignContent: "center",
            marginTop: 20
          }}
        >
          <Button
            onPress={() => this.updateData()}
            color={colors.primaryBlue}
            title="Update"
          />
        </View>
      </View>
    );
  }
}
