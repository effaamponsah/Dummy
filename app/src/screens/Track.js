import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ToastAndroid,
  Alert,
  TouchableOpacity,
  NetInfo
} from "react-native";
import {
  Container,
  Header,
  Content,
  Tab,
  Tabs,
  Grid,
  Row,
  Col,
  ListItem,
  Form,
  Item,
  Label,
  Input
} from "native-base";
import { colors, api } from "../constants";
import axios from "axios";
import { Overlay } from "react-native-elements";

const width = Dimensions.get("window").width;
export default class Track extends Component {
  static navigationOptions = {
    title: "Order Details"
  };

  componentWillUnmount() {
    this.setState({ isVisible: false });
  }

  constructor(props) {
    super(props);
    this.state = {
      error: "",
      isVisible: true,
      temp: "okay",
      number: "",
      data: {
        order_id: "-",
        invoice_no: "",
        invoice_prefix: "INV-2018-00",
        store_id: "0",
        store_name: "Mosco Phones",
        store_url: "https://www.moscophones.com/",
        customer_id: "28",
        firstname: "JAmes",
        lastname: "Amponsah",
        telephone: "0548879658",
        fax: "",
        email: "amponsah08@yahoo.com",
        payment_firstname: "Dennis",
        payment_lastname: "Amponsah",
        payment_company: "",
        payment_address_1: "P.O.BOX KS 4889",
        payment_address_2: "",
        payment_postcode: "00233",
        payment_city: "Kentinkronon",
        payment_zone_id: "1270",
        payment_zone: "Ashanti Region",
        payment_zone_code: "AS",
        payment_country_id: "82",
        payment_country: "Ghana",
        payment_iso_code_2: "GH",
        payment_iso_code_3: "GHA",
        payment_address_format: "",
        payment_method: "MTN Mobile Money",
        shipping_firstname: "Dennis",
        shipping_lastname: "Amponsah",
        shipping_company: "",
        shipping_address_1: "P.O.BOX KS 4889",
        shipping_address_2: "",
        shipping_postcode: "00233",
        shipping_city: "Kentinkronon",
        shipping_zone_id: "1270",
        shipping_zone: "Ashanti Region",
        shipping_zone_code: "AS",
        shipping_country_id: "82",
        shipping_country: "Ghana",
        shipping_iso_code_2: "GH",
        shipping_iso_code_3: "GHA",
        shipping_address_format: "",
        shipping_method: "Free Shipping",
        comment: "test comment",
        total: "-",
        order_status_id: "1",
        language_id: "1",
        currency_id: "2",
        currency_code: "GHS",
        currency_value: "1.00000000",
        date_modified: "2019-03-20 23:12:56",
        date_added: "-",
        ip: "154.160.27.206",
        payment_address:
          "Dennis Amponsah<br />P.O.BOX KS 4889<br />Kentinkronon 00233<br />Ashanti Region<br />Ghana",
        shipping_address:
          "Dennis Amponsah<br />P.O.BOX KS 4889<br />Kentinkronon 00233<br />Ashanti Region<br />Ghana",
        products: [
          {
            name: "Treblab XR 500 Earphones",
            model: "TLBXR500",
            option: [],
            quantity: "1",
            price: "GH₵300.00",
            total: "GH₵300.00",
            return:
              "https://www.moscophones.com/index.php?route=account/return/insert&amp;order_id=65&amp;product_id=106"
          },
          {
            name: "Iphone X",
            model: "Iphon",
            option: [],
            quantity: "1",
            price: "GH₵300.00",
            total: "GH₵300.00",
            return:
              "https://www.moscophones.com/index.php?route=account/return/insert&amp;order_id=65&amp;product_id=106"
          },
          {
            name: "Screen Protector",
            model: "sd",
            option: [],
            quantity: "1",
            price: "GH₵300.00",
            total: "GH₵300.00",
            return:
              "https://www.moscophones.com/index.php?route=account/return/insert&amp;order_id=65&amp;product_id=106"
          },
          {
            name: "Samsung s10",
            model: "Samsung",
            option: [],
            quantity: "1",
            price: "GH₵300.00",
            total: "GH₵300.00",
            return:
              "https://www.moscophones.com/index.php?route=account/return/insert&amp;order_id=65&amp;product_id=106"
          }
        ],
        vouchers: [],
        totals: [
          {
            order_total_id: "3436",
            order_id: "65",
            code: "sub_total",
            title: "Sub-Total",
            text: "GH₵300.00",
            value: "300.0000",
            sort_order: "1"
          },
          {
            order_total_id: "3437",
            order_id: "65",
            code: "shipping",
            title: "Free Shipping",
            text: "GH₵0.00",
            value: "0.0000",
            sort_order: "3"
          },
          {
            order_total_id: "3438",
            order_id: "65",
            code: "total",
            title: "Total",
            text: "GH₵300.00",
            value: "300.0000",
            sort_order: "9"
          }
        ],
        histories: [
          {
            date_added: "-",
            status: "-",
            comment: ""
          }
        ]
      }
    };
  }

  componentDidMount() {
    // this.setState({ isVisible: true });
    // this.getDetails(this.state.number)
  }

