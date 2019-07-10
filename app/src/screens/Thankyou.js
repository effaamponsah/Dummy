import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
} from "react-native";
import { Icon } from "native-base";
import { colors } from "../constants";
import PrimaryButton from "../components/PrimaryButton";
import NavigationService from "../navigation/NavigationService";

let userToken;
export default class Thankyou extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = async () => {
        userToken = await AsyncStorage.getItem("userToken");
    };

    homePress = () => {
        NavigationService.popTotop();
        NavigationService.navigate("Home");
    };
    cancelPress = () => {
        NavigationService.popTotop();
    };

    track = () => {
        NavigationService.popTotop();
        NavigationService.navigate("Track");
    };
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.cancelPress}
                    style={{ marginLeft: 20, marginTop: 20 }}
                >
                    <Icon
                        name="close"
                        type="MaterialIcons"
                        // color={colors.primaryHeaderColor}
                        fontSize={10}
                    />
                </TouchableOpacity>
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Icon
                        name="ios-checkbox-outline"
                        style={{ color: colors.primaryHeaderColor, fontSize: 180 }}
                    />
                </View>
                <View style={styles.middle}>
                    <Text style={{ color: "black", fontSize: 25, fontWeight: "bold" }}>
                        Thank you
          </Text>
                    <Text>Order Successfully placed</Text>
                    <Text>Check your email for your order ID</Text>
                    <View style={{ marginTop: 10 }}>
                        <PrimaryButton btntitle="Shop again" func={this.homePress} />
                        {/* I display the track oders to only users that are signed in */}
                        {userToken == null ? (
                            <TouchableOpacity
                                onPress={this.track}
                                style={{
                                    flex: 1,
                                    marginTop: -20,
                                    alignItems: "center"
                                }}
                            >
                                <Text style={{ color: colors.primaryBlue }}>Track Order</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    middle: {
        flex: 1,
        alignItems: "center"
    }
});
