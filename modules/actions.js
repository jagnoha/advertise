import axios from 'axios';
import _ from 'lodash';
import '../helpers.js';


export function locationsHasErrored(bool){
    return {
        type: 'LOCATIONS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function locationsIsLoading(bool){
    return {
        type: 'LOCATIONS_IS_LOADING',
        isLoading: bool
    };
}

export function locationsFetchDataSuccess(locations) {
    return {
        type: 'LOCATIONS_FETCH_DATA_SUCCESS',
        locations
    };
}

export function listingDraftUpdated(listingDraft) {
    return {
        type: 'LISTING_DRAFT_UPDATED',
        listingDraft
    };
}

export function userActiveLogout() {
    return (dispatch) => {
        dispatch({type: 'RESET'})
    }
}

export function userActiveHasErrored(bool){
    return {
        type: 'USER_ACTIVE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function userActiveIsLoading(bool){
    return {
        type: 'USER_ACTIVE_IS_LOADING',
        isLoading: bool
    };
}

export function userActiveFetchDataSuccess(userActive) {
    return {
        type: 'USER_ACTIVE_FETCH_DATA_SUCCESS',
        userActive
    };
}

export function userActiveFetchData(url) {
    return (dispatch) => {
        dispatch(userActiveIsLoading(true));

        fetch(url,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                //'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            
            
            dispatch(userActiveIsLoading(false));
            
            return response.json()

        })
        .then((userActive) => dispatch(userActiveFetchDataSuccess(userActive)))
        .catch(() => dispatch(userActiveHasErrored(true)));
    }
}

//************************************** 

/*return (dispatch) => {
    dispatch(locationsIsLoading(true))
    fetch(url,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        
        dispatch(locationsIsLoading(false));
        
        return response.json()
    
    })    
    .then((locations) => dispatch(locationsFetchDataSuccess(locations)))
    .catch((error) => {
      console.error(error);
    });
  }*/



//**************************************

export function listingDraftHasErrored(bool){
    return {
        type: 'LISTING_DRAFT_HAS_ERRORED',
        hasErrored: bool
    };
}

export function listingDraftIsLoading(bool){
    return {
        type: 'LISTING_DRAFT_IS_LOADING',
        isLoading: bool
    };
}



export function listingAddDatabase(url, listingDraft) {
    return (dispatch) => {
    dispatch(listingDraftIsLoading(true))    
    fetch(url,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
        }
    })
    .then((response) => {

        dispatch(listingDraftIsLoading(false));
        dispatch(listingDraftUpdated(listingDraft));

        return response
    
    }).catch((error) => {
      console.error(error);
    });
  }

}


export function brandAddDatabase(url, id, value) {
    return (dispatch) => {
    fetch(url,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        
        dispatch(addNewBrand({id, value}));
        
        return response
    
    }).catch((error) => {
      console.error(error);
    });
  }

}


export function addNewBrand(newBrand) {
    return {
        type: 'ADD_NEW_BRAND',
        newBrand
    };
}

export function locationAddDatabase(url, id, value) {
    return (dispatch) => {
    fetch(url,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        
        dispatch(addNewLocation({id, value}));
        
        return response
    
    }).catch((error) => {
      console.error(error);
    });
  }

}


export function addNewLocation(newLocation) {
    return {
        type: 'ADD_NEW_LOCATION',
        newLocation
    };
}

/*export function locationsFetchData(url) {
    return (dispatch) => {
        dispatch(locationsIsLoading(true));

        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get(url, config)
        .then(response => {
            
            if (response.statusText !== "OK"){
                throw Error(response.statusText);
            }

            dispatch(locationsIsLoading(false));
            
            return response.data

        })
        .then((locations) => dispatch(locationsFetchDataSuccess(locations)))
        .catch(() => dispatch(locationsHasErrored(true)));
    }
}*/

export function compatibilityManualHasErrored(bool){
    return {
        type: 'COMPATIBILITY_MANUAL_HAS_ERRORED',
        hasErrored: bool
    };
}

export function compatibilityManualIsLoading(bool){
    return {
        type: 'COMPATIBILITY_MANUAL_IS_LOADING',
        isLoading: bool
    };
}

export function compatibilityManualFetchDataSuccess(locations) {
    return {
        type: 'COMPATIBILITY_MANUAL_FETCH_DATA_SUCCESS',
        locations
    };
}



