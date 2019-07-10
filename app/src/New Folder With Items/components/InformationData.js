import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants";

export default (InformationData = ({ name, data, units }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: 'space-evenly',
      alignItems: "center",
      marginBottom: 5
    }}
  >
    <Text style={{textAlign: 'right'}}>{name}</Text>
    <Text style={{ color: colors.primaryGrey}}>{data} {units}</Text>
  </View>
));
