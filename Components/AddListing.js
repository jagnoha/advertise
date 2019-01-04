import React, { Component } from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View, ToolbarAndroid, ScrollView, Picker} from 'react-native';
import { locationsFetchData, listingsFetchData, brandsFetchData, 
       listingDraftUpdated, brandAddDatabase } from '../modules/actions';
const uuidv4 = require('uuid/v4');


  import { connect } from 'react-redux';
  import { Actions } from 'react-native-router-flux';
  
  import PartNumberList from './PartNumberList';
  import BrandList from './BrandList';
  import ConditionDescription from './ConditionDescription';
import { newBrand } from '../modules/reducers/newBrand';


  //import ImagePicker from 'react-native-image-picker';

  

class AddListing extends Component {

    state = {
        title: "",
        location: "",
        brand: "",
        brandId: "",
        quantity: "1",
        partNumber: "",
        partNumberList: [],
        //brandList: [{id:"1",value:"FORD"},{id:"2",value:"FORD MOTORS"},{id:"3", value: "MOTORCRAFT"},{id:4, value: "GM"}],
        //brandList: this.props.brands.map(item => item),
        brandListFiltered: [],
        brandSelected: {},
        condition: "0",
        conditionDescriptionSelected: [],
        conditionDescription: [],
        sellInLots: "No",
        quantityLot: "",
        avatarSource : null,
        ebayAccount: "39d9cfd4-adb6-4a47-abf5-b8d2a18e1352",        
        //ebayAccount: this.props.ebayMarketplaces.filter(item => item.ebayUserId.includes('uaintl')),
    }

    inputs = {

    }

