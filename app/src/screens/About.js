import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    ToastAndroid,
    Button,
    TouchableOpacity
} from "react-native";
import { Icon } from "native-base";
import { colors } from "../constants";

export default class About extends Component {
    static navigationOptions = {
        title: "About"
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    opendialler = url => {
        Linking.canOpenURL(url)
            .then(supported => {
                if (!supported) {
                    ToastAndroid.show("Cant handle it");
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch(error => {
                console.warn("Error occured", error);
            });
    };
    openWhatsap = url => {
        Linking.canOpenURL(url)
            .then(supported => {
                if (!supported) {
                    ToastAndroid.show("Cant handle it");
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch(error => {
                console.warn("Error occured", error);
            });
    };
    openMail = url => {
        Linking.canOpenURL(url)
            .then(supported => {
                if (!supported) {
                    ToastAndroid.show("Cant handle it");
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch(error => {
                console.warn("Error occured", error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={{
                        color: "black",
                        fontSize: 23,
                        letterSpacing: -0.5
                    }}
                >
                    Mosco Phones
        </Text>
                <Text>Version 1.0</Text>
                <Image
                    source={require("../../assets/images/logo.png")}
                    style={{ height: 100, width: 100 }}
                />


                <View style={{ alignItems: "center" }}>
                    <Text>{"\u00A9"}2019 moscophones.com</Text>
                    <Text>All rights reserved</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 40 }}>
                    <TouchableOpacity onPress={() => this.opendialler(`tel: 0548879658`)}>
                        <Icon
                            name="call"
                            style={{ fontSize: 35, color: colors.primaryGrey }}
                            type="MaterialIcons"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginRight: 18, marginLeft: 18 }}
                        onPress={() =>
                            this.openWhatsap(
                                `https://api.whatsapp.com/send?phone=233548879658`
                            )
                        }
                    >
                        <Icon
                            name="logo-whatsapp"
                            style={{ fontSize: 35, color: colors.primaryGrey }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            this.openMail(`mailto: kamponsah.amponsah@gmail.com`)
                        }
                    >
                        <Icon
                            name="email"
                            style={{ fontSize: 35, color: colors.primaryGrey }}
                            type="MaterialIcons"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
