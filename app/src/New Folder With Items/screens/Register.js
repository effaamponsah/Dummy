import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Picker,
  Linking
} from "react-native";
import { Icon, Toast, Root } from "native-base";
import { colors, Regions, api } from "../constants";
import axios from "axios";
import { Overlay } from "react-native-elements";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import { apiFunctions } from "../constants/api";
export default class Register extends Component {
  static navigationOptions = {
    title: "Sign Up"
  };
  constructor(props) {
    super(props);
    this.state = {
      FName: "",
      LName: "",
      email: "",
      password: "",
      confirmPassword: "",
      number: "",
      region: "",
      city: "",
      address: "",
      isVisible: false,
      fbbAuthToken: ""
    };
  }

  signup = (
    FName,
    LName,
    email,
    password,
    confirmPassword,
    number,
    region,
    city,
    address
  ) => {
    this.setState({ loading: true });
    if (
      FName == "" ||
      LName == "" ||
      email == "" ||
      password == "" ||
      confirmPassword == "" ||
      number == "" ||
      region == "" ||
      city == "" ||
      address == ""
    ) {
      // this.setState({ loading: false });
      Toast.show({
        text: "All fields are mandatory",
        buttonText: "Okay",
        type: "danger"
      });
    } else if (password != confirmPassword) {
      // Alert.alert("Ooops", "Please ensure that both passwords are equal");
      Toast.show({
        text: "Passwords not equal",
        type: "warning"
      });
    } else if (number.length != 10) {
      Toast.show({
        text: "Invalid number",
        type: "warning"
      });
      // Alert.alert("Ooops", "Invalid Number entered");
    } else {
      // console.warn("Hello world", number.length);
      this.setState({ isVisible: true });
      axios
        .post(api.register, {
          firstname: FName,
          lastname: LName,
          email: email,
          address_1: address,
          city: city,
          country_id: 82,
          zone_id: region,
          password: password,
          confirm: confirmPassword,
          telephone: number,
          agree: 1
        })
        .then(response => {
          if (response.data.success == true) {
            this.setState({ isVisible: false });
            // console.warn("Account Created");
            Alert.alert("Success", "Account created");
          } else {
            // console.warn("error", response.data);
            if (response.data.error.email) {
              this.setState({ isVisible: false });
              Alert.alert("Oops", response.data.error.email);
            } else if (response.data.error.city) {
              this.setState({ isVisible: false });
              Alert.alert("Oops", response.data.error.city);
            } else if (response.error.password) {
              this.setState({ isVisible: false });
              Alert.alert("Oops", response.data.error.password);
            } else {
              console.warn("Account Created");
              Alert.alert(
                "Success",
                "Account created Successfully. Check your email for confirmation link and head back to log in "
              );
            }
          }
        })
        .catch(e => {
          console.warn(e);
        });
    }
  };

  _responseInfoCallback = (error, result) => {
    if (error) {
      // alert("Error fetching data: " + error.toString());
      Toast.show({
        text: error.toString(),
        type: "warning"
      });
    } else {


      axios
        .post(
          "https://moscophones.com/index.php?route=rest/login/sociallogin",
          {
            email: result.email,
            access_token: this.state.fbbAuthToken,
            provider: "facebook"
          }
        )
        .then(response => {
          if (response.data.success == true) {
            AsyncStorage.setItem("userToken", "abc");
            this.props.navigation.navigate("Account");
          } else if (response.data.error.warning) {
            // Toast.show({ text: response.data.error.warning, type: 'warning' });
            // console.warn(response.data.error.warning)
            Toast.show({
              text: response.data.error.warning,
              type: "warning",
              duration: 5000
            });
            apiFunctions.logout();
            LoginManager.logOut();
          } else {
            axios
            .post(api.logoutUrl)
            .then(res => {
              console.warn(res.data);
            })
            .catch(e => {
              console.warn(e);
            });
          }
          // console.warn("This is the response", response.data);
        })
        .catch(error => {
          console.warn("This is the error", error);
          apiFunctions.logout();
          LoginManager.logOut();
        });
    }
  };

