import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
} from "react-native";
import NavigationService from "../navigation/NavigationService";
import { Tile } from "react-native-elements";
const screen = Dimensions.get("screen");

export default class SubCartItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, category_id, image, parent_id } = this.props;
    return (
      // <TouchableOpacity style={styles.container} onPress={() => NavigationService.navigate('Products', {
      //   title: name,
      //   id : category_id,
      //   parent_id:  parent_id
      // })}>
      //   <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}> {name} </Text>
      //   <Text  style={{color: 'white'}}>Press to browse</Text>
      // </TouchableOpacity>

      <Tile
        width={screen.width / 3.5}
        height={120}
        imageSrc={{ uri: image }}
        // title={name}
        featured
        contentContainerStyle={{ borderRadius: 25 }}
        imageContainerStyle={{ borderRadius: 25 }}
        containerStyle={{ borderRadius: 25 }}
        caption={name}
        captionStyle={{fontWeight: 'bold'}}
        onPress={() =>
          NavigationService.navigate("Products", {
            title: name,
            id: category_id,
            parent_id: parent_id
          })
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // width: screen.width / 3.5,
    backgroundColor: "#999",
    // height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  }
});
