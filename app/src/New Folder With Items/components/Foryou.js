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
  Alert
} from "react-native";
import { Card, CardItem, Right, Body, Left } from "native-base";
import { colors } from "../constants";
import NavigationService from "../navigation/NavigationService";
import { Rating } from "react-native-ratings";


let screen = Dimensions.get("window");
class Foryou extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
            Special Deal for you
          </Text>
        </View>
        {/* <View style={{ justifyContent: 'space-between', backgroundColor: 'red' }}> */}
        <ImageBackground
          style={{ justifyContent: "space-between", marginTop: 18 }}
          source={require("../../assets/images/gift.png")}
        >
          <View />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: 10
            }}
            onPress={() =>
              NetInfo.getConnectionInfo().then(connection => {
                if (connection.type == "none") {
                  Alert.alert(
                    "Error",
                    "You have no internet connection on your device at the moment. Connect to the internet and try again"
                  );
                } else {
                  NavigationService.navigate("Product", {
                    title: "Mac",
                    id: 119
                  });
                }
              })
            }
          >
            <Card
              style={{
                padding: 10,
                // marginLeft: 15,
                maxWidth: screen.width / 2.5,
                // borderRadius: 9,
                marginTop: 20,
                marginBottom: 20
              }}
            >
              <CardItem cardBody>
                <Image
                  source={require("../../assets/images/demo.jpg")}
                  // source={{ uri: data.thumb }}
                  style={{ width: 90, height: 170 }}
                />
              </CardItem>

              <View>
                <Text style={{ fontWeight: "500", flex: 1 }} numberOfLines={1}>
                  Macbook Air 13"
                </Text>
                {/* <Text>Ratings</Text> */}
                <View style={{ justifyContent: "flex-start" }}>
                  {/* <Rating readonly startingValue={2} imageSize={18} /> */}
                  <Rating readonly startingValue={4} imageSize={15} />
                </View>
                <View style={{ flexDirection: "row-reverse" }}>
                  <Text
                    style={{ fontWeight: "600", color: colors.primaryBlue }}
                  >
                    2000
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
    marginTop: 20
    // paddingLeft: 10,
    // paddingRight: 10,
    // justifyContent: "space-between"
  }
});

export default Foryou;
