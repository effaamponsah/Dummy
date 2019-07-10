import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  NetInfo,
  AsyncStorage
} from "react-native";
import NavigationService from "../navigation/NavigationService";
import { colors, api } from "../constants";
import axios from "axios";

export default class Categories extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    // this.fetch();
    // axios
    //   .get(api.newCat)
    //   .then(r => {
    //     if (this._isMounted) {
    //       this.setState({
    //         isLoading: false,
    //         data: r.data.data
    //       });
    //     }
    //   })
    //   .catch(e => {
    //     console.log("Error", e);
    //   });
    // console.log("This is props", this.props);

    // this.retrieve();

    //
    NetInfo.getConnectionInfo().then(connection => {
      if (connection.type == "none") {
        this.retrieve();
      } else {
        this.fetch();
      }
    });
  };

  fetch() {
    axios
      .get(api.newCat, {
        timeout: 7000
      })
      .then(r => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            data: r.data.data
          });
          this.set(r.data.data);
        }
      })
      .catch(e => {
      //  console.warn("Error", e);
        //falls back to the set data
        this.retrieve();
      });
  }

  async set(x) {
    try {
      await AsyncStorage.setItem("CATEGORY_DATA", JSON.stringify(x));
      // await this.setState({data: x})
    } catch (error) {
      Alert.alert("Error setting data");
    }
  }

  async retrieve() {
    try {
      const value = await AsyncStorage.getItem("CATEGORY_DATA");
      if (value !== null) {
        // Alert.alert("We have data");
        //log and set state here if everything works
        this.setState({
          data: JSON.parse(value),
          isLoading: false
        });
        //  console.warn(value);
      } else {
        // Alert.alert("We have no data");
        //  this.setState({isLoading: false})
        this.fetch();
      }
    } catch (error) {
      Alert.alert("Error Fetching Data, Please restart the APP");
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color={colors.primaryBlue} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {this.state.data.map((data, i) => (
            <View key={i} style={styles.roundedButtons}>
              <TouchableOpacity
                onPress={() =>
                  // NavigationService.navigate("SubCat", {
                  //   title: data.name,
                  //   id: data.category_id
                  // })
                  NetInfo.getConnectionInfo().then(connection => {
                    if (connection.type == "none") {
                      Alert.alert(
                        "Error",
                        "You have no internet connection on your device at the moment. Connect to the internet and try again"
                      );
                    } else {
                      NavigationService.navigate("SubCat", {
                        title: data.name,
                        id: data.category_id
                      });
                    }
                  })
                }
              >
                {/* <TouchableOpacity onPress={() => this._categoryPress()}> */}
                <Text style={{ color: "white" }}>{data.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    marginBottom: 10
  },
  roundedButtons: {
    flex: 1,
    marginLeft: 15,
    backgroundColor: colors.primaryBlue,
    borderRadius: 26,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "center",
    alignItems: "center"
  }
});