    onActionSelected = (position) => {
        if (position === 0) {
            Actions.home()           

        }
        if (position === 1) {
            Actions.toShelf()           

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
        
        const brandListFiltered = this.props.brands.filter(item => item.value.includes(brand)).slice(0,5);

        this.setState({brand, brandListFiltered});
    }

    deleteItem = (id) => {
        const list = this.state.partNumberList.filter(item => item.id !== id);
        this.setState({
            partNumberList: list,
        })

    }

    showBrand = () => {
        return this.state.brand
    }

    selectBrand = (value, id) => {
        
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

      onPressCreateListing = () => {
            const uuid = uuidv4();
            //const idBrand = uuidv4();
            let tempBrand = '';

            if (this.props.brands.filter(item => item.value.toUpperCase() === this.state.brand.toUpperCase()).length === 0){
                tempBrand = uuidv4();
                this.props.brandAddDatabase(this.props.urlBase + '/addbrand/' + tempBrand + '/' + this.state.brand.toUpperCase(), tempBrand, this.state.brand);
            } else {
                tempBrand = this.state.brandId;
            }

            const fields = {
                "sku": uuid,
                "uuid": uuid,
                "pictures": [],
                "quantity": this.state.quantity,
                "price": "",
                "title": this.state.title,
                "brand": tempBrand,
                "partNumbers": this.state.partNumber,
                "bestOffer": true,
                "description": this.state.title,
                "condition": this.state.condition,
                "conditionDescription": this.state.conditionDescription,
                "location": "",
                "freeShipping": true,
                "domestic": "0",
                "international": "0",
                "length": "8",
                "width": "8",
                "depth": "8",
                "weight": "8",
                "weightUnit": "oz",
                "category": null,
                "lastModified": null,
                "ebayAccount": this.state.ebayAccount,
                "status": "offline",
          }
          this.props.listingDraftUpdated(fields);
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
            "bestOffer": true,
            "description": "",
            "condition": "0",
            "conditionDescription": [],
            "location": "",
            "freeShipping": true,
            "domestic": "0",
            "international": "0",
            "length": "8",
            "width": "8",
            "depth": "8",
            "weight": "8",
            "weightUnit": "oz",
            "category": null,
            "lastModified": null,
            "ebayAccount": "39d9cfd4-adb6-4a47-abf5-b8d2a18e1352",
            "status": "offline",
      }
      this.props.listingDraftUpdated(fields);
        
        
        this.setState({
                title: "",
                location: "",
                brand: "",
                brandId: "",
                quantity: "1",
                partNumber: "",
                partNumberList: [],
                //brandList: [{id:"1",value:"FORD"},{id:"2",value:"FORD MOTORS"},{id:"3", value: "MOTORCRAFT"},{id:4, value: "GM"}],
                //brandList: this.props.brands,
                brandListFiltered: [],
                brandSelected: {},
                condition: "0",
                conditionDescriptionSelected: [],
                conditionDescription: [],
                sellInLots: "No",
                quantityLot: "",
                ebayAccount: "39d9cfd4-adb6-4a47-abf5-b8d2a18e1352"        
          })
    }

      

      focusNextField = (key) => {
          this.inputs[key].focus();
      }

      /*pickImageHandler = () => {

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
            
                this.setState({
                  avatarSource: source,
                });
            }

        });
      }*/
    
    render() {
        //const testing1 = this.props.brands;
      return (
        <ScrollView>
        
        <ToolbarAndroid
        style={styles.toolbar}
        //logo={require('./app_logo.png')}
        title="AdvertisingApp"
        actions={[{title: 'Advertise', show: 'never'}, {title: 'To Shelf', show: 'never'}]}
        onActionSelected={this.onActionSelected} />
        
        


        {this.state.location.length > 0 ? <Text style={styles.text} >Location</Text> : <Text></Text>}
        
        <TextInput
          ref={ input => {
            this.inputs['location'] = input;
          }}
          onSubmitEditing={() => {
            this.focusNextField('brand');
          }}
          style={styles.titleInput}
          placeholder="Enter Location"
          onChangeText={(location) => this.setState({location})}
          autoCapitalize = "characters"
          maxLength={30}
          autoCorrect={false}
        />
        

        {this.state.brand.length > 0 ? <Text style={styles.text} >Brand</Text> : <Text></Text>}

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
            this.focusNextField('partnumbers');
          }}
          //onEndEditing = {this.finishEditingBrand}
        />

        <BrandList brandListFiltered = {this.state.brandListFiltered} selectBrand = {this.selectBrand} />

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
        />
        
        <PartNumberList deleteItem = {this.deleteItem} partNumbers = {this.state.partNumberList} />
        
        {this.state.title.length > 0 ? <Text style={styles.text} >Title</Text> : <Text></Text>}

        <TextInput
          ref={ input => {
            this.inputs['title'] = input;
          }}
          value={this.state.title}
          onSubmitEditing={() => {
            this.focusNextField('quantity');
          }}
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
        <Text style={styles.text}>Sell in Lots?</Text>
        <Picker
            style={styles.text}
            prompt="Sell in lots"
            //mode="dropdown"
            selectedValue={this.state.sellInLots}
            //style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({sellInLots: itemValue})}>
            <Picker.Item label="No" value= "No" />
            <Picker.Item label="Pair" value= "Pair" />
            <Picker.Item label="Lot of" value="Lot of" />
            <Picker.Item label="Set of" value="Set of" />
            <Picker.Item label="Package of" value="Package of" />            
        </Picker>
        {this.state.sellInLots !== 'No' && this.state.sellInLots !== 'Pair' ? 
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
        {this.state.condition !== '0' ? 
            <ConditionDescription 
                conditionDescription={this.state.conditionDescriptionSelected} 
                onSelectConditionDescription = {this.onSelectConditionDescription}/> :
            <Text></Text>
        }
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


          
        <Button
            onPress={this.onPressCreateListing}
            title="Create Listing"
            color="#00cc66"
            accessibilityLabel="Create a new Listing"
        />

        <Button
            onPress={this.onPressResetForm}
            title="Reset"
            color="#0099cc"
            accessibilityLabel="Reset Form"
        />
        

        

        
        
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
        width: "70%",
        height: 280,
        marginTop:50,
      },
  
  });

  //export default LoginForm;

  const mapStateToProps = (state) => {
    return {
        users: state.users,
        brands: state.brands,
        listingDraft: state.listingDraft,
        ebayMarketplaces: state.ebayMarketplaces,
        urlBase: state.urlBase,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocations: (url) => dispatch(locationsFetchData(url)),
        fetchListings: (url) => dispatch(listingsFetchData(url)),
        fetchBrands: (url) => dispatch(brandsFetchData(url)),
        listingDraftUpdated: (listingDraft) => dispatch(listingDraftUpdated(listingDraft)),
        brandAddDatabase: (url, id, value) => dispatch(brandAddDatabase(url, id, value)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(AddListing);