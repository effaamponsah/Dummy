import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button,
  Dimensions,
  ToastAndroid
} from "react-native";
import axios from "axios";
import { api, colors } from "../constants";
import { ListItem, Body, Right, Radio } from "native-base";
import { Overlay } from "react-native-elements";
import NavigationService from "../navigation/NavigationService";
import Confirm from "./Confirm";
import PrimaryButton from "../components/PrimaryButton";
const dimension = Dimensions.get("window");
export default class PaymentMethod extends Component {
  static navigationOptions = {
    title: "Select Payment Method"
  };

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      methods: [],
      isLoading: true,
      paymentCode: "",
      isVisible: false,
      invoice: "",
      products: [],
      totals: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchPaymentMethods();
  }

  fetchPaymentMethods() {
    const data = [];
    axios
      .get(api.paymentMethod)
      .then(response => {
        // if (this._isMounted == true) {
        if (response.data.success == true) {
          Object.keys(response.data.data.payment_methods).forEach(key => {
            data.push(response.data.data.payment_methods[key]);
          });
          this.setState({ methods: data, isLoading: false });
          // }
        } else {
          // console.warn(response.data);
        }
      })
      .catch(error => {
        Alert.alert("Error occured", error);
      });
  }

  postPayment(x) {
    axios
      .post(api.paymentMethod, {
        payment_method: x,
        agree: "1",
        comment: "I agree to this method"
      })
      .then(response => {
        console.warn("response", response.data);
        this.setState({ paymentCode: x });
      })
      .catch(error => {
        Alert.alert("Error occured", error);
      });
  }

  confirm = () => {
    axios
      .post(api.confirm)
      .then(response => {
        // console.warn(response.data);
        if (response.data.success == true) {
          this.setState({
            invoice: response.data.data,
            products: response.data.data.products,
            totals: response.data.data.totals,
            // /isVisible: true
          });
          NavigationService.navigate("Confirm", {
            invoice: response.data.data,
            products: response.data.data.products,
            totals: response.data.data.totals,
            method: response.data.data.payment_method
            // />
          });
        }
      })
      .catch(error => {
        // console.warn("Error occured", error);
        ToastAndroid.show("Connect to the internet and try again", 3000);
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  showOverview() {}

  render() {
    const {
      methods,
      isLoading,
      paymentCode,
      invoice,
      totals,
      products
    } = this.state;
    if (isLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator
            color={{ color: colors.primaryBlue }}
            size="large"
          />
        </View>
      );
    }
    return (
      <View>
        <View>
          {methods.map(data => (
            <ListItem
              key={data.code}
              onPress={() => this.postPayment(data.code)}
            >
              <Body>
                <Text>{data.title}</Text>
              </Body>

              <Right>
                <Radio
                  color={colors.primaryGrey}
                  selected={paymentCode == data.code}
                  selectedColor={colors.primaryBlue}
                />
              </Right>
            </ListItem>
          ))}
        </View>

        <View>
          <PrimaryButton btntitle="Confirm" func={this.confirm} />
        </View>

        {/* Invoice */}
        <Overlay
          isVisible={this.state.isVisible}
          height={dimension.height - 100}
          width={dimension.width - 10}
          onBackdropPress={() => this.setState({ isVisible: false })}
          containerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View>
            <Confirm
              invoice={invoice}
              products={products}
              total={totals}
              method={invoice.payment_method}
            />
            {/* <Confirm invoice={invoice} products={products} /> */}
          </View>
          {/* <Button
            title="Checkout"
            onPress={() => this.handleCheckout(invoice.payment_method)}
          /> */}
        </Overlay>
      </View>
    );
  }
}
