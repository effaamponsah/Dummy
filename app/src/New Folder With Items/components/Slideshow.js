import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Slider from './Slider';

const url = 'http://api.opencart-api.com/api/rest/slideshows'
export default class SlideShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
    // this.fetch()
  }

  // fetch(){
  //   fetch(url, {
  //       method: 'GET',
  //       headers: {
  //           'accept': "application/json",
  //           "X-Oc-Merchant-Id": "123"
  //       }
  //   })
  //   .then(response => response.json())
  //   .then(res => {
  //   //   console.log(res);
  //   })
  //   .catch(e => {
  //       console.log("Error ooooooo"+e);
        
  //   })
  // }
  


  render() {
    
    return (
      <View>
      <Slider />    
      </View>
    );
  }
}