  getDetails() {
    if (this.state.number == "") {
    } else {
      //   console.warn("Number", this.state.number);
      NetInfo.getConnectionInfo().then(connection => {
        if (connection.type == "none") {
          ToastAndroid.show("Connect to the internet and try again", 4000);
        } else {
          axios
            .get(api.trackOrder + this.state.number)
            .then(response => {
              if (response.data.success == true) {
                this.setState({ data: response.data.data, isVisible: false });
              } else {
                // ToastAndroid.show("Order not found. Try again", 4000);
                this.setState({ error: response.data.error });
                // console.warn(response.data);
              }
            })
            .catch(error => {
              Alert.alert("Error Ocurred", "Please try again");
            });
        }
      });
    }
  }
  render() {
    const { data, isVisible, error } = this.state;
    return (
      <Container>
        <TopBar data={data} />
        <Tabs
          tabBarUnderlineStyle={{
            backgroundColor: colors.primaryBlue
          }}
          tabBarInactiveTextColor="grey"
        >
          <Tab
            heading="Order Status"
            // heading={this.state.temp}
            activeTabStyle={{ backgroundColor: "white" }}
            activeTextStyle={{ color: colors.primaryBlue }}
            tabStyle={{ backgroundColor: "white" }}
            textStyle={{ color: colors.primaryGrey }}
          >
            <Orderstatus histories={data.histories} />
          </Tab>
          <Tab
            heading="Ordered Items"
            activeTabStyle={{ backgroundColor: "white" }}
            activeTextStyle={{ color: colors.primaryBlue }}
            tabStyle={{ backgroundColor: "white" }}
            textStyle={{ color: colors.primaryGrey }}
          >
            <Items products={data.products} total={data.totals} />
          </Tab>
        </Tabs>

        {/* Overlay */}
        <Overlay
          isVisible={isVisible}
          height={160}
          //   onBackdropPress={() => this.setState({ isVisible: false })}
          containerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20
          }}
        >
          {/* <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            //   flexDirection: "row"
            }}
          >
            
          </View> */}
          <View>
            <Text style={{ marginLeft: 10, textAlign: 'center' }}>{error}</Text>
            <Form>
              <Item underline={false}>
                {/* <Label>Order Id</Label> */}
                <Input
                  placeholder="Enter Order ID"
                  onChangeText={number => this.setState({ number })}
                  keyboardType="number-pad"
                />
              </Item>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 15
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={{
                    padding: 10,
                    backgroundColor: colors.primaryBlue,
                    marginLeft: 8,
                    borderRadius: 5
                  }}
                >
                  <Text style={{ color: "white" }}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.getDetails()}
                  style={{
                    marginRight: 8,
                    backgroundColor: colors.primaryBlue,
                    padding: 10,
                    borderRadius: 5
                  }}
                >
                  <Text style={{ color: colors.white }}>Go</Text>
                </TouchableOpacity>
              </View>
            </Form>
          </View>
        </Overlay>
      </Container>
    );
  }
}

class Orderstatus extends Component {
  render() {
    const { histories } = this.props;
    return (
      <View style={{ flex: 1, marginLeft: 15, marginRight: 15, marginTop: 20 }}>
        {histories.map(data => (
          <View
            key={data.date_added}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "black" }}>{data.status}</Text>
            <Text style={{ color: "black" }}>{data.date_added}</Text>
          </View>
        ))}
      </View>
    );
  }
}

export class Items extends Component {
  render() {
    const { products, total } = this.props;
    return (
      <ScrollView>
        <ListItem itemDivider>
          <Text>Items</Text>
        </ListItem>
        <View style={{ margin: 15 }}>
          {products.map(data => (
            <View
              key={data.model}
              style={{
                marginTop: 15,
                /*marginLeft: 10,*/ flexDirection: "row"
              }}
            >
              <View
                style={{
                  width: width / 1.8,
                  flexDirection: "row"
                }}
              >
                <Text style={{ color: "black" }}>{data.name}</Text>
                {data.option.length != 0
                  ? data.option.map(data => (
                    <View
                      key={data.name}
                      style={{

                        marginLeft: 5,

                      }}
                    >
                      <Text style={{ fontSize: 13, color: colors.violet }}>
                        ({data.value})
                      </Text>
                    </View>
                  ))
                  : null}
              </View>
              <View
                style={{
                  flex: 1,
                  width: width / 6,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ color: colors.primaryGrey /*marginLeft: 10*/ }}>
                  x {data.quantity}
                </Text>
              </View>
              <View style={{ backgroundColor: "white" }}>
                <Text style={{ color: colors.primaryGrey /*marginLeft: 20*/ }}>
                  {data.total}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Total total={total} title="Totals" />
      </ScrollView>
    );
  }
}

class TopBar extends Component {
  render() {
    return (
      <View style={{ height: 70 }}>
        <Grid>
          <Row>
            <Col
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: colors.primaryGrey }}>Ordered on</Text>
              <Text
                style={{ fontSize: 17, color: "black", fontWeight: "bold" }}
              >
                {this.props.data.date_added}
              </Text>
            </Col>

            <Col
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: colors.primaryGrey }}>Order Number</Text>
              <Text
                style={{ fontSize: 17, color: "black", fontWeight: "bold" }}
              >
                {this.props.data.order_id}
              </Text>
            </Col>

            <Col
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: colors.primaryGrey }}>Total Amount</Text>
              <Text
                style={{
                  fontSize: 17,
                  color: colors.primaryBlue,
                  fontWeight: "bold"
                }}
              >
                GH₵ {this.props.data.total}
              </Text>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}

export class Total extends Component {
  render() {
    const { total, title } = this.props;
    return (
      <View style={{ marginTop: 40 }}>
        <ListItem itemDivider>
          <Text>{title}</Text>
        </ListItem>

        <View style={{ margin: 15 }}>
          {total.map(data => (
            <View
              key={data.code}
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ color: "black" }}>{data.title}</Text>
              <Text style={{ color: "black", fontWeight: "bold" }}>
                {data.text}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
