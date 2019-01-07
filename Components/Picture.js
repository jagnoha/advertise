import React, { Component } from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



class Picture extends Component {
    
    deleteItem = () => {
        this.props.deletePicture(this.props.id);
    }
    
    render(){
        //return <Text onPress={this.deleteListing} style={{ margin:15 }} >{this.props.value}</Text>

        return (
        
        <View style={styles.placeholder}>
        <Image resizeMethod='scale' source={this.props.pictureUri} style={styles.previewImage} />
        <Text onPress={this.deleteItem}>
        <Icon name="trash" size={20} color="#800" /> 
        
        </Text>
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
        //borderWidth: 1,
        //borderColor: "black",
        //backgroundColor: "#eee",
        width: 160,
        height: 120,
        //marginTop:50,
        padding: 15,
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

export default Picture