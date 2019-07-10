import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  NetInfo,
  Alert
} from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import axios from "axios";
import { api, colors } from "../constants";
import NavigationService from "../navigation/NavigationService";
import { Overlay } from "react-native-elements";
import { Root, Toast } from "native-base";
import EmpytCart from "../components/EmptyCart";

const img = require('../../assets/images/search.png');
const height = Dimensions.get("window");
export default class Search extends Component {
  static navigationOptions = {
    title: "Search"
    // header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: false,
      data: [],
      word: "earphone",
      displayEmpty: true
    };

    this.arrayHolder = [];
  }

  componentDidMount() {
    // this.setState({ displayEmpty: false })
  }

  updateSearch = search => {
    this.setState({ search });
  };

  _onsubmit = () => {
    this.setState({ displayEmpty: false });
    if (this.state.search.length !== "") {
      this.loadItems(this.state.search);
    }
  };

  loadItems(x) {
    this.setState({
      loading: true
    });
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        this.setState({ loading: false, displayEmpty: true });
        Toast.show({
          text: "Connect to the internet and try again",
          type: "danger",
          buttonText: "Okay"
        });
      } else {
        axios
          .get(api.search + x)
          .then(response => {
            this.setState({
              data: response.data.data,
              loading: false
            });
            // console.warn(this.state.data);
          })
          .catch(e => {
            console.warn("Error oo", e);
          });
      }
    });
  }

  componentDidMount() {
    //  this.loadItems()
  }

  _renderLoading() {
    return (
      <View
        style={{ alignItems: "center", justifyContent: "center", marginTop: 5 }}
      >
        {this.state.loading == true ? (
          <Overlay
            isVisible={true}
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
        ) : null}
      </View>
    );
  }

  _renderHeader() {
    const { search } = this.state;
    return (
      <View>
        {Platform.OS == "android" ? (
          <View>
            <SearchBar
              placeholder="Type a product here..."
              onChangeText={this.updateSearch}
              value={search}
              platform="default"
              lightTheme={true}
              inputContainerStyle={{ backgroundColor: "white" }}
              containerStyle={{ backgroundColor: colors.primaryHeaderColor }}
              returnKeyType="search"
              onSubmitEditing={this._onsubmit}
            />
          </View>
        ) : (
          <SearchBar
            placeholder="Search here..."
            onChangeText={this.updateSearch}
            value={search}
          />
        )}
      </View>
    );
  }

  _renderItems() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView>
          {this.state.data.map((d, i) => (
            <TouchableOpacity
              onPress={() =>
                // NavigationService.navigate("Product", {
                //   title: d.name,
                //   id: d.id
                // })

                NetInfo.getConnectionInfo().then(connection => {
                  if (connection.type == "none") {
                    Alert.alert(
                      "Error occurred",
                      "Please ensure that you have a working internet connection and try again"
                    );
                  } else {
                    NavigationService.navigate("Product", {
                      title: d.name,
                      id: d.id
                    });
                  }
                })
              }
            >
              <ListItem
                key={d.id}
                leftAvatar={{ source: { uri: d.image } }}
                title={d.name}
                subtitle={
                  <Text style={{ color: colors.primaryBlue }}>
                    {d.price_formated}
                  </Text>
                }
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  _renderEmptyResults() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Type Something to begin your search</Text>
      </View>
    );
  }

  _renderNoResults() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No results found for the search</Text>
      </View>
    );
  }

  render() {
    if (this.state.displayEmpty == true) {
      return (
        <Root>
          {this._renderHeader()}
          {/* <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Please type somthing to begin your search</Text>
          </View> */}
          <View
            style={{
              backgroundColor: "#fff",
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
          <EmpytCart text1="Type a product to begin your search" image={img}/>

          </View>
        </Root>
      );
    }
    return (
      <Root>
        <View style={{ flex: 1 }}>
          {this._renderHeader()}

          {/* {this.state.displayEmpty == true ? this._renderEmptyResults() : null} */}

          {/* <Text>{this.state.search}</Text> */}

          <View style={{ flex: 1, justifyContent: "center" }}>
            {this._renderLoading()}
            {this.state.data ? (
              this._renderItems()
            ) : (
              <View
                style={{
                  flex: 1,
                  alignContent: "center",
                  justifyContent: "center"
                }}
              >
                {this._renderNoResults()}
              </View>
            )}
          </View>
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
