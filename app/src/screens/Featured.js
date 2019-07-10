// This component is just to render all the latest and the Featured items
import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  NetInfo,
  RefreshControl
} from "react-native";
import axios from "axios";
import { colors } from "../constants";
import { Icon, Toast, Root } from "native-base";
import NavigationService from "../navigation/NavigationService";
import EmpytCart from "../components/EmptyCart";
import { ListItem } from "react-native-elements";

const img = require("../../assets/images/internet.png");

export default class Featured extends Component {
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
      isLoading: true,
      data: [],
      nointernet: false,
      refreshing: false
    };
  }
  componentDidMount() {
    this._isMounted = true;
    const endpoint = this.props.navigation.getParam(
      "endpoint",
      "no enpoint found provided"
    );

    this.fetchData(endpoint);
  }

  fetchData = api => {
    axios
      .get(api, {
        headers: {
          "X-Oc-Image-Dimension": 50 * 100
        }
      })
      .then(response => {
        if (this._isMounted) {
          this.setState({
            data: response.data.data,
            isLoading: false
          });
        }
      })
      .catch(error => {
        this.setState({ nointernet: true, isLoading: false });
      });
  };

  retryPress = () => {
    const endpoint = this.props.navigation.getParam(
      "endpoint",
      "no enpoint found provided"
    );
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
      } else {
        this.setState({ isLoading: true, nointernet: false });
        this.fetchData(endpoint);
      }
    });
  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  _onRefresh = () => {
    const endpoint = this.props.navigation.getParam(
      "endpoint",
      "no enpoint found provided"
    );
    this.setState({ refreshing: true });
    this.fetchData(endpoint);
    this.setState({ refreshing: false });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={colors.primaryBlue} />
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
          {/* <Button title="Retry" onPress={() => this.retryPress()} /> */}
        </View>
      );
    }

    return (
      <Root>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              colors={[colors.primaryBlue]}
              title="Updating list"
            />
          }
        >
          {this.state.data.map(d => (
            <TouchableOpacity
              // style={styles.container}
              key={d.product_id}
              onPress={() => {
                NavigationService.navigate("Product", {
                  title: d.name,
                  id: d.product_id
                });
              }}
            >
              <ListItem
                bottomDivider={true}
                leftAvatar={{ source: { uri: d.thumb } }}
                title={d.name}
                subtitle={
                  // <View style={{ justifyContent: "center", bacgroundColor: "red" }}>
                  //   <Image source={{ uri: d.images }} style={styles.image} />
                  // </View>
                  <View
                  // style={{ flex: 0.6, justifyContent: "center", marginLeft: 30 }}
                  >
                    {d.price_formated ? (
                      <Text style={{ color: colors.primaryBlue }}>
                        {d.price_formated}
                      </Text>
                    ) : (
                        <Text style={{ color: colors.primaryBlue }}>
                          {d.price}
                        </Text>
                      )}
                  </View>
                }
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryGrey,
    flexDirection: "row"
  },
  image: {
    height: 100,
    width: 100,
    marginLeft: 30
  }
});
