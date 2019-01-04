import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, ToolbarAndroid} from 'react-native';
//import '../App.css';
//import logo from '../logo.svg';
/*import { 
  Button, Form, Grid, Header, Image, 
  Menu, Label, Segment, Dropdown, Icon } from 'semantic-ui-react';*/

  import { connect } from 'react-redux';
  import { Actions } from 'react-native-router-flux';

class ToShelf extends Component {
    
    onActionSelected = (position) => {
        if (position === 0) {
            Actions.home()           

        }

        if (position === 1) {
            Actions.toShelf()           

        }
    }
    
    render() {
      return (
        <View>
        <ToolbarAndroid
        style={styles.toolbar}
        //logo={require('./app_logo.png')}
        title="AdvertisingApp"
        actions={[{title: 'Advertise', show: 'never'}, {title: 'To Shelf', show: 'never'}]}
        onActionSelected={this.onActionSelected} />
        <Text>TO SHELF</Text>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    containerToolbar: {
      flex: 1,
      //justifyContent: 'center',
      justifyContent: 'flex-start',
      // https://github.com/facebook/react-native/issues/2957#event-417214498
      alignItems: 'stretch',
      backgroundColor: '#F5FCFF',
    },
    toolbar: {
      backgroundColor: '#2196F3',
      height: 56,
    },
  
  });

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

export default connect(mapStateToProps)(ToShelf);