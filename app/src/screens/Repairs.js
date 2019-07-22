import React, { Component } from "react";
import {
  View,
  Text,
  Stylesheet,
  WebView,
  Button,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  BackHandler
} from "react-native";
import { colors } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "native-base";

const me = () => {
  console.warn("Loading");
};
const err = () => {
  console.warn("Error");
};
const portals = "https://www.portals.moscophones.com";

export class Repairs extends Component {
  static navigationOptions = {
    // header: null
    title: "Web Portals"
    // headerRight: (
    //   <TouchableOpacity onPress={() => }>
    //     <Icon name="refresh" />
    //   </TouchableOpacity>
    // )
  };
  constructor(props) {
    super(props);
    this.state = {
      showbtn: false,
      error: false,
      canGoForward: false
     
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBack);

  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBack);
  }

  handleBack = () => {
    if (this.state.canGoBack) {
      this.refWeb.goBack();
    } else {
      this.props.navigation.goBack(null);
    }
    return true;
  };

  reload = () => {
    this.refWeb.reload();
  };
  error = () => {
    this.setState({ error: true });
  };
  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }
 
  render() {
    let WebViewRef;
    return (
      //<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      // {/* <ScrollView */}
      //   refreshControl={
      //     <RefreshControl
      //       // refreshing={this.state.refreshing}
      //       onRefresh={() => {
      //         WebViewRef && WebViewRef.reload();
      //       }}
      //       colors={[colors.primaryBlue]}
      //       title="Reloading"
      //     />
      //   }
      //>
      <View style={{ flex: 1 }}>
        <WebView
          // ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
          ref={myWeb => (this.refWeb = myWeb)}
          source={{ uri: portals }}
          // style={{ marginTop }}
          // onLoadStart={me}
          onError={this.error}
          startInLoadingState={true}
          javaScriptEnabled={true}
          // onLoadEnd={e => console.warn("This is it", e)}
          // renderError={e => <Text>{e}</Text>}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          renderLoading={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator />
            </View>
          )}
        />
        {/* {this.state.error ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={this.reload}
              style={{ padding: 10, backgroundColor: colors.primaryBlue }}
            >
              <Text style={{ color: colors.white }}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : null} */}
      </View>
      //</ScrollView>
    );
  }
}

export const MainRepairs = () => (
  <React.Fragment>
    <View>
      <Text>This is the main RepairsPage</Text>
    </View>
  </React.Fragment>
);