  socialLogin() {
    LoginManager.logInWithReadPermissions(["public_profile", "email"])
      .then(result => {
        if (result.isCancelled) {
          // console.warn('Login cancelled')
        } else {
          // console.warn('Login success with permissions: ' + result.grantedPermissions.toString())
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data;
            this.setState({ fbbAuthToken: accessToken });
            const infoRequest = new GraphRequest(
              "/me?fields=name,picture,email",
              null,
              this._responseInfoCallback
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      })
      .catch(error => {
        // Toast.show({
        //   text: error
        //  } )
        console.warn("Error", error);
      });
  }
  _terms = () => {
    Linking.openURL(
      "https://www.moscophones.com/index.php?route=information/information/info&information_id=3"
    );
  };

  render() {
    return (
      <Root>
        <ScrollView style={styles.container}>
          {/* Intro text */}
          <View
            style={{
              marginLeft: 30,
              marginRight: 30,
              marginTop: 10,
              marginBottom: 10
            }}
          >
            <Text>
              By Pressing Sign Up or Continue with facebook, you agree with the
            </Text>
            <TouchableOpacity onPress={this._terms}>
              <Text style={{ color: colors.primaryHeaderColor }}>
                Terms of Service
              </Text>
            </TouchableOpacity>
          </View>

          {/* Name */}
          <View
            style={{ flexDirection: "row", marginLeft: 30, marginRight: 30 }}
          >
            <View style={styles.inputbox}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ justifyContent: "center" }}>
                  <Icon name="person" style={styles.iconStyle} />
                </View>
                <TextInput
                  style={styles.formPlace}
                  placeholder="First Name"
                  placeholderTextColor="#cccccc"
                  returnKeyType="next"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  onChangeText={FName => this.setState({ FName })}
                />
              </View>
            </View>

            <View style={styles.inputbox2}>
              <TextInput
                style={styles.formPlace}
                placeholder="Last Name"
                placeholderTextColor="#cccccc"
                returnKeyType="next"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                onChangeText={LName => this.setState({ LName })}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.singleFields}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "center" }}>
                <Icon name="mail" style={styles.iconStyle} />
              </View>
              <TextInput
                style={styles.formPlace}
                placeholder="Enter your email"
                placeholderTextColor="#cccccc"
                returnKeyType="next"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                onChangeText={email => this.setState({ email })}
              />
            </View>
          </View>

          {/* Password */}
          <View
            style={{ flexDirection: "row", marginLeft: 30, marginRight: 30 }}
          >
            <View style={styles.inputbox}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ justifyContent: "center" }}>
                  <Icon name="lock" style={styles.iconStyle} />
                </View>
                <TextInput
                  style={styles.formPlace}
                  placeholder="Password"
                  placeholderTextColor="#cccccc"
                  secureTextEntry={true}
                  returnKeyType="go"
                  underlineColorAndroid="transparent"
                  onChangeText={password => this.setState({ password })}
                />
              </View>
            </View>

            <View style={styles.inputbox2}>
              <TextInput
                style={styles.formPlace}
                placeholder="Confirm password"
                placeholderTextColor="#cccccc"
                secureTextEntry={true}
                returnKeyType="go"
                underlineColorAndroid="transparent"
                onChangeText={confirmPassword =>
                  this.setState({ confirmPassword })
                }
              />
            </View>
          </View>

          {/* Phone NUmber */}
          <View style={styles.singleFields}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Image
                  style={styles.flagStyle}
                  source={require("../../assets/images/flag.png")}
                />
                <Text
                  style={{
                    fontSize: 16
                    // paddingTop: 4,
                    // marginLeft: 2
                    // marginTop: 10
                  }}
                >
                  +233
                </Text>
              </View>
              <TextInput
                style={{ fontSize: 16, paddingHorizontal: 10, width: 300 }}
                placeholder="Enter your phone number."
                underlineColorAndroid="transparent"
                placeholderTextColor="#cccccc"
                keyboardType="phone-pad"
                onChangeText={number => this.setState({ number })}
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
              <Text style={{ marginLeft: 20 }}>Please wait</Text>
            </View>
          </Overlay>

          {/* Region Select */}
          <View style={styles.singleFields}>
            <Picker
              selectedValue={this.state.region}
              onValueChange={(region, itemIndex) => {
                this.setState({ region: region });
              }}
              style={{ color: colors.primaryGrey, height: 45 }}
            >
              <Picker.Item label="Select Region" value="" />
              {Regions.map(d => (
                <Picker.Item label={d.title} value={d.value} key={d.title} />
              ))}
            </Picker>
          </View>

          {/* City and Address */}
          <View
            style={{ flexDirection: "row", marginLeft: 30, marginRight: 30 }}
          >
            <View style={styles.inputbox}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ justifyContent: "center" }}>
                  <Icon name="globe" style={styles.iconStyle} />
                </View>
                <TextInput
                  style={styles.formPlace}
                  placeholder="Enter City"
                  placeholderTextColor="#cccccc"
                  returnKeyType="next"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  onChangeText={city => this.setState({ city })}
                />
              </View>
            </View>

            <View style={styles.inputbox2}>
              <TextInput
                style={styles.formPlace}
                placeholder="Address"
                placeholderTextColor="#cccccc"
                returnKeyType="next"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                onChangeText={address => this.setState({ address })}
              />
            </View>
          </View>

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
                this.signup(
                  this.state.FName,
                  this.state.LName,
                  this.state.email,
                  this.state.password,
                  this.state.confirmPassword,
                  this.state.number,
                  this.state.region,
                  this.state.city,
                  this.state.address
                )
              }
              // onPress ={() => this.props.navigation.navigate('Verify')}
            >
              <Text style={{ color: "white" }}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* OR */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 7
            }}
          >
            <Text>or</Text>
          </View>

          {/* Facebook */}
          <TouchableOpacity
            style={{ marginLeft: 30, marginRight: 30 }}
            onPress={() => this.socialLogin()}
          >
            <View
              style={{
                backgroundColor: colors.facebookColor,
                paddingTop: 9,
                paddingBottom: 9,
                alignItems: "center",
                borderRadius: 5
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon
                  name="logo-facebook"
                  style={{ color: "white", marginRight: 10 }}
                />
                <Text style={{ color: "white", alignSelf: "center" }}>
                  Continue with facebook
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Already Have an Account */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
              marginBottom: 40
            }}
          >
            <View style={{ flexDirection: "row", mariginTop: 50 }}>
              <Text style={{ fontWeight: "300" }}>Already have an account</Text>
              <TouchableOpacity
                style={{ marginLeft: 5 }}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text
                  style={{
                    color: colors.primaryHeaderColor,
                    fontWeight: "300"
                  }}
                >
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  inputbox: {
    // backgroundColor: "#fff",
    paddingLeft: 15,
    borderRadius: 5,
    marginTop: 10,
    // borderColor: "#9f9f9f",
    // borderWidth: 1
    borderWidth: StyleSheet.hairlineWidth
  },
  inputbox2: {
    flex: 1,
    paddingLeft: 15,
    borderRadius: 5,
    marginTop: 10,
    // borderColor: "#9f9f9f",
    // borderWidth: 1,
    marginLeft: 10,
    borderWidth: StyleSheet.hairlineWidth
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
    // padding: "10%",
    // padding: 30
  },
  input: {
    height: 50,
    width: 350,
    //padding: 12,
    backgroundColor: "#f3f3f3",
    marginBottom: 10,
    color: "black",
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttons: {
    marginTop: 10,
    alignItems: "center"
  },
  text: {
    // marginTop: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  formPlace: {
    fontSize: 16,
    paddingHorizontal: 10
  },
  iconStyle: {
    height: 26,
    width: 26,
    marginRight: 8,
    // marginTop: 10,
    color: colors.primaryGrey
  },
  flagStyle: {
    height: 26,
    width: 26,
    resizeMode: "contain",
    marginRight: 8
    // marginTop: 10
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
