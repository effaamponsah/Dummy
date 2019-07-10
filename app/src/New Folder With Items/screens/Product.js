import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Picker,
  NetInfo,
  Animated,
  Dimensions
} from "react-native";
import Slider from "../components/Slider";
import { api, colors } from "../constants";
import { Icon, Accordion, Root, Toast } from "native-base";
import { observer, inject } from "mobx-react/native";
import InformationData from "../components/InformationData";
import axios from "axios";
import CardItems from "../components/Card";
import { Overlay } from "react-native-elements";
import ProductSlider from "../components/ProductSlider";

const deviceWidth = Dimensions.get("window").width;
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
      isVisible: false
    };
  }
  componentDidMount() {
    const id = this.props.navigation.getParam("id", "no id");
    this._isMounted = true;
    this.fetch(id);
  }

  componentWillUnmount() {
    _isMounted = false;
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
          this.setState(
            {
              data: r.data.data,
              images: r.data.data.imgages,
              isLoading: false
            },
            this.trial
          );
        }
      })
      .catch(e => {
        Alert.alert("Oops", e);
      });
  }

  trial() {
    if (this.state.data.options.length > 0) {
      this.setState({ test: this.state.data.options[0].product_option_id });
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
              // Alert.alert("Oops", "Item previously added to wish list");
            }
          })
          .catch(e => {
            Alert.alert("Error", e);
          });
      }
    });
  };

  _toCart(id) {
    // let m = this.state.product_option_id;
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
              // 21: this.state.language
              [this.state.test]: this.state.language
            }
          })
          .then(response => {
            if (response.data.success == true) {
              this.setState({ isVisible: false });
              this.props.shoppingcartstore.add({ id: id });
              Toast.show({ text: "Item Added to Cart", type: "success" });
            } else if (response.data.error.option) {
              this.setState({ isVisible: false });
              Toast.show({ text: "Select prefered options", type: "warning" });
            } else {
              this.setState({ isVisible: false });
              Alert.alert("Oops", "This is strange");
            }
          })
          .catch(error => {
            Alert.alert("Oops", error);
          });
      }
    });
  }

  fetchRelated() {
    const id = this.props.navigation.getParam("id", "no id");
  }

  render() {
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
      <Root>
        <ScrollView style={styles.container}>
          {/* Upper part */}

          <View>
            <View style={styles.container2} flex={1}>
              {this.state.data.images.length == 0 ? (
                <Image
                  source={{ uri: this.state.data.image }}
                  // style={styles.imageStyle}
                  style={{ width: deviceWidth, height: 250 }}
                />
              ) : (
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
                  {this.state.data.images.map((image, index) => (
                    <View style={{ marginTop: 10 }}>
                      <Image
                        style={{ width: deviceWidth, height: 250 }}
                        source={{ uri: image }}
                        resizeMode="contain"
                        onLoadStart={() => console.warn("Loading image")}
                        onLoadEnd={() => console.warn("Loading Done")}
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
                          {index + 1} / {this.state.data.images.length}
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>

            <View style={{ marginLeft: 20 }}>
              {this.state.data.options.length > 0 ? (
                <View>
                  {this.state.data.options.map((d, i) => (
                    <View>
                      <Text>{d.name}</Text>
                      <View>
                        <Picker
                          selectedValue={this.state.language}
                          style={{ height: 50, width: 100 }}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({ language: itemValue })
                          }
                        >
                          <Picker.Item label="Select one" value="" />
                          {d.option_value.map(m => (
                            <Picker.Item
                              label={m.name}
                              value={m.product_option_value_id}
                            />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>

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
                <ActivityIndicator size="large" />
                <Text style={{ marginLeft: 20 }}>Please wait</Text>
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
                    <Icon name="cart" style={{ color: colors.primaryGrey }} />
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
                  <Icon name="cart" style={{ color: colors.primaryBlue }} />
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
          <View style={styles.metaDataContainer}>
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
          </View>

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
        </ScrollView>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  imageStyle: {
    height: 250,
    width: deviceWidth,
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
