import React, { Component } from "react";
import { View, Text, Stylesheet, WebView, ActivityIndicator } from "react-native";


const me=()=>{
console.warn('Loading')
}
const err=()=>{
console.warn('Error')
}
export const Repairs = () => (

  <WebView
    source={{ uri: "http://repairs.moscophones.com/" }}
    style={{ marginTop: 20 }}
    // onLoadStart={me}
    onError={err}
    startInLoadingState={true}
    javaScriptEnabled={true}
  />
);

export const MainRepairs = () => (
  <React.Fragment>
    <View>
      <Text>This is the main RepairsPage</Text>
    </View>
  </React.Fragment>
);
