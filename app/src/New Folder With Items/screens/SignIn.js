import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  AsyncStorage,
  NetInfo,
  Platform,
  ToastAndroid
} from "react-native";
import { Icon, Root, Toast } from "native-base";
// import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";
import { observer, inject } from "mobx-react/native";
import {
  LoginManager,
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";

import { colors, api } from "../constants";
import { apiFunctions } from "../constants/api";
import { Overlay } from "react-native-elements";
let screen = Dimensions.get("window");

// @inject("me")
export default class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null,
      loading: false,
      isVisible: false,
      fbbAuthToken: ""
    };
  }
  _responseInfoCallback = (error, result) => {
    if (error) {
      // alert("Error fetching data: " + error.toString());
      Toast.show({
        text: error.toString(),
        type: "warning"
      });
    } else {
      // axios.post(api.logoutUrl).then(res => {
      //   console.warn(res.data);
      // });
      //   .catch(error => {
      //     Alert.alert("Error ocurred", error)
      //   })

      // axios.post(api.logoutUrl).then(res => {
      //   console.warn(res.data)
      // })
      // .catch(e => {
      //   console.warn(e);
      // })

      // console.warn("Email",result.email);
      // console.warn("Token \n", this.state.fbbAuthToken);

      axios
        .post(
          "https://moscophones.com/index.php?route=rest/login/sociallogin",
          {
            email: result.email,
            access_token: this.state.fbbAuthToken,
            provider: "facebook"
          },
          {
            headers: {
              "X-Oc-Session": "rea38d33jt4ho84d71e7v0uoi6"
            }
          }
        )
        .then(response => {
          if (response.data.data) {
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
          console.warn("Error", error);
        });
    }
  };

  login = (email, password) => {
    if (email == "" || password == "") {
      // Alert.alert("Ooops", "Please ensure that all fields are filled");
      Toast.show({
        text: "Please ensure that all fields are filled!",
        buttonText: "Okay",
        type: "danger"
      });
    } else {
      this.setState({ isVisible: true });
      NetInfo.getConnectionInfo().then(connection => {
        if (connection.type == "none") {
          this.setState({ isVisible: false });
          Toast.show({
            text: "Connect to the internet and try again",
            type: "danger",
            buttonText: "Okay"
          });
        } else {
          axios
            .post(api.loginUrl, {
              email: email,
              password: password
            })
            .then(res => {
              if (res.data.data) {
                AsyncStorage.setItem("userToken", "abc");
                this.setState({ isVisible: false });
                this.props.navigation.navigate("Account");
              } else {
                // console.warn(res.data);
                this.setState({ isVisible: false });
                Toast.show({ text: res.data.error.warning, type: "danger" });
                //Alert.alert("Ooops", res.data.error.warning);
                // this.setState({ isVisible: false });
              }
            })
            .catch(e => {
              console.log("Error", e);
            });
        }
      });
    }
  };

  showAlert() {
    this.setState({
      loading: true
    });
  }

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
        // console.warn("Error", error);
        if (error.code == "EUNSPECIFIED") {
          Toast.show({
            text: "Connect to the internet and try again",
            type: "danger",
            buttonText: "Okay"
          });
        }
      });
  }
  render() {
    // console.warn(this.props)
    return (
      <Root>
        <ScrollView style={styles.container}>
          <View style={styles.text2}>
            {/* <Text style={{fontSize: 18, fontWeight: 'bold',  color: '#fff'}}>LOGIN</Text> */}
          </View>

          {/* <AwesomeAlert
          show={this.state.loading}
          showProgress={true}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          message="Loading"
          /> */}

          {/* Text */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 35, fontWeight: "bold", color: "black" }}>
              Welcome back
            </Text>
          </View>

          {/* Login Field */}
          <View style={styles.inputbox}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "center" }}>
                <Icon name="person" style={styles.iconStyle} />
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

          {/* Password Field */}
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

          {/* ForgotPassword */}
          <View>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => this.props.navigation.navigate("Recovery")}
            >
              <Text style={{ color: colors.primaryHeaderColor }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Btn */}
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
              onPress={() => this.login(this.state.email, this.state.password)}
              // onPress ={() => this.props.navigation.navigate('Verify')}
            >
              <Text style={{ color: "white" }}>Log in</Text>
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
            // style={{ marginLeft: 30, marginRight: 30 }}
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

          {/* No Account */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15
            }}
          >
            <View style={{ flexDirection: "row", mariginTop: 50 }}>
              <Text style={{ fontWeight: "300" }}>No Account Yet?</Text>
              <TouchableOpacity
                style={{ marginLeft: 5 }}
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <Text
                  style={{
                    color: colors.primaryHeaderColor,
                    fontWeight: "300"
                  }}
                >
                  Sign Up
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
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    //  alignItems: 'center',
    // justifyContent: 'center',
    padding: 30
  },
  buttons: {
    marginTop: 10
  },
  text: {
    marginTop: 50,
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  text2: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
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
  formPlace: {
    fontSize: 16,
    paddingHorizontal: 10,
    width: screen.width
  },
  iconStyle: {
    ...Platform.select({
      android: {
        height: 26,
        width: 26,
        marginRight: 10,
        color: colors.primaryGrey
      },
      ios: {
        color: colors.primaryGrey
      }
    })
    // marginTop: 10
  }
});
