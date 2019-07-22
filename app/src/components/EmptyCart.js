import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { colors } from "../constants";
import NavigationService from "../navigation/NavigationService";

const EmpytCart = ({ text1, text2, image, btn, func, btntitle }) => (
  <React.Fragment>
    <View style={style.container}>
      <Image
        source={image}
        resizeMode="contain"
        style={{ width: 100, height: 150 }}
      />

      <Text style={{ fontWeight: "600", color: 'black', textAlign:'center' }}>{text1}</Text>
      <Text style={{textAlign:'center'}}>{text2}</Text>
    </View>
    {btn ? (
      <View>
        <TouchableOpacity
          style={style.buttonStyles}
          onPress={func}
        // onPress ={() => this.props.navigation.navigate('Verify')}
        >
          <Text style={{ color: "white" }}>{btntitle}</Text>
        </TouchableOpacity>
      </View>
    ) : null}
  </React.Fragment>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyles: {
    backgroundColor: colors.primaryBlue,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 50
  }
});

export default EmpytCart;
