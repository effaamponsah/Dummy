import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  NetInfo,
  ActivityIndicator,
  Alert, Dimensions, RefreshControl
} from "react-native";
import SlideShow from "../components/Slideshow";
import Categories from "../components/Categories";
import CardItems from "../components/Card";
import homeData from "../utils/homepage";
import { api, colors } from "../constants";
import axios from "axios";
import { Icon } from "native-base";
import NavigationService from "../navigation/NavigationService";
import NoInternet from "./NoConnection";
import Foryou from "../components/Foryou";
import { inject, observer } from "mobx-react/native";
const SCREEN = Dimensions.get('window')
@inject("shoppingcartstore")
@observer
export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "Mosco Phones",
    headerRight: (
      <TouchableOpacity
        style={{ marginRight: 15 }}
        onPress={() => NavigationService.navigate("Search")}
      >
        <Icon
          name="search1"
          style={{
            color: Platform.OS == "android" ? colors.white : colors.primaryBlue,
            fontSize: 22
          }}
          type="AntDesign"
        />
      </TouchableOpacity>
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: !true,
      isLoading: true,
      session: ""
    };
  }

  _search = () => {
    this.props.navigation.navigate("Search");
  };

  componentDidMount() {
    //  Gets the internet status and stops it from crashing
    // NetInfo.getConnectionInfo().then(connection => {
    //   if (connection.type == "none") {
    //     console.warn("No internet");
    //     this.setState({
    //       isLoading: false
    //     });
    //     // this.props.navigation.navigate("Nointernet");
    //   } else {
    //     axios
    //       .get(api.session)
    //       .then(res => {
    //         this.setState({
    //           session: res.data.data.session,
    //           isLoading: false
    //         });
    //       })
    //       .catch(e => {
    //         console.warn(e);
    //       });
    //   }
    // });
    axios
      .get(api.viewCart, {
        timeout: 7000
      })
      .then(res => {
        if (res.data.success == true) {
          this.props.shoppingcartstore.add({ id: "another" });
        }
      })
      .catch(e => {
        // Alert.alert("Ooops", e);
        // this.retrieve();
        console.warn("Error ocured", e);

      });
  }

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View>
    //       <ActivityIndicator color={colors.primaryBlue} />
    //     </View>
    //   );
    // }
    return (
      <View style={{ backgroundColor: colors.primaryBackground }}>
        <ScrollView>
          <StatusBar barStyle={"default"} backgroundColor={colors.darkgreen} />
          <View style={{ height: SCREEN.height/3 }}>
            <SlideShow />
          </View>
          <View>
            <Categories />
          </View>
          <View>
            <View>
              <CardItems
                title={"New Arrival"}
                endpoint={api.newArrivals}
                more={true}
              />
              <Foryou />
              <CardItems
                title={"Featured Items"}
                endpoint={api.featuredItems}
                more={true}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  me: {
    ...Platform.select({
      ios: {
        color: "red"
      },
      android: {
        color: "blue"
      }
    })
  }
});
