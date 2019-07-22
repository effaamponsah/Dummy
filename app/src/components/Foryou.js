import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  NetInfo,
  Alert,
  AsyncStorage
} from "react-native";
import { Card, CardItem, Right, Body, Left } from "native-base";
import { colors, api } from "../constants";
import NavigationService from "../navigation/NavigationService";
import { Rating } from "react-native-ratings";
import axios from "axios";

let number;
let screen = Dimensions.get("window");
const random = [
  47,
  87,
  49,
  194,
  132,
  133,
  24,
  90,
  92,
  99,
  123,
  142,
  139,
  108,
  23,
  113
];
class Foryou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  componentDidMount() {
    number = random[Math.floor(Math.random() * random.length)];
    this.fetchdata(number);
  }

  fetchdata(x) {
    axios
      .get(api.product + x, {
        headers: {
          "X-Oc-Image-Dimension": "500 x 1000"
        },
        timeout: 7000
      })
      .then(response => {
        if (response.data.success == true) {
          this.setState({
            data: response.data.data
          });
          this.set(response.data.data);
        }
      })
      .catch(err => {
        this.retrieve();
      });
  }

  async set(x) {
    try {
      await AsyncStorage.setItem("foryou", JSON.stringify(x));
      // await this.setState({data: x})
    } catch (error) {
      Alert.alert("Error setting data");
    }
  }

  async retrieve() {
    try {
      const value = await AsyncStorage.getItem("foryou");
      if (value !== null) {
        // Alert.alert("We have data");
        //log and set state here if everything works
        this.setState({
          data: JSON.parse(value)
          // isLoading: false
        });
        //  console.warn(value);
      } else {
        // Alert.alert("We have no data");
        //  this.setState({isLoading: false})
        this.fetchdata();
      }
    } catch (error) {
      Alert.alert("Error Fetching Data, Please restart the APP");
    }
  }

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginLeft: 10,
              color: "black"
            }}
          >
            Special gift for you
          </Text>
        </View>
        {/* <View style={{ justifyContent: 'space-between', backgroundColor: 'red' }}> */}
        <ImageBackground
          style={{ justifyContent: "space-between", marginTop: 18, height: screen.height / 3 }}
          source={require("../../assets/images/gift3.png")}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: 10
            }}
            onPress={() =>
              NavigationService.navigate("Product", {
                title: data.name,
                id: data.id
              })
            }
          >
            <Card
              style={{
                padding: 5,
                // marginLeft: 15,
                maxWidth: screen.width / 3,
                // borderRadius: 9,
                // marginTop: 20,
                marginBottom: 20
              }}
            >
              <CardItem cardBody>
                <Image
                  source={{ uri: data.image }}
                  // source={{ uri: data.thumb }}
                  style={{ width: 90, height: 170 }}
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
                  {/* <Rating readonly startingValue={2} imageSize={18} /> */}
                  {data.name ? (
                    <Rating
                      readonly
                      startingValue={data.name % 5}
                      imageSize={15}
                    />
                  ) : (
                      <Rating readonly startingValue={0} imageSize={15} />
                    )}
                </View>
                <View style={{ flexDirection: "row-reverse" }}>
                  <Text
                    style={{ fontWeight: "600", color: colors.primaryBlue }}
                  >
                    {data.price_formated}
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
          {/* </View> */}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    marginTop: 20,
    height:screen.height / 2.8,
    marginBottom: 20,

    // paddingLeft: 10,
    // paddingRight: 10,
    // justifyContent: "space-between"
  }
});

export default Foryou;
