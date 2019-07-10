// This component is just to render all the latest and the Featured items
import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  NetInfo
} from "react-native";
import axios from "axios";
import { colors } from "../constants";
import { Icon, Toast, Root } from "native-base";
import NavigationService from "../navigation/NavigationService";

export default class Featured extends Component {
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
      isLoading: true,
      data: []
    };
  }
  componentDidMount() {
    this._isMounted = true;
    const endpoint = this.props.navigation.getParam(
      "endpoint",
      "no enpoint found provided"
    );
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        this.setState({ isLoading: false });
        Toast.show({
          text: "Please connect to the internet",
          type: "warning",
          duration: 3000
        });
        this._isMounted = true;
        this.props.navigation.goBack();
      } else {
        this.fetchData(endpoint);
      }
    });
  }

  fetchData = api => {
    axios
      .get(api, {
        headers: {
          "X-Oc-Image-Dimension": 50 * 100
        }
      })
      .then(response => {
        if (this._isMounted) {
          this.setState({
            data: response.data.data,
            isLoading: false
          });
        }
      })
      .catch(error => {
        Alert.alert("Ooops", error);
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator color={colors.primaryBlue} />
        </View>
      );
    }
    // const endpoint = this.props.navigation.getParam(
    //   "endpoint",
    //   "no id provided"
    // );
    const data = this.state.data;

    return (
      <Root>
        <ScrollView>
          {this.state.data.map(d => (
            <TouchableOpacity
              style={styles.container}
              key={d.product_id}
              onPress={() => {
                NavigationService.navigate("Product", {
                  title: d.name,
                  id: d.product_id
                });
              }}
            >
              <View style={{ justifyContent: "center", bacgroundColor: "red" }}>
                <Image source={{ uri: d.thumb }} style={styles.image} />
              </View>
              <View
                style={{ flex: 0.6, justifyContent: "center", marginLeft: 30 }}
              >
                <Text style={{ fontWeight: "bold" }} numberOfLines={1}>
                  {d.name}
                </Text>
                {/* <Text style={{ color: "red" }}>{d.stock_status}</Text> */}
                {/* A simple check for dynamic price handling */}
                {d.price_formated ? (
                  <Text style={{ color: colors.primaryBlue }}>
                    {d.price_formated}
                  </Text>
                ) : (
                  <Text style={{ color: colors.primaryBlue }}>{d.price}</Text>
                )}
              </View>
              {/* <View style={{ justifyContent: "center", marginRight: 15 }}>
              <Icon name="ios-arrow-forward" />
            </View> */}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Root>
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
  }
});
