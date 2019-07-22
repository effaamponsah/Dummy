import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet
} from "react-native";
import { slideShowImages } from "../constants";

let SCREEN = Dimensions.get("window");
const DOT_SIZE = 10;
const TIME = 2500;

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
    this.scrollview = React.createRef();
  }

  componentDidMount = () => {
    this.timer = setInterval(() => {
      this.handleScroll();
    }, TIME);
  };

  handleScroll = () => {
    const newIndex = this.state.currentIndex + 1;

    if (newIndex < slideShowImages.length) {
      this.scrollview.current.scrollTo({
        x: newIndex * SCREEN.width,
        animated: true
      });
      this.setState({ currentIndex: newIndex });
    } else {
      this.scrollview.current.scrollTo({
        x: 0,
        animated: true
      });
      this.setState({ currentIndex: 0 });
    }
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <View style={{ position: "relative" }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={this.scrollview}
        >
          {slideShowImages.map((data, i) => (
            <View key={i}>
              <Image
                source={data.img}
                style={{ maxWidth: SCREEN.width, height: SCREEN.height /3 }}
              />
              <View />

              <View
                style={{
                  position: "absolute",
                  marginLeft: "20%",
                  bottom: 0,
                  marginBottom: 50
                }}
              >
                {/* <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{ color: "white", fontWeight: "600", fontSize: 30 }}
                  >
                    {data.text}
                  </Text>
                </View> */}
                {/* <Text style={{ color: "white", fontSize: 20 }}>
                  {data.description}
                </Text> */}
              </View>

              {/* <View
                style={{
                  position: "absolute",
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  bottom: 0,
                  width: SCREEN.width,
                  paddingBottom: 10
                }}
              >
                {Array.from({ length: images.length }).map((_, index) => (
                  <View style={styles.dots} key={index} />
                ))}
              </View> */}
            </View>
          ))}
        </ScrollView>
        {/* <Image source={require('../../assets/images/slide.jpg')} style={{height: "100%", width: "100%"}}/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dots: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    backgroundColor: "red",
    borderRadius: DOT_SIZE,
    margin: DOT_SIZE / 2
  }
});