export function compatibilityManualFetchData(url) {

    return (dispatch) => {
        dispatch(compatibilityManualIsLoading(true))
        fetch(url,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            
            dispatch(compatibilityManualIsLoading(false));
            
            return response.json()
        
        })    
        .then((compatibilityManual) => dispatch(compatibilityManualFetchDataSuccess(compatibilityManual)))
        .catch((error) => {
          console.error(error);
        });
      }
    
}



export function locationsFetchData(url) {

    return (dispatch) => {
        dispatch(locationsIsLoading(true))
        fetch(url,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            
            dispatch(locationsIsLoading(false));
            
            return response.json()
        
        })    
        .then((locations) => dispatch(locationsFetchDataSuccess(locations)))
        .catch((error) => {
          console.error(error);
        });
      }
    
}

export function listingsHasErrored(bool){
    return {
        type: 'LISTINGS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function listingsIsLoading(bool){
    return {
        type: 'LISTINGS_IS_LOADING',
        isLoading: bool
    };
}

export function listingsFetchDataSuccess(listings, clickedColumn, order) {
    return {
        type: 'LISTINGS_FETCH_DATA_SUCCESS',
        listings: _.orderBy(listings, (item => {
            if (clickedColumn === 'price'){  
                return parseFloat(item[clickedColumn]);
            } else {
                return item[clickedColumn];
            }
        }),[order])
    };
}

export function sortListings(listings, clickedColumn, order) {
    
    let newListings = _.orderBy(listings, (item => {
        if (clickedColumn === 'price'){  
            return parseFloat(item[clickedColumn]);
        } else {
            return item[clickedColumn];
        }
    }),[order])
    
    return {
        type: 'SORT_LISTINGS',
        listings: newListings
    };
}

/*export function filterListings(listings, condition) {
    
    
    let newListings = [];

    if (condition !== 'ALL'){
        newListings = listings.filter(item => item.condition === condition)
      } else {
        newListings = return list;
      }
    }



    
    return {
        type: 'FILTER_LISTINGS',
        listings: newListings
    };
}*/

export function changeFilterByCondition(condition) {
    return {
        type: 'FILTER_BY_CONDITION',
        filterByCondition: condition,
    };
}

export function changeFilterByStatus(status) {
    return {
        type: 'FILTER_BY_STATUS',
        filterByStatus: status,
    };
}

export function changeFilterByMarketplace(marketplace) {
    return {
        type: 'FILTER_BY_MARKETPLACE',
        filterByMarketplace: marketplace,
    };
}

export function changeFilterByUser(user) {
    return {
        type: 'FILTER_BY_USER',
        filterByUser: user,
    };
}


/*export function listingsFetchData(url, clickedColumn, order) {
    return (dispatch) => {
        dispatch(listingsIsLoading(true));

        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get(url, config)
        .then(response => {
            
            if (response.statusText !== "OK"){
                throw Error(response.statusText);
            }

            dispatch(listingsIsLoading(false));
            
            return response.data

        })
        .then((listings) => dispatch(listingsFetchDataSuccess(listings, clickedColumn, order)))
        .catch(() => dispatch(listingsHasErrored(true)));
    }
}*/

export function listingsFetchData(url, clickedColumn, order) {

    return (dispatch) => {
        dispatch(listingsIsLoading(true))
        fetch(url,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            
            dispatch(listingsIsLoading(false));
            
            return response.json()
        
        })    
        .then((listings) => dispatch(listingsFetchDataSuccess(listings)))
        .catch((error) => {
          console.error(error);
        });
      }

    
}

export function brandsHasErrored(bool){
    return {
        type: 'BRANDS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function brandsIsLoading(bool){
    return {
        type: 'BRANDS_IS_LOADING',
        isLoading: bool
    };
}

export function brandsFetchDataSuccess(brands) {
    return {
        type: 'BRANDS_FETCH_DATA_SUCCESS',
        brands
    };
}

/*export function brandsFetchData(url) {
    return (dispatch) => {
        dispatch(brandsIsLoading(true));

        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',                
            }
        }
        axios.get(url, config)
        .then(response => {
            
            if (response.statusText !== "OK"){
                throw Error(response.statusText);
            }

            dispatch(brandsIsLoading(false));
            
            return response.data

        })
        .then((brands) => dispatch(brandsFetchDataSuccess(brands)))
        .catch(() => dispatch(brandsHasErrored(true)));
    }
}*/

export function brandsFetchData(url) {
    return (dispatch) => {
    dispatch(brandsIsLoading(true))
    fetch(url,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        
        dispatch(brandsIsLoading(false));
        
        return response.json()
    
    })    
    .then((brands) => dispatch(brandsFetchDataSuccess(brands)))
    .catch((error) => {
      console.error(error);
    });
  }

}



