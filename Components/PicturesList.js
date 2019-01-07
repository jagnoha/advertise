import React, { Component } from 'react';
import Picture from './Picture';
import {FlatList, Text, Image, TouchableOpacity, StyleSheet, View} from 'react-native';
import GridView from 'react-native-gridview';

//import PhotoGrid from 'react-native-image-grid';

const itemsPerRow = 2;

class PicturesList extends Component {

    

    /*renderHeader() {
        return(
          <Text>I'm on top!</Text>
        );
      }
    
      renderItem(item, itemSize, itemPaddingHorizontal) {*/

        

        /*return(
         
          <TouchableOpacity
            key = { item.id }
            style = {{ width: itemSize, height: itemSize, paddingHorizontal: itemPaddingHorizontal }}
            //onPress={ }            
            >
            <Image
              key = { item.id }
              resizeMode = "cover"
              style = {{ flex: 1 }}
              source = { item.source }
            />
          </TouchableOpacity>
        )
      }*/

    render(){
        /*return (
            this.props.pictures.map((item) => {
                return <Picture key = {item.id} id = {item.id} pictureUri = {item.source} deletePicture = {this.props.deletePicture} />
            })
        )*/
    
        return (
        <FlatList
            data={this.props.pictures.map(item => item)}
            renderItem={({item}) => {
            return (
                <View style={
                    { flex: 1, 
                      marginLeft: 15, 
                      marginRight: 15,
                      marginBottom: 15,
                      paddingBottom: 15,
                    }}
                >
            <Picture key = {item.id} id = {item.id} pictureUri = {item.source} deletePicture = {this.props.deletePicture} />
        </View>
    
        
    
);
}}
  //Setting the number of column
  numColumns={2}
  keyExtractor={(item, index) => index}
/>
        )

        /*return (
            <GridView
            data={this.props.pictures.map(item => item)}
            //dataSource={this.props.pictures}
            itemsPerRow={itemsPerRow}
            renderItem={(item) => {
                return (
                    <View style={{ flex: 1, marginLeft: 15,
                    marginRight: 15,
                    marginBottom: 15,
                    paddingBottom: 15,
                       }}>
                        <Picture key = {item.id} id = {item.id} pictureUri = {item.source} deletePicture = {this.props.deletePicture} />
                    </View>
                
                    
                
        );
      }}
    />
        )*/

        /*return (
            <FlatList
                data={this.props.pictures.map(item => item)}
                renderItem={<Picture key = {item.id} id = {item.id} pictureUri = {item.source} deletePicture = {this.props.deletePicture} />}
            />
        )*/

        /*return (
    <PhotoGrid
        data = { this.props.pictures.map(item => item) }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        itemPaddingHorizontal={1}
        renderHeader = { this.renderHeader }
        renderItem = { this.renderItem }
      />*/

      


        

        
    }
}

export default PicturesList