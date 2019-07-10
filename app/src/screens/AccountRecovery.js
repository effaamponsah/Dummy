import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator, 
  Platform
} from "react-native";
import { Icon, Toast, Root } from "native-base";
import { colors, api } from "../constants";
const screen = Dimensions.get("window");
import axios from "axios";
import { Overlay } from "react-native-elements";

export default class Recovery extends Component {
  static navigationOptions = {
    title: "Account Recovery"
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isVisible: false
    };
  }

  _onbtnPress = email => {
    if (email == "") {
      // Alert.alert("Error", "Please enter your email");
      Toast.show({
        text: "Please enter your email",
        type: "danger"
      });
    } else {
      this.setState({ isVisible: true });
      axios
        .post(api.passwordreset, {
          email: email
        })
        .then(res => {
          if (res.data.success == true) {
            this.setState({ isVisible: false });
            Toast.show({
              text: "Email successfully sent",
              type: "success",
              duration: 4000
            });
          }
          // Alert.alert("Ooops", res.data.error[0]);
          else {
            this.setState({ isVisible: false });
            Toast.show({
              text: res.data.error[0],
              buttonText: "Okay",
              type: "danger",
              duration: 3000
            });
          }
        })
        .catch(e => {
          console.log("Error", e);
        });
    }
  };

  render() {
    return (
      <Root>
        <View style={styles.container}>
          {/* Text */}
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 35, fontWeight: "bold" }}>
              Enter your e-mail
            </Text>
            <Text style={{ color: colors.primaryGrey, fontSize: 18 }}>
              we will do the magic
            </Text>
          </View>

          {/* Text Field */}
          <View style={styles.inputbox}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Icon name="mail" style={styles.iconStyle} />
              </View>
              <TextInput
                style={styles.formPlace}
                placeholder="Enter your email"
                placeholderTextColor="#cccccc"
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                onChangeText={email => this.setState({ email })}
              />
            </View>
          </View>

          <Overlay
            isVisible={this.state.isVisible}
            height={80}
            // onBackdropPress={() => this.setState({ isVisible: false })}
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

          <View>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primaryBlue,
                paddingTop: 15,
                paddingBottom: 15,
                alignItems: "center",
                borderRadius: 5,
                marginTop: 18
              }}
              onPress={() => this._onbtnPress(this.state.email)}
              // onPress ={() => this.props.navigation.navigate('Verify')}
            >
              <Text style={{ color: "white" }}>Send e-mail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30
  },
  inputbox: {
    paddingLeft: 15,
    borderRadius: 5,
    marginTop: 5,
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        // height: 35,
        justifyContent: "center",
        height: 45
      }
    })
  },
  iconStyle: {
    height: 26,
    width: 26,
    marginRight: 10,
    color: colors.primaryGrey
    // marginTop: 10
  },
  formPlace: {
    fontSize: 16,
    paddingHorizontal: 10,
    width: screen.width
  }
});
