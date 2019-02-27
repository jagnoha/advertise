import React, { Component } from 'react';
import {Button, Image, StyleSheet, Text, TextInput, ActivityIndicator, View, ToolbarAndroid, ScrollView, Picker} from 'react-native';
import { locationsFetchData, listingsFetchData, brandsFetchData, 
       listingDraftUpdated, brandAddDatabase, locationAddDatabase, addNewLocation, 
       listingAddDatabase,userActiveLogout } from '../modules/actions';
const uuidv4 = require('uuid/v4');


  import { connect } from 'react-redux';
  import { Actions } from 'react-native-router-flux';
  
  import PartNumberList from './PartNumberList';
  import PicturesList from './PicturesList';
  import BrandList from './BrandList';
  import ConditionDescription from './ConditionDescription';
  import Spinner from 'react-native-loading-spinner-overlay';
  import ImagePicker from 'react-native-image-picker';
  //import { newBrand } from '../modules/reducers/newBrand';


  //import ImagePicker from 'react-native-image-picker';

  

class AddListing extends Component {

    state = {
        uploadingPicture: false,
        title: "",
        location: "",
        brand: "",
        brandId: "",
        locationId: "",
        quantity: "1",
        partNumber: "",
        partNumberList: [],
        pictures: [],
        picturesListTemp: [],
        upc: "",
        //brandList: [{id:"1",value:"FORD"},{id:"2",value:"FORD MOTORS"},{id:"3", value: "MOTORCRAFT"},{id:4, value: "GM"}],
        //brandList: this.props.brands.map(item => item),
        brandListFiltered: [],
        brandSelected: {},
        condition: "0",
        conditionDescriptionSelected: [],
        conditionDescription: [],
        customConditionDescription: "",
        sellInLots: "No",
        quantityLot: "",
        avatarSource : null,
        ebayAccount: "39d9cfd4-adb6-4a47-abf5-b8d2a18e1352",        
        //ebayAccount: this.props.ebayMarketplaces.filter(item => item.ebayUserId.includes('uaintl')),
    }

    inputs = {

    }

