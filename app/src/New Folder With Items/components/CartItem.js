import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { colors, api } from "../constants";
import {
  Icon,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Right
} from "native-base";
import { observer } from "mobx-react/native";
import axios from "axios";
import { Overlay } from "react-native-elements";

export default (CartItems = ({ item }) => (
  <ScrollView>
    {item.map(d => (
      <View style={styles.container} key={d.key}>
        <View style={{ justifyContent: "center" }}>
          <Image source={{ uri: d.thumb }} style={styles.image} />
        </View>
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 10 }}>
          <Text style={{fontSize: 13 }} numberOfLines={2} >
            {d.name}
          </Text>
          <Text style={{ color: colors.primaryGrey }}>{d.price}</Text>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() =>
              axios
                .put(
                  "https://moscophones.com/index.php?route=rest/cart/updatecartv2",
                  {
                    key: d.key,
                    quantity: "0"
                  }
                )
                .then(res => {
                  console.log(res.data);
                })
                .catch(e => {
                  console.warn(e);
                })
            }
          >
            <Icon name="trash" style={{ color: colors.primaryBlue, fontSize: 17 }} />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 5
              }}
            >
              <Text style={{ color: colors.primaryBlue }}>Remove</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.9,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={() =>
              axios
                .put(
                  "https://moscophones.com/index.php?route=rest/cart/updatecartv2",
                  {
                    key: d.key,
                    quantity: d.quantity - 1
                  }
                )
                .then(res => {
                  console.log(res.data);
                })
                .catch(e => {
                  console.warn(e);
                })
            }
          >
            <Icon
              name="md-remove-circle"
              style={{ color: colors.primaryBlue,fontSize: 22 }}
            />
          </TouchableOpacity>
          <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 13 }}>{d.quantity}</Text>
          <TouchableOpacity
            onPress={() =>
              axios
                .put(
                  "https://moscophones.com/index.php?route=rest/cart/updatecartv2",
                  {
                    key: d.key,
                    quantity: d.quantity + 1
                  }
                )
                .then(res => {
                  console.log(res.data);
                })
                .catch(e => {
                  console.warn(e);
                })
            }
          >
            <Icon name="md-add-circle" style={{ color: colors.primaryBlue, fontSize: 22 }} />
          </TouchableOpacity>
        </View>
      </View>
    ))}

    {/* <List>
      {item.map(d => (
        <ListItem thumbnail key={d.key} style={{ backgroundColor: "white" }}>
          <Left>
            <Thumbnail square source={{ uri: d.thumb }} />
          </Left>

          <Body>
            <Text numberOfLines={2} li>{d.name}</Text>
            <Text note>{d.price}</Text>
            <Icon name='trash' style={{ fontSize: 15 }}/>
          </Body>

          <Right style={{flexDirection: 'row'}}>
          <Text>1</Text>
          <Text>1</Text>
          <Text>1</Text>
          </Right>
        </ListItem>
      ))
      }
    </List> */}
  </ScrollView>
));

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    backgroundColor: "#fff"
  },
  image: {
    height: 50,
    width: 50,
    marginLeft: 20
  }
});
