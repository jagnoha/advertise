import React, { Component } from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View, ToolbarAndroid, ScrollView, Picker} from 'react-native';
import { userActiveFetchData } from '../modules/actions';
//import Spinner from 'react-native-loading-spinner-overlay';

//import '../App.css';
//import logo from '../logo.svg';
/*import { 
  Button, Form, Grid, Header, Image, 
  Menu, Label, Segment, Dropdown, Icon } from 'semantic-ui-react';*/

  import { connect } from 'react-redux';

class LoginForm extends Component {
  
  state = {
    
      username: '',
      password: '',
    
  }

  onPressCreateListing = () => {
    //console.log("Hola");
    this.props.userActiveFetchData(this.props.urlBase + '/finduser/' + this.state.username + '/' + this.state.password);
  }

  inputs = {

  }

    render() {

      if (this.props.userActiveIsLoading === true && this.props.userActive === ''){
        return (
          <View style={styles.container}>
               <Text>Loading...</Text>
          </View>
        )
      } 

      return (
       
        <View style={styles.container}>
            <Text style={styles.text}>Login in to your Account</Text>
           
           <TextInput
            ref={ input => {
              this.inputs['username'] = input;
            }}
          /*onSubmitEditing={() => {
            this.focusNextField('password');
          }}*/
          style={styles.titleInput}
          placeholder="Enter Username"
          onChangeText={(username) => this.setState({username})}
          //autoCapitalize = "characters"
          maxLength={30}
          autoCorrect={false}
          value={this.state.username}
        />

        <TextInput
            ref={ input => {
              this.inputs['password'] = input;
            }}
          /*onSubmitEditing={() => {
            this.focusNextField('password');
          }}*/
          style={styles.titleInput}
          placeholder="Enter Password"
          onChangeText={(password) => this.setState({password})}
          //autoCapitalize = "characters"
          maxLength={30}
          autoCorrect={false}
          value={this.state.password}
          secureTextEntry={true}
        />

        <Button
            onPress={this.onPressCreateListing}
            title="Login"
            color="#00cc66"
            accessibilityLabel="Login"
        />

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
    titleInput: {
        margin: 15,
        height: 40,
        borderColor: '#B7B7B7',
        borderWidth: 1
    },
    text: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        marginTop: 15,        
    },
    previewImage: {
        width: "100%",
        height: "100%"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "100%",
        //height: 280,
        //marginTop:50,
      },
      spinnerTextStyle: {
        color: '#FFF'
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
      },
  
  });

  //export default LoginForm;

  const mapStateToProps = (state) => {
    return {
      userActive: state.userActive,
      urlBase: state.urlBase,
      userActiveIsLoading: state.userActiveIsLoading,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
        userActiveFetchData: (url) => dispatch(userActiveFetchData(url)),        
    };
  };
  
  /*const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocations: (url) => dispatch(locationsFetchData(url)),
        fetchListings: (url) => dispatch(listingsFetchData(url)),
        fetchBrands: (url) => dispatch(brandsFetchData(url))
    };
  };*/

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
//export default Listings;