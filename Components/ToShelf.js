import React, { Component, PureComponent } from 'react';
import { TextInput, Button, RefreshControl, TouchableHighlight, StyleSheet, 
  Modal, ScrollView, Text, View, ToolbarAndroid, FlatList, Image, Picker, ActivityIndicator} from 'react-native';
import { Badge } from 'react-native-elements';
import { listingsFetchData, listingCheckedUpdated, listingsUpdate, locationsFetchData, 
  listingCheckedDeleteDatabase, listingCheckedUpdateDatabase, locationAddDatabase, addNewLocation } from '../modules/actions';
import PartNumberList from './PartNumberList';
import PicturesList from './PicturesList';
import ImagePicker from 'react-native-image-picker';
import '../helpers.js';

const uuidv4 = require('uuid/v4');

const conditionOptions = [
  {value: 'New', id: '0'},
  {value: 'New (Other)', id: '1'},
  {value: 'Used', id: '2'},
  {value: 'Manufacturer refurbished', id: '3'},
  {value: 'For parts or not working', id: '4'},
]
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
      location: "",
      //quantity: this.props.listings.filter(item => item.sku === this.props.id)[0].quantity, //this.props.quantity,
      quantity: this.props.quantity,
      title: this.props.title,
      description: this.props.description,
      conditionDescription: this.props.conditionDescription[0],
      partNumbers: this.props.partNumbers.map(item => { return ({id:uuidv4(), partNumber: item}) }),
      picturesListTemp: this.props.pictures.map(item => { return ({id: item, 
        source: {uri: this.props.urlBase + '/images/' + item + '.jpg'}, uri: this.props.urlBase + '/images/' + item + '.jpg'}) }),
      partNumberTemp: null,
      deleteConfirmation: false,
      conditionId: this.props.conditionId,
    }

    
    /*_onPress = () => {
      this.props.onPressItem(this.props.id);
      //console.log(this.props.id);
    };*/
  
    _onEndEditing = () => {
      /*this.props.editLocation(this.props.id, this.state.location);
      this.props.editQuantity(this.props.id, this.state.quantity, this.state.picturesListTemp.map(item => item.id), this.state.title,
        this.state.description, [this.state.conditionDescription], this.state.partNumbers.map(item => item.partNumber), this.state.conditionId );    
      */
     this.props.editListing(this.props.id, this.state);
        

    }

    /*_onEndEditingQuantity = () => {
      this.setState({
        quantity: this.state.quantity,
      })
      this.props.editQuantity(this.props.id, this.state.quantity);
    }*/

    _onPressAcceptDelete = () => {
      this.props.deleteListing(this.props.id);
    }

    finishEditing = () => {
      const partNumber = this.state.partNumberTemp;
      if (partNumber !== ''){
          this.setState({
              partNumbers: this.state.partNumbers.concat({id: uuidv4(), partNumber}),
              partNumberTemp: null,
          })
      }            
    }
    
    deleteItem = (id) => {
      const list = this.state.partNumbers.filter(item => item.id !== id);
      this.setState({
          partNumbers: list,
      })

    }

    deletePicture = (id) => {
      const list = this.state.picturesListTemp.filter(item => item.id !== id);
      this.setState({
          picturesListTemp: list,
      })

  }

    pickImageHandler = () => {

      const options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };

      ImagePicker.launchCamera(options,(response) => {
        
          if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              /*this.setState({
                avatarSource: source,
              });*/

              const photo = {
                  uri: response.uri,
                  //filename: response.uri.split('/')[response.uri.split('/').length-1].split('.')[0].split('image-')[1],
                  //name: response.uri.split('/')[response.uri.split('/').length-1].split('.')[0].split('image-')[1],
                  name: 'image.jpg',
                  type: 'image/jpeg',
                };
                const data = new FormData();
                data.append('file', photo);
                data.append('name', response.uri.split('/')[response.uri.split('/').length-1].split('.')[0].split('image-')[1]);
                const config = {
                  method: 'POST',
                  body: data,
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                };
                //let idPic = uuidv4();
                let idPic = response.uri.split('/')[response.uri.split('/').length-1].split('.')[0].split('image-')[1];
                this.setState({ uploadingPicture: true, picturesListTemp: this.state.picturesListTemp.concat({id: idPic, source: {uri: response.uri}, uri: response.uri.split('/')[response.uri.split('/').length-1].split('.')[0].split('image-')[1]} )});
                
                
                
                /*fetch(this.props.urlBase + '/upload', config)
                .then((responseUpload) => {
          
                     //setTimeout(this.setState({uploadingPicture: false}), 2000);
                  
                  this.setState({uploadingPicture: false});
                  //console.log(response);
                  return responseUpload
              
                 })  
                .catch((error) => {
                  this.setState({uploadingPicture: false});
                  
                  //setTimeout(this.setState({uploadingPicture: false}), 3000);

                  console.error(error);
                });*/

                function handleErrors(response) {
                  if (!response.ok) {
                      throw Error(response.statusText);
                  }
                  return response;
                  }
                  
                  fetch(this.props.urlBase + '/upload', config)
                  .then(handleErrors)
                  .then(response => this.setState({uploadingPicture: false}))
                  .catch(error => {

                      
                          
                          this.setState({
                              uploadingPicture: false,
                              picturesListTemp: this.state.picturesListTemp.filter(item => item.id !== idPic),
                          })
                          
                      


                      /*this.setState({
                          uploadingPicture: false,
                          picturesListTemp: picturesListTemp.filter(item => item.id !== idPic),
                      });*/
                  });



                
              
          }                       

      });

      
      
        
    }

    

    render() {
      let urlPic = this.props.urlBase + '/images/' + this.props.pictures[0] + '.jpg';
      let urlPic2 = this.props.urlBase + '/images/' + this.props.pictures[ this.props.pictures.length - 1 ] + '.jpg';
      //const textColor = this.props.selected ? 'red' : 'black';
      return (
        <TouchableHighlight onPress={() => this.props.onPressItem(this.props.id)}>
          <View style={ (this.props.itemChecked === this.props.id) ? styles.selectedItem : null }>
            <View style={styles.container}>
            

            {
                (this.props.itemChecked !== this.props.id) &&
            <View>
            <Image
              resizeMethod="resize"
              style={{ width: 180, height: 100 }}
              source = { {uri: urlPic }} 
              
              />
              

              <Image
                resizeMethod="resize"
                style={{ width: 180, height: 100 }}
                source = { {uri: urlPic2 }}
                 />
              </View>
            }

            {
                (this.props.itemChecked === this.props.id) && (this.state.deleteConfirmation) &&
                <View style={styles.container}>
                  <Image
              resizeMethod="resize"
              style={{ width: 180, height: 100 }}
              source = { {uri: urlPic }} 
              
              />
              

              <Image
                resizeMethod="resize"
                style={{ width: 180, height: 100 }}
                source = { {uri: urlPic2 }}
                 />
                <Text style={styles.text}  >{this.props.title} </Text>
                <Text style={styles.condition}  >{this.props.condition} </Text>
                <Text style={styles.partNumber}  >PN: {this.props.partNumber} </Text>  
                </View>
            
            }

            {
                (this.props.itemChecked === this.props.id) && (!this.state.deleteConfirmation) &&
                <View style={styles.placeholderPicture}>
                 { this.state.picturesListTemp.length > 0 ? <View ><PicturesList deletePicture = {this.deletePicture} pictures={this.state.picturesListTemp} />
                 </View> : <Text></Text>}
                 
                 { this.state.uploadingPicture === false ?
                 <Button
                     onPress={this.pickImageHandler}
                     title="Add Picture"
                     color="#0099cc"
                     accessibilityLabel="Add Picture"
                 /> : <View><ActivityIndicator size="large" color="#0000ff" /></View>
                 }
                 </View>
                
              }





                {
                  (this.props.itemChecked !== this.props.id) &&
                  <View style={styles.container}>
                  <Text style={styles.text} onPress={() => this.props.onPressItem(this.props.id)} >{this.props.title} </Text>
                  <Text style={styles.condition} onPress={() => this.props.onPressItem(this.props.id)} >{this.props.condition} </Text>
                  <Text style={styles.partNumber} onPress={() => this.props.onPressItem(this.props.id)} >PN: {this.props.partNumber} </Text>
                  <Text style={styles.quantity} onPress={() => this.props.onPressItem(this.props.id)} >Quantity: {this.props.quantity} </Text>
                  </View>
                }
                {
                  (this.props.itemChecked === this.props.id) && (!this.state.deleteConfirmation) &&

                <View>
                <Text style={styles.text} >Title</Text>
                <TextInput
                  /*onSubmitEditing={() => {
                    this.focusNextField('partnumbers');
                  }}*/
                  //onEndEditing = {this._onEndEditing}
                  style={styles.titleInput}
                  placeholder="Enter Title"
                  placeholderTextColor="white"
                  onChangeText={(title) => this.setState({title})}
                  autoCapitalize = "characters"
                  maxLength={80}
                  autoCorrect={false}
                  value={this.state.title}
                />
                
                <View style={styles.frameContent}>

                <Text style={styles.text}>Part Numbers</Text>
        
                <TextInput                
                value={this.state.partNumberTemp}
                style={styles.titleInput}
                placeholder="Add Part Number"
                placeholderTextColor="white"
                onChangeText={(partNumberTemp) => this.setState({partNumberTemp})}
                autoCapitalize = "characters"
                onEndEditing = {this.finishEditing}
                maxLength={30}
                autoCorrect={false}
                />  
                <PartNumberList deleteItem = {this.deleteItem} partNumbers = {this.state.partNumbers} />
                    
                </View>
                
                
                <View style={styles.frameContent}>    

                <Text style={styles.text}>Condition</Text>
              <Picker
                //style={styles.text}
                style={styles.conditionInput}
                prompt="Select Condition"
                //mode="dropdown"
                selectedValue={this.state.conditionId}
                //style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => this.setState({conditionId: itemValue})}>
                <Picker.Item label="New" value= "0" />
                <Picker.Item label="New (Other)" value="1" />
                <Picker.Item label="Used" value="2" />
                <Picker.Item label="Manufacturer refurbished" value="3" />
                <Picker.Item label="For parts or not working" value="4" />            
              </Picker>

              </View>

              </View>
              }

              {
                (this.props.itemChecked === this.props.id) && (!this.state.deleteConfirmation) && (Number(this.state.conditionId) > 0) &&
                <View style={styles.frameContentAditional}>
                <Text style={styles.text} >Condition Description</Text>                
                <TextInput
                  /*onSubmitEditing={() => {
                    this.focusNextField('partnumbers');
                  }}*/
                  //onEndEditing = {this._onEndEditing}
                  style={styles.titleInput}
                  placeholder="Enter Condition Description"
                  placeholderTextColor="white"
                  onChangeText={(conditionDescription) => this.setState({conditionDescription})}
                  autoCapitalize = "characters"
                  //maxLength={80}
                  autoCorrect={false}
                  value={this.state.conditionDescription}
                />
                </View>
              }

               {
                (this.props.itemChecked === this.props.id) && (!this.state.deleteConfirmation) &&
                <View>
                <Text style={styles.text} >Description</Text>
                <TextInput
                  /*onSubmitEditing={() => {
                    this.focusNextField('partnumbers');
                  }}*/
                  //onEndEditing = {this._onEndEditing}
                  style={styles.titleInput}
                  placeholder="Enter Description"
                  placeholderTextColor="white"
                  onChangeText={(description) => this.setState({description})}
                  autoCapitalize = "characters"
                  multiline = {true}
                  numberOfLines = {4}
                  //maxLength={80}
                  autoCorrect={false}
                  value={this.state.description}
                />


                <Text style={styles.text} >Quantity</Text>
                <TextInput
                  /*onSubmitEditing={() => {
                    this.focusNextField('partnumbers');
                  }}*/
                  //onEndEditing = {this._onEndEditingQuantity}
                  style={styles.LocationInput}
                  //placeholder="Enter Quantity"
                  placeholderTextColor="white"
                  onChangeText={(quantity) => this.setState({quantity})}
                  autoCorrect={false}
                  maxLength={6}
                  autoCorrect={false}
                  keyboardType="numeric"
                  value={String(this.state.quantity)}
                  //value={String(this.props.quantity)}
                />

                

                <TextInput
                  /*onSubmitEditing={() => {
                    this.focusNextField('partnumbers');
                  }}*/
                  //onEndEditing = {this._onEndEditing}
                  style={styles.LocationInput}
                  placeholder="Enter Location"
                  placeholderTextColor="white"
                  onChangeText={(location) => this.setState({location})}
                  autoCapitalize = "characters"
                  maxLength={20}
                  autoCorrect={false}
                  value={this.state.location}
                />
            
                
                </View>
              
              }

              { (this.props.itemChecked === this.props.id) && (!this.state.deleteConfirmation) &&
                <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: '50%', height: 50}}>
                <Button
                   onPress={this._onEndEditing}
                   title="Apply Changes"
                   color="green"
                   accessibilityLabel="Yes"
                 />
                 </View>
                 <View style={{width: '50%', height: 50}}>
                <Button
                   onPress={() => this.setState({deleteConfirmation: true})}
                   title="Delete Listing"
                   color="red"
                   accessibilityLabel="Delete Listing"
                />
                </View>
                </View>
              }

              { (this.props.itemChecked === this.props.id) && (this.state.deleteConfirmation) &&
                <View>
                 <Text style={styles.text} >Do you want to delete this listing?</Text>
                 <View style={{flex: 1, flexDirection: 'row'}}>
                 <View style={{width: '50%', height: 50}}>
                 <Button
                   onPress={() => this.setState({deleteConfirmation: false})}
                   title="No"
                   color="red"
                   accessibilityLabel="No"
                 />
                 </View>
                 <View style={{width: '50%', height: 50}}>
                 <Button
                   onPress={this._onPressAcceptDelete}
                   title="Yes"
                   color="green"
                   accessibilityLabel="Yes"
                 />
                 </View>
                 </View>
                </View>
              }
              
              

            </View>
            
            
          </View>
        </TouchableHighlight>
      );
    }   
    
  }  


