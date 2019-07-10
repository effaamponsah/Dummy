import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, CardItem, Left, Row, Body, Right, Grid } from "native-base";
import { colors } from "../constants";

export default class OrderItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <ScrollView>
        {data.map(d => (
          <Card key={d.order_id} style={{ marginBottom: 5 }}>
            <CardItem style={{ height: 80 }}>
              <Left>
                <Grid>
                  <Row
                  // style={{
                  //   flex: 1,
                  //   justifyContent: "center",
                  //   alignItems: "center"
                  // }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 20,
                        marginLeft: 10
                      }}
                    >
                      # {d.order_id}
                    </Text>
                  </Row>
                  <Row
                  // style={{
                  //   flex: 1,
                  //   justifyContent: "center",
                  //   alignItems: "center"
                  // }}
                  >
                    <Text style={{ color: "black" }}>{d.date_added}</Text>
                  </Row>
                </Grid>
              </Left>
              <Body>
                <Row
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text>{d.products} Item(s) Ordered</Text>
                </Row>
                <Row
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {d.status == "Pending" ? (
                    <Text style={{ color: "red", marginLeft: 15 }}>
                      {d.status}
                    </Text>
                  ) : (
                    <Text style={{ color: colors.primaryBlue, marginLeft: 15 }}>
                      {d.status}
                    </Text>
                  )}
                </Row>
              </Body>
              <Right>
                <Text style={{ color: colors.primaryBlue }}>{d.total}</Text>
              </Right>
            </CardItem>
          </Card>
        ))}
      </ScrollView>
    );
  }
}
