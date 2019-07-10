import React, {Component} from 'react';
import axios from 'axios';

import {Alert} from 'react-native';

import { api } from ".";

// getSession = () => {
//   fetch(api.session)
//   .then(r => r.json())
//   .then(res => {
//    return res
//   })

// }

export const apiFunctions = {
  login(email, pass) {
    fetch(api.loginUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "X-Oc-Session": '1d1s36aojdo9ukc2gspuua0tu1'
      },
      body: JSON.stringify({
        email: email,
        password: pass
      })
    })
      .then(response => response.json())
      .then(res => {
        console.warn(res);
        if (res.success == true) {
          Alert("Success")
        }
        else(
          Alert.alert("Error")
        )
      });
  },

  logout() {
    // fetch(api.logoutUrl, {
    //   method: "POST",
    //   headers: {
    //     accept: "application/json",
    //     // "X-Oc-Merchant-Id": "123",
    //     "X-Oc-Session": "8n8o71i34ufp9hdtibm4k1b991"
    //   },
    // })
    //   .then(response => response.json())
    //   .then(res => {
    //     console.warn(res);
    //   });

      axios.post(api.logoutUrl)
      // .then(res => {
      //   console.warn(res.data);
      // })
      .catch(e => {
        'Error', e
      })
  },

  resetPassword() {
    axios.get(api.passwordreset)
  }


//   categorieDisplay() {
//     fetch(api.categoriesUrl, {
//         headers: {
//           accept: "application/json",
//           "X-Oc-Merchant-Id": "123"
//         }
//       })
//         .then(response => response.json())
//         .then(res => {
//         //   this.setState({
//         //     data: res.data
//         //   });
//         return res
        
//           // console.log(this.state.data);
//         })
//         .catch(e => {
//           console.log("Error", e);
//         });
//   }


};
