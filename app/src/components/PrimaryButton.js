import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants";

const PrimaryButton = ({ btntitle, func }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.buttonStyles}
      onPress={func}
      // onPress ={() => this.props.navigation.navigate('Verify')}
    >
      <Text style={{ color: "white" }}>{btntitle}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: colors.primaryBlue,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 50
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: 20
  }
});

export default PrimaryButton;