export function ebayMarketplacesHasErrored(bool){
    return {
        type: 'EBAY_MARKETPLACES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function ebayMarketplacesIsLoading(bool){
    return {
        type: 'EBAY_MARKETPLACES_IS_LOADING',
        isLoading: bool
    };
}

export function ebayMarketplacesFetchDataSuccess(ebayMarketplaces) {
    return {
        type: 'EBAY_MARKETPLACES_FETCH_DATA_SUCCESS',
        ebayMarketplaces
    };
}

/*export function ebayMarketplacesFetchData(url) {
    return (dispatch) => {
        dispatch(ebayMarketplacesIsLoading(true));

        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get(url, config)
        .then(response => {
            
            if (response.statusText !== "OK"){
                throw Error(response.statusText);
            }

            dispatch(ebayMarketplacesIsLoading(false));
            
            return response.data

        })
        .then((brands) => dispatch(ebayMarketplacesFetchDataSuccess(brands)))
        .catch(() => dispatch(ebayMarketplacesHasErrored(true)));
    }
}*/

export function ebayMarketplacesFetchData(url) {

    return (dispatch) => {
        dispatch(ebayMarketplacesIsLoading(true))
        fetch(url,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            
            dispatch(ebayMarketplacesIsLoading(false));
            
            return response.json()
        
        })    
        .then((ebayMarketplaces) => dispatch(ebayMarketplacesFetchDataSuccess(ebayMarketplaces)))
        .catch((error) => {
          console.error(error);
        });
      }    
}

export function changeActivePage(activePage){
    return {
        type: 'CHANGE_ACTIVE_PAGE',
        activePage
    };
}

export function changeProductsByPage(productsByPage){
    
       return {
            type: 'CHANGE_PRODUCTS_BY_PAGE',
            productsByPage
       };
    
}

export function clickOnColumn(clickedColumn){
    
    return {
         type: 'CLICK_ON_COLUMN',
         clickedColumn
    }; 
}

export function changeDirection(direction){
    
    return {
         type: 'CHANGE_DIRECTION',
         direction: direction === 'ascending' ? 'descending' : 'ascending', 
    }; 
}

export function changeFilterBySearch(valueSearch){
    
    return {
         type: 'FILTER_BY_SEARCH',
         filterBySearch: valueSearch,
    }; 
}

export function changeSearchIsChecked(bool){
    
    return {
         type: 'SEARCH_IS_CHECKED',
         searchIsChecked: bool,
    }; 
}

export function changeListingsFiltered(quantity){
    
    return {
         type: 'LISTINGS_FILTERED',
         listingsFiltered: quantity,
    }; 
}

export function changeProductsSelected(list){
    
    return {
         type: 'PRODUCTS_SELECTED',
         productsSelected: list,
    }; 
}

export function changeProductsInPage(list){
    
    return {
         type: 'PRODUCTS_IN_PAGE',
         productsInPage: list,
    }; 
}

export function changePicturesHasErrored(list){
    return {
        type: 'PICTURES_HAS_ERRORED',
        picturesHasErrored: list
    };
}

export function changePicturesIsLoading(list){
    return {
        type: 'PICTURES_IS_LOADING',
        picturesIsLoading: list,
    };
}

export function fixPicturesListing(list, allListings) {
    
    return (dispatch) => {

    let loadingList = list;
    let errorList = [];

    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }

    for (const item of loadingList){

        let sku = window.helpers.getListingFromId(allListings, item).sku;
        console.log(sku);
        
        let url = "http://192.168.1.11:8083/fixpictures/" + sku; 
        
        axios.get(url, config)
        .then(response => {
            
            for (const itemList of allListings){
                if (itemList.uuid === item){
                    itemList.pictures = 'PENDING';
                    break;
                }
            }
            console.log(response);

            let tempLoadingList = loadingList.filter(itemLoading => itemLoading !== item);
            loadingList = tempLoadingList.map(item => item);

            
            
            dispatch(changePicturesIsLoading(loadingList));        
        
        })
    }

    }


    

    


    
    /*return (dispatch) => {
        dispatch(ebayMarketplacesIsLoading(true));

        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.get(url, config)
        .then(response => {
            
            if (response.statusText !== "OK"){
                throw Error(response.statusText);
            }

            dispatch(ebayMarketplacesIsLoading(false));
            
            return response.data

        })
        .then((brands) => dispatch(ebayMarketplacesFetchDataSuccess(brands)))
        .catch(() => dispatch(ebayMarketplacesHasErrored(true)));
    }*/


}