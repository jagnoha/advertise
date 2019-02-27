import React, { Component, PureComponent } from 'react';
import { TextInput, Button, RefreshControl, TouchableHighlight, StyleSheet, 
  Modal, ScrollView, Text, View, ToolbarAndroid, FlatList, Image, Picker, ActivityIndicator} from 'react-native';
import { Badge } from 'react-native-elements';
import { listingsFetchData, listingCheckedUpdated, listingsUpdate, locationsFetchData, 
  listingCheckedDeleteDatabase, listingCheckedUpdateDatabase, locationAddDatabase, 
  locationUpdateDatabase, addNewLocation } from '../modules/actions';
import PartNumberList from './PartNumberList';
import PicturesList from './PicturesList';
import ImagePicker from 'react-native-image-picker';
import '../helpers';


///import { MyListItem } from './MyListItem';

//import '../App.css';
//import logo from '../logo.svg';
/*import { 
  Button, Form, Grid, Header, Image, 
  Menu, Label, Segment, Dropdown, Icon } from 'semantic-ui-react';*/

  import { connect } from 'react-redux';
  import { Actions } from 'react-native-router-flux';

  class MyListItem extends PureComponent {
    
    state = {
      uploadingPicture: false,
      locationValue: this.props.locationValue,      
    }

    
    /*_onPress = () => {
      this.props.onPressItem(this.props.id);
      //console.log(this.props.id);
    };*/
  
    _onEndEditing = () => {
     
     this.props.editListing(this.props.id, this.state.locationValue);        

    }
    

    render() {
      /*let urlPic = this.props.urlBase + '/images/' + this.props.pictures[0] + '.jpg';
      let urlPic2 = this.props.urlBase + '/images/' + this.props.pictures[ this.props.pictures.length - 1 ] + '.jpg';*/
      //const textColor = this.props.selected ? 'red' : 'black';
      return (
        <TouchableHighlight onPress={() => this.props.onPressItem(this.props.id)}>
          <View style={ (this.props.itemChecked === this.props.id) ? styles.selectedItem : null }>
            <View style={styles.container}>

                {
                  (this.props.itemChecked !== this.props.id) &&
                  <View style={styles.container}>
                       <Text style={styles.text} onPress={() => this.props.onPressItem(this.props.id)} >{this.props.locationValue} </Text>
                  </View>
                }
                {
                  (this.props.itemChecked === this.props.id) && 

                <View>
                <TextInput
                  /*onSubmitEditing={() => {
                    this.focusNextField('partnumbers');
                  }}*/
                  //onEndEditing = {this._onEndEditing}
                  style={styles.titleInput}
                  placeholder="Enter Location"
                  placeholderTextColor="white"
                  onChangeText={(locationValue) => this.setState({locationValue})}
                  autoCapitalize = "characters"
                  maxLength={30}
                  autoCorrect={false}
                  value={this.state.locationValue}
                />
                
                
              </View>
              }

              

               

              { (this.props.itemChecked === this.props.id) && (!this.state.deleteConfirmation) &&
                <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: '50%', height: 50}}>
                <Button
                   onPress={this._onEndEditing}
                   title="Apply"
                   color="green"
                   accessibilityLabel="Yes"
                 />
                 </View>
                 </View>
              }
              

            </View>
            
            
          </View>
        </TouchableHighlight>
      );
    }   
    
  }  


class Locations extends Component {
    
    state = {
      /*toShelfListings: this.props.listings.map(item => { 
        return (
          {key: item.sku, id: item.sku, title: item.title, partNumber: item.partNumbers[0], pictures: item.pictures}
        )
      }),*/
      locationsListings: [],
      filterListings: "",
      //totalToShelf: this.props.listings.filter(item => item.location.length === 0).length,

      /*toShelfListings: this.props.listings.map(item => { 
        return (
          {key: item.sku, id: item.sku, title: item.title, partNumber: item.partNumbers[0], partNumbers: item.partNumbers,
            quantity: item.quantity, pictures: item.pictures, location: item.location, conditionDescription: item.conditionDescription,
            condition: conditionOptions.filter(itemCondition => itemCondition.id === item.condition)[0].value, conditionId: item.condition  }
        )
      })*/


    }

    /*componentDidMount(){
      this.props.listingCheckedUpdated("");
      //this.props.fetchBrands(this.props.urlBase + '/getbrands');
      //this.props.fetchLocations(this.props.urlBase + '/getlocations');
      //this.props.fetchEbayMarketplaces(this.props.urlBase + '/getebaymarketplaces');
            
    }*/

    _onPressItem = (id) => {
      
      this.props.listingCheckedUpdated(id);      
      
    }


