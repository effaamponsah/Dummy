import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  NetInfo,
  Animated,
  Dimensions,
  Easing
} from "react-native";
import { api, colors } from "../constants";
import { Icon, Accordion, Root, Toast, Picker } from "native-base";
import { observer, inject } from "mobx-react/native";
import InformationData from "../components/InformationData";
import axios from "axios";
import { Overlay, Rating, Image } from "react-native-elements";
import EmpytCart from "../components/EmptyCart";
import Related from "../components/Related";
import Placeholder from "../components/Placeholder";
const img = require("../../assets/images/internet.png");
const imgs = [];
const SCREEN = Dimensions.get("window");
const FIXED_BAR_WIDTH = 100;
const BAR_SPACE = 10;

const images = [
  "https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png",
  "https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg",
  "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg"
];

@inject("shoppingcartstore")
export default class Product extends Component {
  numItems = images.length;
  itemWidth = FIXED_BAR_WIDTH / this.numItems - (this.numItems - 1) * BAR_SPACE;
  animVal = new Animated.Value(0);

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
      loaded: true,
      relatedData: [],
      available: false,
      selected: [],
      test: "",
      language: "",
      isLoading: true,
      product_option_id: "",
      isVisible: false,
      nointernet: false,
      optionp2: "",
      relatedData: "",
      product_option_id2: "",
      product_option_value_id2: ""
    };
    this.animatedValue = new Animated.Value(0);
  }
  componentDidMount() {
    const id = this.props.navigation.getParam("id", "no id");
    this._isMounted = true;
    this.fetch(id);
    this.fetchRelated(id);
  }

  componentWillUnmount() {
    _isMounted = false;
  }

  animteOptions() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.animatedValue, {
          toValue: 1.0,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(this.animatedValue, {
          toValue: -1.0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(this.animatedValue, {
          toValue: 0.0,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ]), {
        iterations: 5
      }
    ).start();
  }


  fetch(i) {
    axios
      .get(api.product + i, {
        headers: {
          "X-Oc-Image-Dimension": "2500 x 2500"
        }
      })
      .then(r => {
        if (this._isMounted) {
          if (r.data.data.images.length > 0) {
            imgs.length = 0;
            imgs.push(r.data.data.image);
            for (let i = 0; i < r.data.data.images.length; i++) {
              imgs.push(r.data.data.images[i]);
            }
          } else {
            imgs.length = 0;
            imgs.push(r.data.data.image);
          }
          this.setState(
            {
              data: r.data.data,
              isLoading: false
            },
            this.trial
          );
        }
      })
      .catch(e => {
        this.setState({ nointernet: true, isLoading: false });
      });
  }

  trial() {
    if (this.state.data.options.length == 1) {
      this.setState({ test: this.state.data.options[0].product_option_id });
    }
    if (this.state.data.options.length == 2) {
      this.setState({
        test: this.state.data.options[0].product_option_id,
        product_option_id2: this.state.data.options[1].product_option_id
      });
    }
  }

  _addToWishList = () => {
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
          .post(api.addToWishList + this.state.data.id)
          .then(res => {
            if (res.data.success == true) {
              this.setState({ isVisible: false });
              Toast.show({ text: "Item Added to Wishlist", type: "success" });
            } else {
              this.setState({ isVisible: false });
              Toast.show({ text: "Item previously added ", type: "danger" });
            }
          })
          .catch(() => {
            this.setState({ nointernet: true, isLoading: false });
          });
      }
    });
  };

  _toCart(id) {
    this.setState({ isVisible: true });
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        this.setState({ isVisible: false });
        Toast.show({
          text: "Please connect to the internet and try again",
          type: "danger",
          buttonText: "Okay"
        });
      } else {
        axios
          .post(api.addToCart, {
            product_id: id,
            quantity: 1,
            option: {
              [this.state.test]: this.state.language,
              [this.state.product_option_id2]: this.state
                .product_option_value_id2
            }
          })
          .then(response => {
            if (response.data.success == true) {
              this.setState({ isVisible: false });
              this.props.shoppingcartstore.add({ id: id });
              Toast.show({ text: "Item Added to Cart", type: "success" });
            } else if (response.data.error.option) {
              this.setState({ isVisible: false });
              Toast.show({ text: "Select preffered options", type: "warning" });
    this.animteOptions()


            } else {
              this.setState({ isVisible: false });
              Alert.alert("Oops", "This is strange, try again");
            }
          })
          .catch(() => {
            this.setState({ nointernet: true, isLoading: false });
          });
      }
    });
  }

  fetchRelated() {
    const id = this.props.navigation.getParam("id", "no id");
    axios
      .get(api.relatedItems + id, {
        headers: {
          "X-Oc-Image-Dimension": "500 x 1000"
        }
      })
      .then(response => {
        if (response.data.data.length != 0) {
          this.setState({ relatedData: response.data.data });
        }
      })
      .catch(() => {
        // alert("Error occured");
      });
  }

  retryPress = () => {
    const id = this.props.navigation.getParam("id", "no id");
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        this.fetch(id);
      } else {
        this.setState({ isLoading: true, nointernet: false });
        this.fetch(id);
        this.fetchRelated(id);
      }
    });
  };

  render() {
    const id = this.props.navigation.getParam("id", "no id");
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Retrieving item....</Text>
        </View>
      );
    }

    if (this.state.nointernet) {
      return (
        // <View
        //   style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        // >
        //   <Text>
        //     It appears you dont have a stable connection with our
        //     servers. Connect to the internet and try again
        //   </Text>
        // </View>
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
    if (this.state.data) {
    return (
      <Root>
        <ScrollView style={styles.container}>
          {/* Upper part */}

          <View>
            <View style={styles.container2} flex={1}>
             <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={10}
                    pagingEnabled
                    onScroll={Animated.event([
                      { nativeEvent: { contentOffset: { x: this.animVal } } }
                    ])}
                  >
                    {/* {imageArray} */}
                    {imgs.map((image, index) => (
                      <View style={{ height: SCREEN.height / 3 }} key={image}>
                        <Image
                          style={{ width: SCREEN.width, height: SCREEN.height / 3 }}
                          source={{ uri: image }}
                          resizeMode="contain"
                        />

                        <View
                          style={{
                            backgroundColor: "black",
                            borderRadius: 20,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 5,
                            paddingBottom: 5,
                            right: 0,
                            bottom: 0,
                            position: "absolute",
                            marginRight: 15,
                            opacity: 0.5
                          }}
                        >
                          <Text style={{ color: "white" }}>
                            {index + 1} / {imgs.length}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
            </View>

            <Animated.View
                style={{ 
                  marginLeft: 20, marginTop: 10,
                  transform:[
                      {
                        rotate:this.animatedValue.interpolate({
                          inputRange:[-1, 1],
                          outputRange:['-0.1rad', '0.1rad']
                        })
                      }
                  ]
                
                }}
                
              >
             {this.state.data.options.length == 1 ? (
                  <View>
                    {/* {this.state.data.options.map((d, i) => ( */}
                    <View>
                      <Text stye={{ color: "black" }}>
                        {this.state.data.options[0].name}
                      </Text>
                      <View>
                        <Picker
                          selectedValue={this.state.language}
                          style={{ height: 50, width: SCREEN.width }}
                          onValueChange={(itemValue) =>
                            this.setState({ language: itemValue })
                          }
                        >
                          <Picker.Item
                            label="Select preferred option"
                            value=""
                          />
                          {this.state.data.options[0].option_value.map(m => (
                            <Picker.Item
                              key={m.name}
                              label={m.name}
                              value={m.product_option_value_id}
                            />
                          ))}
                        </Picker>
                      </View>
                    </View>
                    {/* ))} */}
                  </View>
                ) : null}
                {this.state.data.options.length == 2 ? (
                  <View>
                    <View>
                      <Text stye={{ color: "black" }}>
                        {this.state.data.options[0].name}
                      </Text>
                      <View>
                        <Picker
                          selectedValue={this.state.language}
                          style={{ height: 50, width: SCREEN.width }}
                          onValueChange={(itemValue) =>
                            this.setState({ language: itemValue })
                          }
                        >
                          <Picker.Item
                            label="Select preferred option"
                            value=""
                          />
                          {this.state.data.options[0].option_value.map(m => (
                            <Picker.Item
                              key={m.name}
                              label={m.name}
                              value={m.product_option_value_id}
                            />
                          ))}
                        </Picker>
                      </View>
                    </View>
                    <View>
                      <Text stye={{ color: "black" }}>
                        {this.state.data.options[1].name}
                      </Text>
                      <View>
                        <Picker
                          selectedValue={this.state.product_option_value_id2}
                          style={{ height: 50, width: SCREEN.width }}
                          onValueChange={(itemValue) =>
                            this.setState({
                              product_option_value_id2: itemValue
                            })
                          }
                        >
                          <Picker.Item
                            label="Select preferred option"
                            value=""
                          />
                          {this.state.data.options[1].option_value.map(m => (
                            <Picker.Item
                              key={m.name}
                              label={m.name}
                              value={m.product_option_value_id}
                            />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  </View>
                ) : null}
              </Animated.View>

            <View style={{ padding: 15 }}>
              <Text style={{ color: colors.primaryGrey }}>
                {this.state.data.manufacturer}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 21 }}>
                {this.state.data.name}
              </Text>
              <Text
                style={{
                  color: colors.primaryBlue,
                  fontSize: 16,
                  fontWeight: "300"
                }}
              >
                {this.state.data.price_formated}
              </Text>
              {this.state.data.quantity == 0 ? (
                <Text style={{ color: "red" }}>
                  {this.state.data.stock_status}
                </Text>
              ) : null}
            </View>
          </View>

          {/* Add to Cart and WishList   */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              borderWidth: StyleSheet.hairlineWidth,
              padding: 5
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={this._addToWishList}
            >
              <Icon name="heart" style={{ color: colors.primaryBlue }} />
              <Text>Add to wishList</Text>
            </TouchableOpacity>

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
                <ActivityIndicator size="small" />
                <Text style={{ marginLeft: 20 }}>Adding......</Text>
              </View>
            </Overlay>

            <View>
              {this.state.data.quantity == 0 ? (
                <View>
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Icon name="shoppingcart" style={{ color: colors.primaryGrey }}  type="AntDesign" />
                    
                    <Text style={{ color: colors.primaryGrey }}>
                      Add to cart
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => this._toCart(this.state.data.id)}
                  >
                    <Icon name="shoppingcart" style={{ color: colors.primaryBlue }}  type="AntDesign" />

                    <Text>Add to cart</Text>
                  </TouchableOpacity>
                )}
            </View>
          </View>

          {/* Description */}
          <View style={styles.metaDataContainer}>
            <View style={styles.metaDataHeader}>
              <Icon
                name="information-circle"
                style={{ color: colors.primaryBlue }}
              />
              <Text
                style={{ marginLeft: 20, fontWeight: "bold", fontSize: 20 }}
              >
                Description
              </Text>
            </View>
            <Text style={{ marginTop: 10 }}>
              {this.state.data.description.replace(/<[^>]+>/g, "")}
            </Text>
          </View>

          {/* Information */}
          {/* <View style={styles.metaDataContainer}>
            <View style={styles.metaDataHeader}>
              <Icon name="settings" style={{ color: colors.primaryBlue }} />
              <Text
                style={{
                  marginLeft: 20,
                  fontWeight: "bold",
                  fontSize: 20,
                  marginBottom: 10
                }}
              >
                Information
              </Text>
            </View>
            <InformationData
              name={"Weight"}
              data={this.state.data.weight}
              units={this.state.data.weight_class}
            />
            <InformationData
              name={"Length"}
              data={this.state.data.length}
              units={this.state.data.length_class}
            />
            <InformationData
              name={"Width"}
              data={this.state.data.width}
              units={this.state.data.length_class}
            />
            <InformationData
              name={"Height"}
              data={this.state.data.height}
              units={this.state.data.length_class}
            />
          </View> */}

          {/* Reviews */}
          <View style={styles.metaDataContainer}>
            <View style={styles.metaDataHeader}>
              <Icon name="paper" style={{ color: colors.primaryBlue }} />
              <Text
                style={{ marginLeft: 20, fontWeight: "bold", fontSize: 20 }}
              >
                Reviews
              </Text>
            </View>
            <View style={{ justifyContent: "center", marginTop: 15 }}>
              <Text style={{ textAlign: "center", color: colors.primaryGrey }}>
                There are {this.state.data.reviews.review_total} for this
                product at the moment
              </Text>
            </View>
          </View>

          {/* Handles the options */}

          {/* Related ITems */}
          {this.state.relatedData ? (
              <Related
                products={this.state.relatedData}
                title="Products you may like"
              />
            ) : null}
        </ScrollView>
      </Root>
    );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  imageStyle: {
    height: 250,
    width: SCREEN.width,
    justifyContent: "center",
    alignItems: "center"
  },
  metaDataContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 20
  },
  metaDataHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  barContainer: {
    position: "absolute",
    zIndex: 2,
    top: 40,
    flexDirection: "row"
  },
  track: {
    backgroundColor: "#ccc",
    overflow: "hidden",
    height: 2
  },
  bar: {
    backgroundColor: "#5294d6",
    height: 2,
    position: "absolute",
    left: 0,
    top: 0
  }
});
