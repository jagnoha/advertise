import React, { Component } from 'react';
import {Text, StyleSheet} from 'react-native';


class PartNumber extends Component {
    
    deleteListing = () => {
        this.props.deleteItem(this.props.id);
    }
    
    render(){
        return <Text onPress={this.deleteListing} style={styles.partnumber} >{this.props.value}</Text>
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
    partnumber: {
        margin: 15,
        padding: 10,
        color: "#FFFFFF",
        backgroundColor: "#000000"
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



export default PartNumber