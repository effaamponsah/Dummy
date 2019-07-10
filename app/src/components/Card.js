import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  NetInfo,
  ToastAndroid
} from "react-native";
let screen = Dimensions.get("window");
import { Card, CardItem, Text, Button } from "native-base";
import { api, colors } from "../constants";
import NavigationService from "../navigation/NavigationService";
import axios from "axios";
import { Rating } from "react-native-ratings";
import { Overlay } from "react-native-elements";

export default class CardItems extends Component {
  _isMounted = false;
  state = {
    data: [],
    isLoading: true,
    isVisible: false
  };
  componentDidMount() {
    this._isMounted = true;
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        this.retrieve();
      } else {
        this.fetch();
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  fetch() {
    axios
      .get(this.props.endpoint, {
        headers: {
          "X-Oc-Image-Dimension": "500 x 1000"
        },
        timeout: 7000
      })
      .then(res => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            data: res.data.data
          });
          this.set(res.data.data);
        }
        // console.log(res.data);
      })
      .catch(e => {
        //  Alert.alert("Error occurred", e);
        this.retrieve();
      });
  }

  async set(x) {
    try {
      await AsyncStorage.setItem(this.props.title, JSON.stringify(x));
      // await this.setState({data: x})
    } catch (error) {
      Alert.alert("Error setting data");
    }
  }

  async retrieve() {
    try {
      const value = await AsyncStorage.getItem(this.props.title);
      if (value !== null) {
        // Alert.alert("We have data");
        //log and set state here if everything works
        this.setState({
          data: JSON.parse(value),
          isLoading: false
        });
        //  console.warn(value);
      } else {
        // Alert.alert("We have no data");
        //  this.setState({isLoading: false})
        this.fetch();
      }
    } catch (error) {
      Alert.alert("Error Fetching Data, Please restart the APP");
    }
  }

  render() {
    // console.warn("data", this.state.data);

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color={colors.primaryBlue} size="large" />
        </View>
      );
    }
    //console.log("props", this.props.title);
    const { title, endpoint } = this.props;
    // const  = this.props.endpoint;
    //  console.log(endpoint);

    return (
      <View style={styles.container}>
        <View
          style={{
            marginLeft: 10,
            flex: 1,
            flexDirection: "row",
            marginBottom: 10
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{title}</Text>
          <TouchableOpacity
            style={{ position: "absolute", right: 0, marginRight: 15 }}
            onPress={() =>
              NavigationService.navigate("Featured", {
                title: title,
                endpoint: endpoint.slice(0, -8)
              })
            }
          >
            {this.props.more == true ? (
              <Text style={{ color: "black" }}>MORE</Text>
            ) : null}
          </TouchableOpacity>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.state.data.map((data, i) => (
            <TouchableOpacity
              onPress={() =>
                NavigationService.navigate("Product", {
                  title: data.name,
                  id: data.product_id
                })
              }
              key={i}
            >
              <Card
                style={{
                  padding: 10,
                  marginLeft: 15,
                  maxWidth: screen.width / 2.5,
                  borderRadius: 9
                }}
              >
                <CardItem cardBody>
                  <Image
                    // source={require("../../assets/images/demo.jpg")}
                    source={{ uri: data.thumb }}
                    style={styles.image}
                  />
                </CardItem>
                <View>
                  <Text
                    style={{ fontWeight: "500", flex: 1, color: "black" }}
                    numberOfLines={1}
                  >
                    {data.name}
                  </Text>
                  {/* <Text>Ratings</Text> */}
                  <View style={{ justifyContent: "flex-start" }}>
                    <Rating
                      readonly
                      startingValue={data.name.length % 5}
                      imageSize={18}
                    />
                  </View>
                  <View style={{ flexDirection: "row-reverse" }}>
                    {data.price_formated ? (
                      <Text
                        style={{ fontWeight: "600", color: colors.primaryBlue }}
                      >
                        {data.price_formated}
                      </Text>
                    ) : (
                        <Text
                          style={{ fontWeight: "600", color: colors.primaryBlue }}
                        >
                          {data.price}
                        </Text>
                      )}
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Overlay
          isVisible={this.state.isVisible}
          // height={100}
          onBackdropPress={() => this.setState({ isVisible: false })}
          containerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
          borderRadius={2}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>Ow Crap, We coudnt find an internet Connection.</Text>
            <Text>Connect to internet and try agains</Text>
            <Button onPress={() => this.setState({ isVisible: false })}>
              <Text>Okay</Text>
            </Button>
          </View>
        </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: screen.width / 2,
    paddingLeft: 10
  },
  image: {
    width: 50,
    height: 150,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    marginTop: 20
    // marginRight: 15
  }
});
