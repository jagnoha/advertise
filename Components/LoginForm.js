import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
//import '../App.css';
//import logo from '../logo.svg';
/*import { 
  Button, Form, Grid, Header, Image, 
  Menu, Label, Segment, Dropdown, Icon } from 'semantic-ui-react';*/

  import { connect } from 'react-redux';

class LoginForm extends Component {
    render() {
      return (
       
        <Text>Login Form</Text>
      )
    }
  }


  //export default LoginForm;

  const mapStateToProps = (state) => {
    return {
        users: state.users,
    };
  };
  
  /*const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocations: (url) => dispatch(locationsFetchData(url)),
        fetchListings: (url) => dispatch(listingsFetchData(url)),
        fetchBrands: (url) => dispatch(brandsFetchData(url))
    };
  };*/

export default connect(mapStateToProps)(LoginForm);
//export default Listings;