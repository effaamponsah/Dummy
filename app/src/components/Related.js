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
  ToastAndroid,
  Button
} from "react-native";
let screen = Dimensions.get("window");
import { Card, CardItem, Text } from "native-base";
import { api, colors } from "../constants";
import NavigationService from "../navigation/NavigationService";
import { Rating } from "react-native-ratings";

const Related = ({ products, title }) => (
  <View style={styles.container}>
    <View
      style={{
        marginLeft: 10,
        flex: 1,
        flexDirection: "row",
        marginBottom: 10
      }}
    >
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "black"
          }}
        >
          {title}
        </Text>
      </View>
    </View>

    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {products.map((data, i) => (
        <TouchableOpacity
          onPress={() =>
            NavigationService.push("Product", {
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
              <Text style={{ fontWeight: "500", flex: 1 }} numberOfLines={1}>
                {data.name}
              </Text>
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
  </View>
);

export default Related;

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
    paddingBottom: 20,
    backgroundColor: colors.primaryBackground
    // marginRight: 15
  }
});