class ToShelf extends Component {
    
    state = {
      /*toShelfListings: this.props.listings.map(item => { 
        return (
          {key: item.sku, id: item.sku, title: item.title, partNumber: item.partNumbers[0], pictures: item.pictures}
        )
      }),*/
      toShelfListings: [],
      //itemChecked: this.props.listingChecked,
      locations: this.props.locations,
      filterListings: "",
      //totalToShelf: this.props.listings.filter(item => item.location.length === 0).length,
    }

    /*componentDidMount(){
      this.props.listingCheckedUpdated("");
      //this.props.fetchBrands(this.props.urlBase + '/getbrands');
      //this.props.fetchLocations(this.props.urlBase + '/getlocations');
      //this.props.fetchEbayMarketplaces(this.props.urlBase + '/getebaymarketplaces');
            
    }*/

    _onPressItem = (id) => {
      
      this.props.listingCheckedUpdated(id);
      
      /*this.setState({
        itemChecked: id,
      })*/
    }


    editListing = (id, fields) => {
      this.props.listingCheckedUpdated("");

      let tempLocation = '';

      if (fields.location !== ""){

        if (this.state.locations.filter(item => item.value.toUpperCase() === fields.location.toUpperCase()).length === 0){
            tempLocation = uuidv4();
            this.props.locationAddDatabase(this.props.urlBase + '/addlocation/' + tempLocation + '/' + fields.location.toUpperCase(), 
            tempLocation, fields.location);
            this.setState({
              locations: this.state.locations.concat({id: tempLocation, value: fields.location}),
            });
          } else {
            tempLocation = this.state.locations.filter(item => item.value.toUpperCase() === fields.location.toUpperCase())[0].id
          }

          this.setState({
            toShelfListings: this.state.toShelfListings.filter(item => item.id !== id),
          })

          const myFields = {
            "sku": id,
            "location": [tempLocation],
            "title": fields.title,
            "condition": fields.conditionId,
            "quantity": fields.quantity,
            "pictures": fields.picturesListTemp.map(item => item.id),
            "partNumbers": fields.partNumbers.map(item => item.partNumber),
            "condition": fields.conditionId,
            "conditionDescription": [fields.conditionDescription],
            "description": fields.description,

          }
          this.props.listingCheckedUpdateDatabase(this.props.urlBase + '/updatetoshelf/' + id + '/' + encodeURIComponent(JSON.stringify(myFields)), 
          this.state.toShelfListings.filter(item => item.id !== id));


      } else {
        tempLocation = '';
        const myFields = {
          "sku": id,
          "location": [],
          "title": fields.title,
          "condition": fields.conditionId,
          "quantity": fields.quantity,
          "pictures": fields.picturesListTemp.map(item => item.id),
          "partNumbers": fields.partNumbers.map(item => item.partNumber),
          "condition": fields.conditionId,
          "conditionDescription": [fields.conditionDescription],
          "description": fields.description,
        }

        let subListings = this.state.toShelfListings.filter(item => item.id !== id);
        
        let listing = this.state.toShelfListings.filter(item => item.id === id);
        
        listing['location'] = myFields.location;
        listing['title'] = myFields.title;
        listing['condition'] = myFields.condition;
        listing['quantity'] = myFields.quantity;
        listing['pictures'] = myFields.pictures;

        subListings = subListings.concat(listing);

        this.setState({
          toShelfListings: subListings,
        })


        this.props.listingCheckedUpdateDatabase(this.props.urlBase + '/updatetoshelf/' + id + '/' + encodeURIComponent(JSON.stringify(myFields)),
        subListings);          
      }

      //pictures, title, description, conditionDescription, partnumbers, conditionId

      

      


    }



