import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import { api, colors } from "../constants";
import SubCartItems from "../components/SubCartItems";
import ProductsItems from "../components/ProductsItems";

const screen = Dimensions.get("screen");
export default class Anomally extends Component {
  _isMounted = false;
  static navigationOptions = ({ navigation }) => {
    title: this.props.title;
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    // const id = this.props.navigation.getParam("id", "no id provided");
    const id = this.props.id;
    this._isMounted = true;
    this.fetchdata(id);
  }

  fetchdata = i => {
    axios
      .get(api.subCat + i)
      .then(response => {
        //console.warn("Response", response.data.data.sub_categories);
        if (this._isMounted) {
          this.setState({
            data: response.data.data,
            isLoading: false
          });
        }
      })
      .catch(e => {
        console.warn("Error", e);
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderItems = ({ item, index }) => {
    let style = {};
    if (index % 3 !== 0 || index % 3 === 0) {
      (style.borderLeftWidth = 10), (style.borderLeftColor = "white");
    }
    return (
      <View style={style}>
        <SubCartItems {...item} />
      </View>
    );
  };
  keyExtractor = item => String(item.id);
  seperator = () => <View style={styles.seperator} />;

  render() {
    // console.warn(this.state.data);
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={{ color: colors.primaryBlue }} />
        </View>
      );
    }
    return (
      <View>
        {this.state.data.sub_categories != null ? (
          <ScrollView>
            <View style={{ marginRight: 10 }}>
              <Image
                source={require("../../assets/images/temp.jpg")}
                style={{ height: 250, width: screen.width }}
              />
            </View>
            <View style={{ padding: 10, marginTop: 5 }}>
              <FlatList
                data={this.state.data.sub_categories}
                renderItem={this.renderItems}
                keyExtractor={this.keyExtractor}
                numColumns={3}
                ItemSeparatorComponent={this.seperator}
              />
            </View>
          </ScrollView>
        ) : (
          <ProductsItems title={this.state.data.name} id={this.state.data.id} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    marginBottom: 20
  },
  seperator: {
    height: 10,
    backgroundColor: "white"
  }
});