    editListing = (id, locationValue) => {
      this.props.listingCheckedUpdated("");

      let tempLocation = '';

      if (locationValue !== ""){

          let tempLocations = this.props.locations.filter(item => item.id !== id);

          let newLocations = tempLocations.concat({id: id, value: locationValue});
          
          this.props.locationUpdateDatabase(this.props.urlBase + '/updatelocation/' + id + '/' + locationValue, newLocations);

      } else {
        
        this.setState({
          locationsListings: [],
          filterListings: "",
        })

      }
      


    }




    _renderItem = ({item}) => (
      
      <MyListItem
        id={item.id}
        onPressItem={this._onPressItem}
        editListing={this.editListing}
        itemChecked={this.props.listingChecked}
        urlBase={this.props.urlBase}
        locationValue={item.locationValue}
      />
      
    );

    _onRefresh = () => {      
      this.props.fetchLocations(this.props.urlBase + '/getlocations');
      
      this.props.listingCheckedUpdated("");

      if (this.state.filterListings.length > 0){

       try { 

        this.setState({
           locationsListings: this.props.locations.map(item => { 
          
           return (
              {key: item.id, id: item.id, locationValue: item.value}
           )
        
        
          })
        })

      } catch(error){
        this.setState({
          locationsListings: [],
          
        })
      }



      } else {
        this.setState({
          locationsListings: [],
          
        })
      }

        


    }

    _onEndEditingFilter = () => {

        this.props.listingCheckedUpdated("");

        //if (this.state.filterListings.length > 0){
          /*this.setState({
            toShelfListings: this.state.toShelfListings.filter(item => item.title.toLowerCase().includes(this.state.filterListings.toLowerCase())
            || item.partNumber.toLowerCase().includes(this.state.filterListings.toLowerCase())            
            )
          })*/

        try {    

          if (this.state.filterListings.length > 0){

            try { 

              this.setState({
                 locationsListings: this.props.locations.map(item => { 
                
                 return (
                    {key: item.id, id: item.id, locationValue: item.value}
                 )
              
              
                }).filter(item => item.locationValue.includes(this.state.filterListings) && isFinite(item.locationValue) && Number(item.locationValue)>1000 ).sort()
              })
      
            } catch(error){
              this.setState({
                locationsListings: [],
                
              })
            }

        } else {
          this.setState({
            locationsListings: [],
          })
        }

      } catch(error){
        console.log(error);
        this.setState({
          locationsListings: [],
          
        })
        this._onRefresh();

      }


          /*this.setState({
            toShelfListings: this.props.listings.filter(item => item.title.toLowerCase().includes(this.state.filterListings.toLowerCase())
            || item.partNumber.toLowerCase().includes(this.state.filterListings.toLowerCase())            
            )
          })*/


        /*} else {

          this.setState({
            toShelfListings: this.props.listings.map(item => { 
              return (
                {key: item.sku, id: item.sku, title: item.title, partNumber: item.partNumbers[0], pictures: item.pictures}
              )
            }),
          }) 

        }*/

    }

    

    onActionSelected = (position) => {
      if (position === 0) {
          Actions.home()           

      }
      if (position === 1) {
          Actions.toShelf()           

      }

      if (position === 2) {
          Actions.drafts()           

      }

      if (position === 3) {
        Actions.locations();
        
    }

      if (position === 4) {
          Actions.home();
          this.props.userActiveLogout();
          
      }

      

  }

    renderSeparator = () => {
      return (
        <View
          style={{
            height: 2,
            //width: "86%",
            backgroundColor: "#CED0CE",
            //marginLeft: "14%",
            marginTop: 10,
            marginBottom: 15,
            
          }}
        />
      );
    };
    