    editLocation = (id, location) => {

      this.props.listingCheckedUpdated("");
      
      let tempLocation = '';

            if (location !== ""){

                if (this.state.locations.filter(item => item.value.toUpperCase() === location.toUpperCase()).length === 0){
                    tempLocation = uuidv4();
                    this.props.locationAddDatabase(this.props.urlBase + '/addlocation/' + tempLocation + '/' + location.toUpperCase(), tempLocation, location);
                    this.setState({
                      locations: this.state.locations.concat({id: tempLocation, value: location}),
                    });
                } else {
                    tempLocation = this.state.locations.filter(item => item.value.toUpperCase() === location.toUpperCase())[0].id
                }

                this.props.listingCheckedUpdateDatabase(this.props.urlBase + '/updatetoshelf/' + id + '/' + tempLocation, 
                this.state.toShelfListings.filter(item => item.id !== id));

                //this.props.listingsUpdate(this.props.listings.filter(item => item.sku !== id));
                
                this.setState({
                  toShelfListings: this.state.toShelfListings.filter(item => item.id !== id),
                  //totalToShelf: this.props.listings.filter(item => item.location.length === 0).length,
                })
                
                //this._onRefresh();

            } else {
                tempLocation = '';
            }

            

            

            

    }

    editQuantity = (id, quantity, pictures, title, description, conditionDescription, partnumbers, conditionId) => {

      this.props.listingCheckedUpdated("");
      
      //let tempLocation = '';

            //if (location !== ""){
                
                let tempList = this.state.toShelfListings.map(item => {

                    if (item.sku === id){
                      return {key: item.key, id: item.id, title: item.title, partNumber: item.partNumber, 
                        partNumbers: item.partNumbers, description: item.description,
                        condition: item.condition, quantity: quantity, pictures: item.pictures, 
                        location: item.location, conditionDescription: item.conditionDescription, conditionId: item.conditionId}
                    } else {
                      return item
                    }
                   
                })
                  
                  /*return (
                     {key: item.sku, id: item.sku, title: item.title, partNumber: item.partNumbers[0], 
                        condition: conditionOptions.filter(itemCondition => itemCondition.id === item.condition)[0].value, 
                        quantity: item.quantity, pictures: item.pictures, location: item.location}
                     })
                   
                })*/

                //let chooseItem = this.state.toShelfListings.filter(item => item.sku === id)[0]['quantity'] = quantity;
                
                //let chooseItem = this.state.toShelfListings.filter(item => item.sku !== id)[0];                 

                //let finalList = tempList.concat(chooseItem);

                this.props.listingCheckedUpdateDatabase(this.props.urlBase + '/updatequantity/' + id + '/' + quantity + 
                '/' + pictures + '/' + title + '/' + description + '/' + conditionDescription + '/' + partnumbers +
                '/' + conditionId, 
                tempList);

                //this.props.listingsUpdate(tempList);
                
                /*this.setState({
                  toShelfListings: tempList,
                  //filterListings: "",
                  //totalToShelf: this.props.listings.filter(item => item.location.length === 0).length,
                })*/

                this.setState({
                  toShelfListings: [],
                  filterListings: "",
                })

                //this._onRefresh();

                //this._onEndEditingFilter();
                //this._onRefresh()

                /*this.setState({
                  toShelfListings: [],
                  filterListings: "",
                })*/

                
                
                //this._onRefresh();

            //} else {
            //    tempLocation = '';
            //}

    }



