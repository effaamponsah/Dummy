import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import { api, colors, headerimg } from "../constants";
import SubCartItems from "../components/SubCartItems";
import EmpytCart from "../components/EmptyCart";
const img = require("../../assets/images/internet.png");
let headerimage;
const screen = Dimensions.get("screen");
export default class SubCategories extends Component {
  _isMounted = false;
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam(
        "title",
        "No title provded from previous route"
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      nointernet: false,
      headerimg: ""
    };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam("id", "no id provided");
    this._isMounted = true;
    this.fetchdata(id);
    const header = this.props.navigation.getParam("title", "Rest");
    // console.warn(header);

    switch (header) {
      case "Mobile Phones":
        headerimage = headerimg["Mobile Phones"];
        break;
      case "Accessories":
        headerimage = headerimg.Assesories;
        break;
      case "Laptops":
        headerimage = headerimg.Laptops;
        break;
      case "Tablets":
        headerimage = headerimg.Tablets;
        break;
      default:
        headerimage = headerimg.Other;
        break;
    }
  }

  fetchdata = i => {
    axios
      .get(api.subCat + i)
      .then(response => {
        //console.warn("Response", response.data.data.sub_categories);
        if (this._isMounted) {
          this.setState({
            data: response.data.data.sub_categories,
            isLoading: false
          });
        }
      })
      .catch(e => {
        console.warn("Error", e);
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderItems = ({ item, index }) => {
    let style = {};
    if (index % 3 !== 0 || index % 3 === 0) {
      (style.borderLeftWidth = 10), (style.borderLeftColor = "white");
    }
    return (
      <View style={style}>
        <View style={{ borderRadius: 15 }}>
          <SubCartItems {...item} />
        </View>
      </View>
    );
  };
  keyExtractor = item => String(item.id);
  seperator = () => <View style={styles.seperator} />;
  retryPress = () => {
    const id = this.props.navigation.getParam("id", "no id");
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
      } else {
        this.setState({ isLoading: true, nointernet: false });
        this.fetchdata(id);
      }
    });
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={{ color: colors.primaryBlue }} />
        </View>
      );
    }
    if (this.state.nointernet) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <EmpytCart
            text1="It appears you dont have internet connection"
            text2="Connect to the internet and try again"
            btn
            func={this.retryPress}
            btntitle="Retry"
            image={img}
          />
        </View>
      );
    }
    return (
      <ScrollView>
        <View style={{ marginRight: 10 }}>
          <Image
            // source={require("../../assets/images/temp.jpg")}
            source={headerimage}

            style={{ height: screen.height / 3, width: screen.width }}
          />
        </View>
        <View style={{ padding: 10, marginTop: 5, borderRadius: 10 }}>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItems}
            keyExtractor={this.keyExtractor}
            numColumns={3}
            ItemSeparatorComponent={this.seperator}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    marginBottom: 20
  },
  seperator: {
    height: 10,
    backgroundColor: "white"
  }
});
