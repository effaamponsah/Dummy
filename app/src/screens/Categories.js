import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Image, Button, Alert } from 'react-native';
const url = 'https://moscophones.com/index.php?route=feed/rest_api/categories&id='
export default class CatScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('title', 'No title provded from previous route')
    }
}

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      disabled: false
    };
    this.fetch()
  }

  fetch() {
    const id = this.props.navigation.getParam('id', 'no id')
    fetch(url +id,  {
        headers: {
          "accept": "application/json",
          "X-Oc-Merchant-Id":"123"
        }
    }).then(response => response.json())
    .then(res => {
      this.setState({
        data: res.data.sub_categories
      })
      console.log("This is what came \n",res);
    })
    .catch(e => {
        console.log("Cat errror", e);
    })
}


_handleAddToCart = () => {
  Alert.alert('Item Added')
}
  render() {
    const {navigation} = this.props;
    const title = navigation.getParam('title', 'NO_TITLE')
   
    return (
      // <View style={styles.container}>
      //   <Text>This is the id of the category {JSON.stringify(cat_id)}</Text>
      //   <Text>It will be used to do searches</Text>
      // </View>
      <View>
        
<ScrollView 
          // refreshControl= {
          //   <RefreshControl 
          //     refreshing={this.state.refreshing}
          //     onRefresh={this._refresh}
          //   />
          // }
          >
            {
                this.state.data.map((data, i) => (
                  <View key={i} style={{borderBottomColor: 'black', padding: 20,borderBottomWidth:3, borderStyle: 'solid'}}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Product', {
                    title: data.name,
                    id: data.id
                  })}>
                  <Image source={{uri: data.image}}  style={{width: 200, height: 200}} />
                    <Text>
                     {data.name}
                    </Text>

                    <Text>
                    {data.manufacturer}
                    </Text>

                  <Text>
                    ${data.price}
                  </Text>
                  <Text>
                    {data.stock_status}
                  </Text>

                  </TouchableOpacity>
                    <Button title='Add' disabled={this.state.disabled} onPress={this._handleAddToCart}/>
                    <Button title='Wishlist'onPress={() => console.log('Hello')}/>

                  </View>

                ))
            }
 </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})