    deleteListing = (id) => {
      
      let listingsTemp = this.props.listings.filter(item => item.sku !== id);

      this.props.listingCheckedDeleteDatabase(this.props.urlBase + '/deleteofflinelisting/' + id, listingsTemp)

      this.setState({
        toShelfListings: this.state.toShelfListings.filter(item => item.id !== id),
        //totalToShelf: this.props.listings.filter(item => item.location.length === 0).length,
      })

    }

    /*componentDidMount(){
      
      //this.props.fetchBrands(this.props.urlBase + '/getbrands');
      //this.props.fetchLocations(this.props.urlBase + '/getlocations');
      //this.props.fetchEbayMarketplaces(this.props.urlBase + '/getebaymarketplaces');
      this.props.fetchListings(this.props.urlBase + '/getlistingstoshelf');      
    }*/

    _renderItem = ({item}) => (
      
      <MyListItem
        id={item.id}
        onPressItem={this._onPressItem}
        //selected={!!this.state.selected.get(item.id)}
        title={item.title}
        pictures={item.pictures}
        partNumber={item.partNumber}
        urlBase={this.props.urlBase}
        editLocation={this.editLocation}
        editQuantity={this.editQuantity}
        editListing={this.editListing}
        deleteListing={this.deleteListing}
        //extraData={{itemChecked: this.props.listingChecked}}
        itemChecked={this.props.listingChecked}
        //listings={this.props.listings}
        condition={item.condition}
        conditionId={item.conditionId}
        quantity={item.quantity}
        partNumbers={item.partNumbers}
        description={item.description}
        conditionDescription={item.conditionDescription}
        urlBase={this.props.urlBase}
        //quantity={this.props.listings.filter(itemListing => itemListing.sku === item.id)}
      />
      
    );

