import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  NetInfo
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
  Right,
  Toast,
  Root
} from "native-base";
import { observer } from "mobx-react/native";
import axios from "axios";
import { Overlay, Image } from "react-native-elements";

export default class CartItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  _ondeletePress = key => {
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        Toast.show({
          text: "Connect to the internet and try again",
          type: 'warning'
        }
        );
      } else {
        this.setState({ isVisible: true });
        axios
          .put(api.updateCart, {
            key: key,
            quantity: "0"
          })
          .then(res => {
            this.setState({ isVisible: false });
          })
          .catch(e => {
            this.setState({ isVisible: false });
            Toast.show({
              text: "Connect to the internet and try again",
              type: 'warning'
            }
            );
          });
      }
    });
  };

  _onIncrementPress = (key, quantity) => {
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        Toast.show({
          text: "Connect to the internet and try again",
          type: 'warning'
        }
        );
      } else {
        this.setState({ isVisible: true });
        axios
          .put(api.updateCart, {
            key: key,
            quantity: quantity + 1
          })
          .then(res => {
            this.setState({ isVisible: false });
          })
          .catch(e => {
            this.setState({ isVisible: false });
            Toast.show({
              text: "Connect to the internet and try again",
              type: 'warning'
            }
            );
          });
      }
    });
  };

  _onDecrementPress = (key, quantity) => {
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        Toast.show({
          text: "Connect to the internet and try again",
          type: 'warning'
        }
        );
      } else {
        this.setState({ isVisible: true });
        axios
          .put(api.updateCart, {
            key: key,
            quantity: quantity - 1
          })
          .then(res => {
            this.setState({ isVisible: false });
          })
          .catch(e => {
            Toast.show({
              text: "Connect to the internet and try again",
              type: 'warning'
            }
            );
            this.setState({ isVisible: false });
          });
      }
    });
  };

  render() {
    const { item } = this.props;
    const { isVisible } = this.state;
    return (
      <Root>
        <ScrollView>
          {item.map(d => (
            <View style={styles.container} key={d.key}>
              <View style={{ justifyContent: "center" }}>
                <Image source={{ uri: d.thumb }} style={styles.image} />
              </View>
              <View style={{ flex: 1, justifyContent: "center", marginLeft: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 13 }} numberOfLines={2}>
                    {d.name}
                  </Text>
                  {d.option.length != 0
                    ? d.option.map(data => (
                      <View
                        key={data.name}
                        style={{
                          marginLeft: 10,
                          borderRadius: 10,
                        
                        }}
                      >
                        <Text style={{ fontSize: 13, color: colors.violet }}>
                          ({data.value})
                  </Text>
                      </View>
                    ))
                    : null}
                </View>
                <Text style={{ color: colors.primaryGrey }}>{d.price}</Text>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this._ondeletePress(d.key)
                  }
                >
                  <Icon
                    name="delete"
                    style={{ color: colors.primaryBlue, fontSize: 17 }}
                    type='AntDesign'
                  />
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
                {d.stock == false ? (
                  <Text style={{ color: "red", fontSize: 11 }}>
                    Not available in desired quatity
            </Text>
                ) : null}
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
                  onPress={() => this._onDecrementPress(d.key, d.quantity)}
                >
                  <Icon
                    name="ios-remove-circle-outline"
                    style={{ color: colors.primaryBlue, fontSize: 22 }}
                  />
                </TouchableOpacity>
                <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 13 }}>
                  {d.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this._onIncrementPress(d.key, d.quantity)
                  }
                >
                  <Icon
                    name="md-add-circle"
                    style={{ color: colors.primaryBlue, fontSize: 22 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}


          <Overlay
            isVisible={isVisible}
            height={80}
            width={80}
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
            </View>
          </Overlay>

        </ScrollView>
      </Root>
    )
  }

}



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