    render() {
      return (
        <ScrollView
          refreshControl={
           <RefreshControl
             refreshing={this.props.listingCheckedIsLoading}
             onRefresh={this._onRefresh}
          />
        }
        
      >
        <ToolbarAndroid
        style={styles.toolbar}
        //logo={require('./app_logo.png')}
        title="AdvertisingApp"
        actions={[{title: 'Advertise', show: 'never'}, {title: 'To Shelf', show: 'never'}, 
        {title: 'Drafts', show: 'never'}, {title: 'Locations', show: 'never'}, {title: 'Logout', show: 'never'}]}
        onActionSelected={this.onActionSelected} />
        <View style={styles.container}>
        
        

        <Text style={styles.text} >Locations</Text>
        
        
        <TextInput
          
          
          style={styles.filterListings}
          placeholder="Search Location..."
          onChangeText={(filterListings) => this.setState({filterListings})}
          autoCapitalize = "characters"
          maxLength={50}
          autoCorrect={false}
          value={this.state.filterListings}
          onEndEditing = {this._onEndEditingFilter}
        />
          
        
          <FlatList
          ItemSeparatorComponent={this.renderSeparator}
        removeClippedSubviews={true}
        data={this.state.locationsListings}
        renderItem={this._renderItem}
        extraData={{
          itemChecked: this.props.listingChecked,
         
        }}        
        
        initialNumToRender={2}
      />
        
        </View>
        </ScrollView>
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
    frameContent: {
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: 'white',
      paddingLeft: 10,
      paddingRight: 10,
    },
    frameContentAditional: {
      marginTop: -5,
      marginBottom: 10,
      marginLeft: 5,
      marginRight: 5,
      backgroundColor: 'white',
      paddingLeft: 10,
      paddingRight: 10,
    },

    selectedItem: {      
      //flex: 1,
      backgroundColor: '#9BE1FF',
      paddingTop: 15,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      //alignItems: 'center',
    },
    
    toolbar: {
      backgroundColor: '#2196F3',
      height: 56,
    },
    container: {
      flex: 1,
      //justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor: '#F5FCFF'
    },
    placeholderPicture: {
      //borderWidth: 1,
      //borderColor: "black",
      backgroundColor: "white",
      width: "100%",
      padding: 10,
      //height: 280,
      //marginTop:50,
    },
    placeholder: {
      //borderWidth: 1,
      //borderColor: "black",
      //backgroundColor: "#eee",
      width: "100%",
      //height: 280,
      //marginTop:50,
    },
    text: {
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 5,
      marginTop: 15,
      fontWeight: 'bold',
      fontSize: 18,              
  },
  titleInput: {
    //margin: 15,
    //height: 40,
    //borderColor: '#B7B7B7',
    //placeholderColor: 'white',
    //marginLeft: 15,
    //marginRight: 15,
    marginBottom: 10,
    borderColor: 'white',
    color: 'white',
    backgroundColor: 'black',
    borderWidth: 3,
    fontSize: 18,
},
conditionInput: {
  //margin: 15,
  //height: 40,
  //borderColor: '#B7B7B7',
  //placeholderColor: 'white',
  //marginLeft: 15,
  //marginRight: 15,
  marginBottom: 10,
  borderColor: 'white',
  color: 'white',
  backgroundColor: 'black',
  borderWidth: 3,
  //fontSize: 18,
},
  LocationInput: {
    //margin: 15,
    //height: 40,
    //borderColor: '#B7B7B7',
    //placeholderColor: 'white',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
    borderColor: 'white',
    color: 'white',
    backgroundColor: 'black',
    borderWidth: 3,
    fontSize: 18,
},
filterListings: {
  margin: 15,
  width: "70%",
  //borderColor: '#B7B7B7',
  //placeholderColor: 'white',
  borderColor: 'black',
  color: 'black',
  backgroundColor: 'white',
  borderWidth: 3
},
  partNumber: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 22,              
},
quantity: {
  marginLeft: 15,
  marginRight: 15,
  marginBottom: 10,
  marginTop: 5,
  fontWeight: 'bold',
  fontSize: 22,
  color: 'blue',              
},
condition: {
  marginLeft: 15,
  marginRight: 15,
  marginBottom: 10,
  marginTop: 5,
  //fontWeight: 'bold',
  fontSize: 20,
  color: 'gray',              
},
  
  });

  //export default LoginForm;

  const mapStateToProps = (state) => {
    return {
        users: state.users,
        listings: state.listings,
        urlBase: state.urlBase,
        listingChecked: state.listingChecked,
        listingCheckedIsLoading: state.listingCheckedIsLoading,
        locations: state.locations,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      fetchLocations: (url) => dispatch(locationsFetchData(url)),      
      fetchListings: (url, clickedColumn, order) => dispatch(listingsFetchData(url, clickedColumn, order)),
      listingCheckedUpdated: (listingChecked) => dispatch(listingCheckedUpdated(listingChecked)),
      locationAddDatabase: (url, id, value) => dispatch(locationAddDatabase(url, id, value)),
      addNewLocation: (newLocation) => dispatch(addNewLocation(newLocation)),
      listingCheckedUpdateDatabase: (url, listings) => dispatch(listingCheckedUpdateDatabase(url, listings)),
      listingCheckedDeleteDatabase: (url, listings) => dispatch(listingCheckedDeleteDatabase(url, listings)),
      listingsUpdate: (listings) => dispatch(listingsUpdate(listings)),
      locationUpdateDatabase: (url, locations) => dispatch(locationUpdateDatabase(url, locations)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
  
  //, MyListItem);