    _onRefresh = () => {      
      this.props.fetchLocations(this.props.urlBase + '/getlocations');
      this.props.fetchListings(this.props.urlBase + '/getlistingsdraft');

      this.props.listingCheckedUpdated("");

      if (this.state.filterListings.length > 0){

       try { 

        this.setState({
          toShelfListings: this.props.listings.map(item => { 
          
          return (
            {key: item.sku, id: item.sku, title: item.title, partNumber: item.partNumbers[0], partNumbers: item.partNumbers, 
              condition: conditionOptions.filter(itemCondition => itemCondition.id === item.condition)[0].value, 
              quantity: item.quantity, pictures: item.pictures, location: item.location, conditionDescription: item.conditionDescription,
              conditionId: item.condition}
          )
        
        
        }).filter(item => item.location.length === 0 && (item.title.toLowerCase().includes(this.state.filterListings.toLowerCase())
        || item.partNumber.toLowerCase().includes(this.state.filterListings.toLowerCase())) 
        )
        })

      } catch(error){
        console.log(error);
      }



      } else {
        this.setState({
          toShelfListings: [],
          //totalToShelf: this.props.listings.filter(item => item.location.length === 0).length,
        })
      }

        /*if (this.state.filterListings.length > 0){
          this.setState({
            toShelfListings: this.state.toShelfListings.filter(item => item.title.toLowerCase().includes(this.state.filterListings.toLowerCase())
            || item.partNumber.toLowerCase().includes(this.state.filterListings.toLowerCase())            
            )
          })
        } else {

          this.setState({
            toShelfListings: this.props.listings.map(item => { 
              return (
                {key: item.sku, id: item.sku, title: item.title, partNumber: item.partNumbers[0], pictures: item.pictures}
              )
            }),
          }) 

        }*/

      /*this.setState({
        toShelfListings: this.props.listings.map(item => { 
          return (
            {key: item.sku, id: item.sku, title: item.title, partNumber: item.partNumbers[0], pictures: item.pictures}
          )
        }),
      })*/


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

          this.setState({
            toShelfListings: this.props.listings.map(item => { 
            return (
              {key: item.sku, id: item.sku, title: item.title, partNumber: item.partNumbers[0], partNumbers: item.partNumbers,
                quantity: item.quantity, pictures: item.pictures, location: item.location, conditionDescription: item.conditionDescription,
                condition: conditionOptions.filter(itemCondition => itemCondition.id === item.condition)[0].value, conditionId: item.condition  }
            )
          }).filter(item => item.location.length === 0 && (item.title.toLowerCase().includes(this.state.filterListings.toLowerCase())
          || item.partNumber.toLowerCase().includes(this.state.filterListings.toLowerCase()))              
          )
          })

        } else {
          this.setState({
            toShelfListings: [],
          })
        }

      } catch(error){
        console.log(error);
        this.setState({
          toShelfListings: this.state.toShelfListings,
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

    refreshListings = () => {
      this.props.fetchListings(this.props.urlBase + '/getlistingsdraft');
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
        {title: 'Drafts', show: 'never'}, {title: 'Logout', show: 'never'}]}
        onActionSelected={this.onActionSelected} />
        <View style={styles.container}>
        
        {/* this.state.filterListings.length === 0 &&
        <View>
        <Text style={styles.text} >Products To Shelf</Text>
        <Text style={styles.text} >{this.props.listings.length} Listings</Text>
        </View>
        */}

        {/* this.state.filterListings.length > 0 &&
        <View>
        <Text style={styles.text} >Products To Shelf (Filtered)</Text>
        <Text style={styles.text} >{this.state.toShelfListings.length} Listings found</Text>
        </View>
        */}

        <Text style={styles.text} >Products To Shelf</Text>
        
        
        <TextInput
          
          /*onSubmitEditing={() => {
            this.focusNextField('partnumbers');
          }}*/
          style={styles.filterListings}
          placeholder="Search Listings to Shelf"
          onChangeText={(filterListings) => this.setState({filterListings})}
          autoCapitalize = "characters"
          maxLength={50}
          autoCorrect={false}
          value={this.state.filterListings}
          onEndEditing = {this._onEndEditingFilter}
        />
          {/*
            this.state.toShelfListings.map(item => {
              return (
                <MyListItem
                key={item.id}
                id={item.id}
                onPressItem={this._onPressItem}
                //selected={!!this.state.selected.get(item.id)}
                title={item.title}
                pictures={item.pictures}
                partNumber={item.partNumber}
                urlBase={this.props.urlBase}
                editLocation={this.editLocation}
                //extraData={{itemChecked: this.props.listingChecked}}
                itemChecked={this.props.listingChecked}
              />
              )
            })
          */
          }
        
          <FlatList
          ItemSeparatorComponent={this.renderSeparator}
        removeClippedSubviews={true}
        data={this.state.toShelfListings}
        renderItem={this._renderItem}
        extraData={{
          itemChecked: this.props.listingChecked,
          //listings: this.props.listings,
          //toShelfListings: this.state.toShelfListings,
        }}        
        //onRefresh={this.props.listingCheckedIsLoading}
        /*onRefresh={this._onRefresh}
        
        refreshing={this.props.listingCheckedIsLoading}*/
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
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ToShelf);
  
  //, MyListItem);