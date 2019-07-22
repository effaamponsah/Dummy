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
SegmentedControlIOS
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
const chat ="https://tawk.to/chat/5d0c948753d10a56bd7b2a2e/default";
const repairs ='http://repairs.moscophones.com/'
export class Repairs extends Component {
  static navigationOptions = {
    title: "Web Portal"
    
  };
  constructor(props) {
    super(props);
    this.state = {
      showbtn: false,
      error: false,
      canGoForward: false,
      selectedIndex:0
     
    };
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
 
 
  render() {
    let WebViewRef;
    return (
     <View style={{flex:1}}>
      <View style={{margin:15}}>
       <SegmentedControlIOS
        values={['Customer Care', 'Check Repairs']}
        selectedIndex={this.state.selectedIndex}
        onChange={(event) => {
        this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
         }}
         tintColor={colors.primaryBlue}
        />
      </View>

      {
        this.state.selectedIndex == 0?
        <WebView
          ref={myWeb => (this.refWeb = myWeb)}
          source={{ uri: chat }}
          onError={this.error}
          startInLoadingState={true}
          javaScriptEnabled={true}
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

        :null
      }

      {
        this.state.selectedIndex == 1?
        <WebView
          ref={myWeb => (this.refWeb = myWeb)}
          source={{ uri: repairs }}
          onError={this.error}
          startInLoadingState={true}
          javaScriptEnabled={true}
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

        :null
      }     

      </View>
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
