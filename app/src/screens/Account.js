import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Image,
  ScrollView,
  NetInfo,
  ActivityIndicator
} from "react-native";
import { apiFunctions } from "../constants/api";
import { colors, api } from "../constants";
import axios from "axios";
import { Accordion, Icon } from "native-base";
import AccountLinks from "../components/AccountLinks";
import { LoginManager } from "react-native-fbsdk";
import { inject } from "mobx-react/native";
import { Avatar } from "react-native-elements";

const data = [
  {
    link: "WishList",
    title: "Wish list",
    icon: (
      <Icon
        name="hearto"
        style={{ color: colors.primaryGrey }}
        type="AntDesign"
      />
    )
  },
  {
    link: "History",
    title: "Order History",
    icon: (
      <Icon
        name="book"
        style={{ color: colors.primaryGrey }}
        type="AntDesign"
      />
    )
  },
  {
    link: "Track",
    title: "Track your orders",
    icon: (
      <Icon
        name="car"
        style={{ color: colors.primaryGrey }}
        type="MaterialCommunityIcons"
      />
    )
  },
  {
    link: "Settings",
    title: "Personal Information",
    icon: (
      <Icon
        name="setting"
        style={{ color: colors.primaryGrey }}
        type="AntDesign"
      />
    )
  },
  {
    link: "Share",
    title: "Share App",
    icon: (
      <Icon
        name="sharealt"
        style={{ color: colors.primaryGrey }}
        type="AntDesign"
      />
    )
  },
  {
    link: "About",
    title: "About App",
    icon: (
      <Icon
        name="ios-information-circle-outline"
        style={{ color: colors.primaryGrey }}
        type="Ionicons"
      />
    )
  }
];

@inject("shoppingcartstore")
export default class Account extends Component {
  _isMounted = false;
  static navigationOptions = {
    title: "My Account"
  };
  constructor(props) {
    super(props);
    this.state = {
      accountDetails: "",
      isLoading: true
    };
  }
  _signOutAsync = async () => {
    await apiFunctions.logout();
    await LoginManager.logOut();
    this.props.shoppingcartstore.remove();
    AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  componentDidMount() {
    this._isMounted = true;
    this.fetchUserDetails();

    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        this.retrieve();
      } else {
        this.fetchUserDetails();
      }
    });
  }

  fetchUserDetails() {
    axios
      .get(api.accountDetails)
      .then(res => {
        if (this._isMounted) {
          this.setState({
            accountDetails: res.data.data,
            isLoading: false
          });
          this.set(res.data.data);
          // console.warn(res.data);
          // if (res.data.data.cart.length != 6) {
          //   // this.props.shoppingcartstore.add({ id: 'test' });
          //   console.warn("SOmething");

          // }
        }
      })
      .catch(e => {
        console.warn(e);
        this.retrieve()
      });

  }

  async set(x) {
    try {
      await AsyncStorage.setItem("profile", JSON.stringify(x));
      // await this.setState({data: x})
    } catch (error) {
      Alert.alert("Error setting data");
    }
  }

  async retrieve() {
    try {
      const value = await AsyncStorage.getItem("profile");
      if (value !== null) {
        // Alert.alert("We have data");
        //log and set state here if everything works
        this.setState({
          accountDetails: JSON.parse(value),
          isLoading: false
        });
        //  console.warn(value);
      } else {
        // Alert.alert("We have no data");
        //  this.setState({isLoading: false})
        this.fetchUserDetails();
      }
    } catch (error) {
      Alert.alert("Error Fetching Data, Please restart the APP");
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator
            color={{ color: colors.primaryBlue }}
            size="small"
          />
        </View>
      );
    }
    return (
      // <View style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: "row", marginTop: 30, marginBottom: 30, marginLeft: 10 }}>
          <View style={{ marginLeft: 20 }}>
            <Avatar
              rounded
              source={require("../../assets/images/user.png")}
              size='large'
            />
          </View>
          <View style={styles.nameAndEmail}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {this.state.accountDetails.firstname} {this.state.accountDetails.lastname}
            </Text>
            <Text style={{ color: colors.primaryBlue }}>{this.state.accountDetails.email}</Text>
          </View>
        </View>

        {/* List */}
        {data.map(data => (
          <AccountLinks key={data.title} link={data.link}>
            <AccountLinks.Left>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flex: 0.2 }}>
                  <Text>{data.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>{data.title}</Text>
                </View>
              </View>
            </AccountLinks.Left>
            <AccountLinks.Right>
              <Icon
                name="ios-arrow-forward"
                style={{ color: colors.primaryGrey }}
              />
            </AccountLinks.Right>
          </AccountLinks>
        ))}

        {/* Logout Btn */}
        <View style={{ justifyContent: "flex-end", marginBottom: 40 }}>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={this._signOutAsync}
          // onPress ={() => this.props.navigation.navigate('Verify')}
          >
            <Text style={{ color: colors.primaryBlue }}>Log out</Text>
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
    alignItems: "center",
    padding: 5
  },
  nameAndEmail: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20
  },
  logoutBtn: {
    backgroundColor: "white",
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 18,
    borderWidth: 2,
    borderColor: colors.primaryBlue,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center"
  }
});
