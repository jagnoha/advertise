import React, {Component} from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { locationsFetchData, listingsFetchData, brandsFetchData, ebayMarketplacesFetchData,compatibilityManualFetchData } from '../modules/actions';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AddListing from './AddListing';
import Spinner from 'react-native-loading-spinner-overlay';



//import './helpers.js';
//const urlbase = 'http://10.0.0.216:8083';


  
  class MainApp extends Component {

    /*state = {
        isLogin: true,
        
    }*/

    componentDidMount(){

        


        //this.props.fetchLocations('http://192.168.1.11:8083/getlocations');
        //this.props.fetchBrands('http://192.168.1.11:8083/getbrands');
        this.props.fetchBrands(this.props.urlBase + '/getbrands');
        this.props.fetchLocations(this.props.urlBase + '/getlocations');
        this.props.fetchEbayMarketplaces(this.props.urlBase + '/getebaymarketplaces');
        this.props.fetchListings(this.props.urlBase + '/getlistings');
        //this.props.fetchCompatibilityManual(this.props.urlBase + '/websitefinder/FORD/7L3Z-14D696-A');

        
        //this.props.fetchEbayMarketplaces('http://192.168.1.11:8083/getebaymarketplaces');
        //this.props.fetchListings('http://192.168.1.11:8083/getlistings', this.props.clickedColumn, this.props.direction === 'ascending' ? 'asc' : 'desc' );
        
        setInterval(this.loadInformationFromServer, 60000);
      }

      loadInformationFromServer = () => {
        //const state = store.getState();
      
        //window.client.getListingsFromDB(store, state.globalDirection, state.globalColumn);
        //this.props.fetchLocations('http://192.168.1.11:8083/getlocations');
        //this.props.fetchBrands('http://192.168.1.11:8083/getbrands');
        this.props.fetchBrands(this.props.urlBase + '/getbrands');
        this.props.fetchLocations(this.props.urlBase + '/getlocations');
        this.props.fetchEbayMarketplaces(this.props.urlBase + '/getebaymarketplaces');
        //this.props.fetchListings(urlbase + '/getlistings');
        
        //this.props.fetchEbayMarketplaces('http://192.168.1.11:8083/getebaymarketplaces');
        //this.props.fetchListings('http://192.168.1.11:8083/getlistings', this.props.clickedColumn, this.props.direction === 'ascending' ? 'asc' : 'desc' );
      }

      /*changeLogin = () => {
        this.setState({
          isLogin: this.state.isLogin ? false : true,
        })
      }*/

      

    render() {

      /*if (this.props.listingsIsLoading === true){
        return (
          <View style={styles.container}>
               <Text>Loading...</Text>
          </View>
        )
      }*/ 
        

      if (this.props.userActive !== ""){
            return (
              
              
              <AddListing />
              
            )
          } else {
            return (
                <LoginForm />
            )
          }
      
    }
  }

  const styles = StyleSheet.create({
    
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
      },
  
  });

  

  const mapStateToProps = (state) => {
    return {
        /*locations: state.locations,
        hasErroredLocations: state.locationsHasErrored,
        isLoadingLocations: state.locationsIsLoading,
        listings: state.listings,
        hasErroredListings: state.listingsHasErrored,
        isLoadingListings: state.listingsIsLoading,
        brands: state.brands,
        hasErroredBrands: state.brandsHasErrored,
        isLoadingBrands: state.brandsIsLoading,
        ebayMarketplaces: state.ebayMarketplaces,
        hasErroredEbayMarketplaces: state.ebayMarketplacesHasErrored,
        isLoadingEbayMarketplaces: state.ebayMarketplacesIsLoading,*/
        //activePage: state.activePage,
        listings: state.listings,        
        direction: state.direction,
        users: state.users,
        clickedColumn: state.clickedColumn,
        brands: state.brands,
        urlBase: state.urlBase,
        userActive: state.userActive, 
        listingsIsLoading: state.listingsIsLoading,
              
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocations: (url) => dispatch(locationsFetchData(url)),
        fetchListings: (url, clickedColumn, order) => dispatch(listingsFetchData(url, clickedColumn, order)),
        fetchBrands: (url) => dispatch(brandsFetchData(url)),
        fetchEbayMarketplaces: (url) => dispatch(ebayMarketplacesFetchData(url)),
        //fetchCompatibilityManual: (url) => dispatch(compatibilityManualFetchData(url)),

    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
  //export default App;
  //export default connect(mapStateToProps)(ProfileContainer);
  