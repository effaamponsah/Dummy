import React, { Component } from "react";
import { View, Text } from "react-native";
import ProductsItems from "../components/ProductsItems";
import NavigationService from "../navigation/NavigationService";
import Anomally from "./Assesories";

export default class Products extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam(
        "title",
        "No title provded from previous route"
      )
    };
  };

  componentWillMount() {
    // const title = this.props.navigation.getParam("title", "no id provided");
    // const id = this.props.navigation.getParam("id", "no id provided");
  }

  detect(title, id) {
    NavigationService.navigate("Anomally", {
      title: title,
      id: id
    });
    // console.warn("Id", id);
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const title = this.props.navigation.getParam("title", "no id provided");
    const id = this.props.navigation.getParam("id", "no id provided");
    const parentid = this.props.navigation.getParam(
      "parent_id",
      "no id provided"
    );
    return (
      <View style={{ justifyContent: "center" }}>
        {parentid == "126" ? (
          <Anomally title={title} id={id}/>
        ) : (
          <ProductsItems title={title} id={id} />
        )}
      </View>
    );
  }
}