    validateFields = () => {
        if (Number(this.state.quantity) < 1){
            return false
        }

        if (!this.state.brand){
            return false
        }

        if (this.state.title.length <= 0){
            return false
        }


        if (this.state.partNumberList.length === 0){
            return false
        }        

        if (this.state.picturesListTemp.length === 0){
            return false
        }

        return true
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

    finishEditing = () => {
        const partNumber = this.state.partNumber;
        if (partNumber !== ''){
            this.setState({
                partNumberList: this.state.partNumberList.concat({id: uuidv4(), partNumber}),
                partNumber: "",
            })
        }            
    }

    changeBrand = (brand) => {

        //const brandListFiltered = this.props.brands.filter(item => item.value.includes(brand)).slice(0,5);
        //this.props.fetchCompatibilityManual(this.props.urlBase + 'websitefinder'+ this.state.brand.toUpperCase() + '/' + this.state.partNumberList[0]);

        
        const brandListFiltered = this.props.brands.filter(item => item.value.includes(brand)).slice(0,5);

        this.setState({brand, brandListFiltered});
    }

    deleteItem = (id) => {
        const list = this.state.partNumberList.filter(item => item.id !== id);
        this.setState({
            partNumberList: list,
        })

    }

    deletePicture = (id) => {
        const list = this.state.picturesListTemp.filter(item => item.id !== id);
        this.setState({
            picturesListTemp: list,
        })

    }

    showBrand = () => {
        return this.state.brand
    }

    selectBrand = (value, id) => {
        //this.props.fetchCompatibilityManual(this.props.urlBase + '/websitefinder'+ this.state.brand.toUpperCase() + '/' + this.state.partNumberList[0]);

        //const brandListFiltered = this.props.brands.filter(item => item.value.includes(value)).slice(0,5);
        this.setState({
            brand: value,
            brandId: id,
            brandListFiltered: [],
        })
    }

    /*finishEditingBrand = () => {
            
            const id = uuidv4();
            if (this.state.brandId === ""){
            
                this.setState({
                    brandListFiltered: [], 
                    brandId: id,
                })
            } else {
               this.setState({
                   brandListFiltered: [], 
               })
            }
    }*/

    onSelectConditionDescription = ( item ) => {
        this.setState({
            conditionDescriptionSelected: item,
            conditionDescription: item.filter(item => item.RNchecked === true).map((item,index) => {
                return (
                  item.label
                )
                })
        })
      };

      checkLot = (lotOption) => {
        if (lotOption === "Pair"){
            return " * Pair * ";
        } else if (lotOption !== "Pair" && lotOption !== "No"){
            //return " *" + lotOption + " " + this.state.quantityLot + "* ";  
            return " *" + this.state.quantityLot + " PCS* ";  
        }

        return " ";
    }


      onPressCreateListing = () => {


            //this.props.fetchCompatibilityManual(this.props.urlBase + 'websitefinder'+ this.state.brand.toUpperCase() + '/' + this.state.partNumberList[0]);

            
            const uuid = uuidv4();
            let tempBrand = '';
            
            //let brandSearch = this.props.brands.filter(item => item.value.toUpperCase() === this.state.brand.toUpperCase());

            let brandSearch = this.props.brands.filter(item => item.value.toUpperCase() === this.state.brand.toUpperCase());
            
            //let brandSearch = this.props.brands.filter(item => item.value.includes(brand));

            if (brandSearch.length === 0){
                tempBrand = uuidv4();
                this.props.brandAddDatabase(this.props.urlBase + '/addbrand/' + tempBrand + '/' + this.state.brand.toUpperCase(), tempBrand, this.state.brand);
            } else if (brandSearch.length > 0 && this.state.brandId === "") {
                tempBrand = brandSearch[0].id;
            } else {
                tempBrand = this.state.brandId;
            }
            

            /*if (this.props.brands.filter(item => item.value.toUpperCase() === this.state.brand.toUpperCase()).length === 0){
                tempBrand = uuidv4();
                this.props.brandAddDatabase(this.props.urlBase + '/addbrand/' + tempBrand + '/' + this.state.brand.toUpperCase(), tempBrand, this.state.brand);
            } else {
                tempBrand = this.state.brandId;
            }*/

            
            let tempLocation = '';

            if (this.state.location !== ""){

                if (this.props.locations.filter(item => item.value.toUpperCase() === this.state.location.toUpperCase()).length === 0){
                    tempLocation = uuidv4();
                    this.props.locationAddDatabase(this.props.urlBase + '/addlocation/' + tempLocation + '/' + this.state.location.toUpperCase(), tempLocation, this.state.location);
                } else {
                    tempLocation = this.props.locations.filter(item => item.value.toUpperCase() === this.state.location.toUpperCase())[0].id
                }

            } else {
                tempLocation = '';
            }

            
          
            const fields = {
                "sku": uuid,
                "uuid": uuid,
                "pictures": this.state.picturesListTemp.map(item => item.uri), 
                "quantity": this.state.quantity,
                "price": "",
                "title":  (this.checkLot(this.state.sellInLots) + this.state.brand + " " + this.state.title + " " + this.state.partNumberList[0].partNumber).trim(),
                "brand": tempBrand,
                "partNumbers": this.state.partNumberList.map(item => item.partNumber),
                "upc": this.state.upc,
                "bestOffer": false,
                "description": this.state.brand + this.checkLot(this.state.sellInLots) + " " + this.state.title + " " + this.state.partNumberList[0].partNumber,
                "condition": this.state.condition,
                "conditionDescription": this.state.condition !== '0' ? this.state.conditionDescription.map(item => item).concat(this.state.customConditionDescription) : [],
                "location": tempLocation === '' ? [] : [tempLocation],
                "freeShipping": true,
                "domestic": "0",
                "international": "0",
                "length": "8",
                "width": "8",
                "depth": "8",
                "weight": "8",
                "weightUnit": "oz",
                "category": {
                    "CategoryID": "33615",
                    "CategoryName": "eBay Motors:Parts & Accessories:Car & Truck Parts:Other Parts"
                },
                "lastModified": null,
                "ebayAccount": this.state.ebayAccount,
                "status": "offline",
                "authorId": this.props.userActive.id,
                "compatibilityUrl": "", //this.props.compatibilityManual[0] === undefined ? "" : this.props.compatibilityManual[0].Url,
                "compatibilityManual": [], //this.props.compatibilityManual.slice(1).map(item => item),
                "compatibilityEbayId": "",
                "hasCompatibility": false,
          }
          //this.props.listingDraftUpdated(fields);

          //encodeURIComponent(JSON.stringify(fields))

          this.props.listingAddDatabase(this.props.urlBase + '/createlisting/' + fields.sku + '/' + encodeURIComponent(JSON.stringify(fields)), fields);

          this.setState({
            title: "",
            location: "",
            brand: "",
            brandId: "",
            quantity: "1",
            partNumber: "",
            partNumberList: [],
            upc: "",
            //brandList: [{id:"1",value:"FORD"},{id:"2",value:"FORD MOTORS"},{id:"3", value: "MOTORCRAFT"},{id:4, value: "GM"}],
            //brandList: this.props.brands,
            brandListFiltered: [],
            brandSelected: {},
            condition: "0",
            conditionDescriptionSelected: [],
            conditionDescription: [],
            sellInLots: "No",
            quantityLot: "",
            ebayAccount: "39d9cfd4-adb6-4a47-abf5-b8d2a18e1352",
            picturesListTemp: [],
            customConditionDescription: "",
            //avatarSource: null,                    
        })

      }

      onPressResetForm = () => {
        
        const fields = {
            "sku": "",
            "uuid": "",
            "pictures": [],
            "quantity": "1",
            "price": "",
            "title": "",
            "brand": "",
            "partNumbers": [],
            "upc": "",
            "bestOffer": false,
            "description": "",
            "condition": "0",
            "conditionDescription": [],
            "location": [],
            "freeShipping": true,
            "domestic": "0",
            "international": "0",
            "length": "8",
            "width": "8",
            "depth": "8",
            "weight": "8",
            "weightUnit": "oz",
            "category": {
                "CategoryID": "33615",
                "CategoryName": "eBay Motors:Parts & Accessories:Car & Truck Parts:Other Parts"
            },
            "lastModified": null,
            "ebayAccount": "39d9cfd4-adb6-4a47-abf5-b8d2a18e1352",
            "status": "offline",
            "authorId": this.props.userActive.id,
            "compatibilityUrl": "",
            "compatibilityManual": [],
            "compatibilityEbayId": "",
            "hasCompatibility": false,
      }
      this.props.listingDraftUpdated(fields);
      this.props.addNewLocation({"id":"", "value":""});
        
        
        this.setState({
                title: "",
                location: "",
                brand: "",
                brandId: "",
                quantity: "1",
                partNumber: "",
                partNumberList: [],
                upc: "",
                //brandList: [{id:"1",value:"FORD"},{id:"2",value:"FORD MOTORS"},{id:"3", value: "MOTORCRAFT"},{id:4, value: "GM"}],
                //brandList: this.props.brands,
                brandListFiltered: [],
                brandSelected: {},
                condition: "0",
                conditionDescriptionSelected: null,
                conditionDescription: [],
                sellInLots: "No",
                quantityLot: "",
                ebayAccount: "39d9cfd4-adb6-4a47-abf5-b8d2a18e1352",
                //avatarSource: null,
                picturesListTemp: [],
                customConditionDescription: "",        
          })
    }

      

      focusNextField = (key) => {
          this.inputs[key].focus();
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
                  let idPic = uuidv4();
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
        //const testing1 = this.props.brands;

     if (this.props.listingDraftIsLoading === false){

      return (
        <ScrollView>
        
        <ToolbarAndroid
        style={styles.toolbar}
        //logo={require('./app_logo.png')}
        title="AdvertisingApp"
        actions={[{title: 'Advertise', show: 'never'}, {title: 'To Shelf', show: 'never'}, 
        {title: 'Drafts', show: 'never'}, {title: 'Locations', show: 'never'}, {title: 'Logout', show: 'never'}]}
        onActionSelected={this.onActionSelected} />
        
        
        
        { this.state.picturesListTemp.length > 0 ? <View style={styles.placeholder}><PicturesList deletePicture = {this.deletePicture} pictures={this.state.picturesListTemp} />
        </View> : <Text></Text>}
        
        { this.state.uploadingPicture === false ?
        <Button
            onPress={this.pickImageHandler}
            title="Add Picture"
            color="#0099cc"
            accessibilityLabel="Add Picture"
        /> : <View><ActivityIndicator size="large" color="#0000ff" /></View>
        }
        

























        {this.state.location.length > 0 ? <Text style={styles.text} >Location</Text> : <Text></Text>}
        
        <TextInput
          ref={ input => {
            this.inputs['location'] = input;
          }}
          onSubmitEditing={() => {
            this.focusNextField('partnumbers');
          }}
          style={styles.titleInput}
          placeholder="Enter Location"
          onChangeText={(location) => this.setState({location})}
          autoCapitalize = "characters"
          maxLength={30}
          autoCorrect={false}
          value={this.state.location}
        />
        

        

        <Text style={styles.text}>Part Numbers</Text>
        
        <TextInput
          ref={ input => {
            this.inputs['partnumbers'] = input;
          }}
          value={this.state.partNumber}
          style={styles.titleInput}
          placeholder="Add Part Number"
          onChangeText={(partNumber) => this.setState({partNumber})}
          autoCapitalize = "characters"
          onEndEditing = {this.finishEditing}
          maxLength={30}
          autoCorrect={false}
          onSubmitEditing={() => {
            this.focusNextField('brand');
          }}
        />
        
        <PartNumberList deleteItem = {this.deleteItem} partNumbers = {this.state.partNumberList} />

        {/*this.state.brand.length > 0 ? <Text style={styles.text} >Brand</Text> : <Text></Text>*/}

        <Text style={styles.text} >Brand</Text>

        <TextInput
          ref={ input => {
            this.inputs['brand'] = input;
          }}
          style={styles.titleInput}
          placeholder="Enter Brand"
          onChangeText={this.changeBrand}         
          autoCapitalize = "characters"
          maxLength={30}
          autoCorrect={false}
          value={this.showBrand()}
          onSubmitEditing={() => {
            this.focusNextField('title');
          }}
          
          //onEndEditing = {this.finishEditingBrand}
        />

        <BrandList brandListFiltered = {this.state.brandListFiltered} selectBrand = {this.selectBrand} />

        

       <Text style={styles.text}>Sell in Lots?</Text>
        <Picker
            style={styles.text}
            prompt="Sell in lots"
            //mode="dropdown"
            selectedValue={this.state.sellInLots}
            //style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({sellInLots: itemValue})}>
            <Picker.Item label="No" value= "No" />
            <Picker.Item label="Lot of" value= "PCS" />                        
        </Picker>
        {this.state.sellInLots !== 'No' ? 
            <TextInput
            style={styles.titleInput}
            placeholder="Enter Quantity Lot"
            onChangeText={(quantityLot) => this.setState({quantityLot})}
            maxLength={10}
            autoCorrect={false}
            keyboardType="numeric"
          /> :
            <Text></Text>
        }


        

        
        
        {this.state.title.length > 0 ? <Text style={styles.text} >Title</Text> : <Text></Text>}

        <TextInput
          ref={ input => {
            this.inputs['title'] = input;
          }}
          value={this.state.title}
          /*onSubmitEditing={() => {
            this.focusNextField('quantity');
          }}*/
          style={styles.titleInput}
          placeholder="Enter Title"
          onChangeText={(title) => this.setState({title})}
          maxLength={40}
          autoCorrect={false}
        />

        {this.state.quantity.length > 0 ? <Text style={styles.text} >Quantity</Text> : <Text></Text>}

        <TextInput
          style={styles.titleInput}
          ref={ input => {
            this.inputs['quantity'] = input;
          }}
          placeholder="Enter Quantity"
          onChangeText={(quantity) => this.setState({quantity})}
          maxLength={10}
          autoCorrect={false}
          keyboardType="numeric"
          value={this.state.quantity}
        />
        

        
        <Text style={styles.text}>Condition</Text>
        <Picker
            style={styles.text}
            prompt="Select Condition"
            //mode="dropdown"
            selectedValue={this.state.condition}
            //style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({condition: itemValue})}>
            <Picker.Item label="New" value= "0" />
            <Picker.Item label="New (Other)" value="1" />
            <Picker.Item label="Used" value="2" />
            <Picker.Item label="Manufacturer refurbished" value="3" />
            <Picker.Item label="For parts or not working" value="4" />
            
        </Picker>


        {this.state.condition === '1' ? 
            <View>
            <ConditionDescription 
                conditionDescription={this.state.conditionDescriptionSelected} 
                onSelectConditionDescription = {this.onSelectConditionDescription}/> 
                
                <TextInput
                    style={styles.titleInput}
                    /*ref={ input => {
                        this.inputs['quantity'] = input;
                    }}*/
                    placeholder="Write Condition description"
                    onChangeText={(customConditionDescription) => this.setState({customConditionDescription})}
                    maxLength={60}
                    autoCorrect={false}
                    //keyboardType="numeric"
                    //value={this.state.conditionDescription}
                    />
                </View>
                
                :
            
            
            
            Number(this.state.condition) > 1 ?
                <TextInput
                    style={styles.titleInput}
                    /*ref={ input => {
                        this.inputs['quantity'] = input;
                    }}*/
                    placeholder="Write Condition description"
                    onChangeText={(customConditionDescription) => this.setState({customConditionDescription})}
                    maxLength={60}
                    autoCorrect={false}
                    //keyboardType="numeric"
                    //value={this.state.conditionDescription}
                    />   :
                    null
        }

        {this.state.title.length > 0 ? <Text style={styles.text} >UPC</Text> : <Text></Text>}

        <TextInput
            ref={ input => {
            this.inputs['upc'] = input;
            }}
            value={this.state.upc}
            onSubmitEditing={() => {
                this.focusNextField('title');
            }}
            style={styles.titleInput}
            placeholder="Enter UPC"
            onChangeText={(upc) => this.setState({upc})}
            maxLength={50}
            autoCorrect={false}
        />


        <Text style={styles.text}>Ebay Account</Text>
        <Picker
            style={styles.text}
            prompt="Select Ebay Account"
            //mode="dropdown"
            selectedValue={this.state.ebayAccount}
            //style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({ebayAccount: itemValue})}>
            {
                this.props.ebayMarketplaces.map(item => {
                    return (
                        <Picker.Item key = {item.id} label={item.ebayUserId} value = {item.id} />
                    )
                })
            }
        </Picker>


        
        {
            this.validateFields() ?
        <Button
            onPress={this.onPressCreateListing}
            title="Create Listing"
            color="#00cc66"
            accessibilityLabel="Create a new Listing"
        /> : <Text></Text>
        } 

        

        
        

        

        
        
        </ScrollView>
      
      ) } else {
          return (
            
                
                  <View style={styles.container}>
                       <Text>Saving...</Text>
                  </View>
                
              




          )
      }
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
        users: state.users,
        brands: state.brands,
        locations: state.locations,
        listingDraft: state.listingDraft,
        ebayMarketplaces: state.ebayMarketplaces,
        urlBase: state.urlBase,
        newLocation: state.newLocation,
        listingDraftHasErrored: state.listingDraftHasErrored,
        listingDraftIsLoading: state.listingDraftIsLoading,
        userActive: state.userActive,
        
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocations: (url) => dispatch(locationsFetchData(url)),
        fetchListings: (url) => dispatch(listingsFetchData(url)),
        fetchBrands: (url) => dispatch(brandsFetchData(url)),
        listingDraftUpdated: (listingDraft) => dispatch(listingDraftUpdated(listingDraft)),
        listingAddDatabase: (url, listingDraft) => dispatch(listingAddDatabase(url, listingDraft)),
        brandAddDatabase: (url, id, value) => dispatch(brandAddDatabase(url, id, value)),
        locationAddDatabase: (url, id, value) => dispatch(locationAddDatabase(url, id, value)),
        addNewLocation: (newLocation) => dispatch(addNewLocation(newLocation)),
        userActiveLogout: () => dispatch(userActiveLogout()),
        //fetchCompatibilityManual: (url) => dispatch(compatibilityManualFetchData(url)),

        
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(AddListing);


