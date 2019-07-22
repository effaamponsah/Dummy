import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  NetInfo,
  ActivityIndicator,
  ToastAndroid,
  Dimensions
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors, api } from "../constants";
import { Icon, Card, CardItem } from "native-base";
import axios from "axios";
import NavigationService from "../navigation/NavigationService";
import { ListItem, Image, Overlay } from "react-native-elements";
import EmpytCart from "./EmptyCart";
const SCREEN = Dimensions.get("window");

const img = require("../../assets/images/internet.png");

export default class ProductsItems extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      nointernet: false,
      isVisible: false
    };
  }

  keyExtractor = item => String(item.id);

  componentDidMount() {
    this._isMounted = true;
    const id = this.props.id;
    this.fetchdata(id);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  retryPress = () => {
    const id = this.props.id;
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
      } else {
        this.setState({ isLoading: true, nointernet: false });
        this.fetchData(id);
      }
    });
  };
  fetchdata = i => {
    axios
      .get(api.products + i)
      .then(response => {
        if (this._isMounted) {
          this.setState({
            data: response.data.data,
            isLoading: false
          });
        }
      })
      .catch(e => {
        this.setState({ nointernet: true, isLoading: false });
      });
  };

  addToWishList(id) {
    this.setState({ isVisible: true });
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        this.setState({ isVisible: false });
        ToastAndroid.show("Connect to the internet and try again", 4000);
      } else {
        axios
          .post(api.addToWishList + id)
          .then(res => {
            if (res.data.success == true) {
              this.setState({ isVisible: false });
              ToastAndroid.show("Item Added to Wishlist", ToastAndroid.LONG);
            } else {
              this.setState({ isVisible: false });
              ToastAndroid.show("Item previously added ", ToastAndroid.LONG);
              // Alert.alert("Oops", "Item previously added to wish list");
            }
          })
          .catch(e => {
            this.setState({ nointernet: true, isLoading: false });
          });
      }
    });
  }
  renderItems = ({ item, index }) => {
    let style = {};
    // if (index % 2 !== 0 ) {
    //   (style.borderLeftWidth = 10), (style.borderLeftColor = "red");
    // }
    return (
      <View style={{marginLeft:6}}>
        <TouchableOpacity
          // style={styles.container}
          // key={i}
          onPress={() => {
            NavigationService.navigate("Product", {
              title: item.name,
              id: item.id
            });
          }}
        >
          <Card
            style={{
              paddingTop: 10,
              marginLeft: 15,
              maxWidth: SCREEN.width / 2.2,
              borderRadius: 9,
              width: 180
            }}
          >
            <CardItem cardBody>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
               
              />
            </CardItem>
            <View style={{ padding: 10 }}>
              <Text
                style={{ fontWeight: "500", flex: 1, color: "black" }}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              {item.quantity == 0 ? (
                <Text style={{ color: "red" }}>SOLD OUT</Text>
              ) : (
                <Text style={{ color: "green" }}>IN STOCK</Text>
              )}
              {/* <Text>Ratings</Text> */}

              <View style={{ flexDirection: "row-reverse" }}>
                {item.price_formated ? (
                  <Text
                    style={{ fontWeight: "600", color: colors.primaryBlue }}
                  >
                    {item.price_formated}
                  </Text>
                ) : (
                  <Text
                    style={{ fontWeight: "600", color: colors.primaryBlue }}
                  >
                    {item.price}
                  </Text>
                )}
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };


  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop:30 }}
        >
          <ActivityIndicator color={colors.primaryBlue} />
          <Text style={{color: 'black'}}>Fetching items</Text>
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
      <ScrollView>
        {/* {this.state.data ? (
          this.state.data.map((d, i) => (
            <TouchableOpacity
              // style={styles.container}
              key={i}
              onPress={() => {
                NavigationService.navigate("Product", {
                  title: d.name,
                  id: d.id
                });
              }}
            >
              <ListItem
                bottomDivider={true}
                leftAvatar={{ source: { uri: d.image } }}
                title={d.name}
                subtitle={
                  <View>
                    <Text style={{ color: colors.primaryBlue }}>
                      {d.price_formated}
                    </Text>
                    {d.quantity == 0 ? (
                      <Text style={{ color: "red" }}>{d.stock_status}</Text>
                    ) : (
                      <Text style={{ color: colors.primaryHeaderColor }}>
                        IN STOCK
                      </Text>
                    )}
                  </View>
                }
                rightIcon={<Icon name="ios-arrow-forward" />}
              />
            </TouchableOpacity>
          ))
        ) : (
          <EmpytCart
            text1="No Items found from this category"
            text2="Please try again later"
          />
        )} */}
        <View style={styles.container2}>
          <View style={{ justifyContent: "center" }}>
            <FlatList
              style={{ margin: 5 }}
              data={this.state.data}
              numColumns={2}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItems}
            />
          </View>
        </View>
      </ScrollView>
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
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colors.primaryBackground,
    // marginTop: 10
    paddingTop: 5,
    marginLeft: -20
  }
});
