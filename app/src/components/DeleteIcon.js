import React from "react";
import { Text, View, Alert, NetInfo, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import axios from "axios";
const DeleteIcon = ({ params }) => (
  <View>
    <TouchableOpacity
      style={{ marginRight: 8 }}
      onPress={() => {
        Alert.alert(
          "Empty your cart?",
          "This action deletes the entire items in your cart. Please note that it is not reversable",
          [
            {
              text: "Delete",
              onPress: () =>
                NetInfo.getConnectionInfo().then(connection => {
                  if (connection.type == "none") {
                    Alert.alert(
                      "Error Occured",
                      "Connect to the internet and try again"
                    );
                  } else {
                    axios
                      .delete(api.bulkEmpty)
                      .then(response => {
                        console.warn(response.data);
                      })
                      .catch(e => {
                        console.warn(e);
                      });
                  }
                })
            },
            {
              text: "Cancel",
              style: "cancel"
            }
          ],
          { cancelable: false }
        );
      }}
    >
      <Icon name="delete" type="MaterialIcons" style={{ color: "white" }} />
    </TouchableOpacity>
  </View>
);

export default DeleteIcon;
