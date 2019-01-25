import { combineReducers } from 'redux';
import { locationsHasErrored, locationsIsLoading, locations } from './reducers/locations';
import { listingsHasErrored, listingsIsLoading, listings, listingsFiltered } from './reducers/listings';
import { brandsHasErrored, brandsIsLoading, brands } from './reducers/brands';
import { ebayMarketplacesHasErrored, ebayMarketplacesIsLoading, ebayMarketplaces } from './reducers/ebayMarketplaces';
import { conditions } from './reducers/conditions';
import { users } from './reducers/users';
import { activePage } from './reducers/activePage';
import { productsByPage } from './reducers/productsByPage';
import { clickedColumn, direction } from './reducers/clickedColumn';
import { filterByCondition, filterByStatus, filterByUser, filterByMarketplace, searchIsChecked, filterBySearch } from './reducers/filters';
import { productsSelected } from './reducers/productsSelected';
import { productsInPage } from './reducers/productsInPage';
import { picturesHasErrored, picturesIsLoading } from './reducers/pictures';
import { listingDraft, listingDraftHasErrored, listingDraftIsLoading } from './reducers/listingDraft';
import { newBrand } from './reducers/newBrand';
import { newLocation } from './reducers/newLocation';
import { urlBase } from './reducers/urlBase';
import { compatibilityManual, compatibilityManualHasErrored, compatibilityManualIsLoading } from './reducers/compatibilityManual';
import { userActive, userActiveHasErrored, userActiveIsLoading } from './reducers/userActive';



export default combineReducers({
    locations,
    locationsHasErrored,
    locationsIsLoading,
    listings,    
    listingsHasErrored,
    listingsIsLoading,
    brands,
    brandsHasErrored,
    brandsIsLoading,    
    ebayMarketplacesHasErrored,
    ebayMarketplacesIsLoading,
    ebayMarketplaces,
    conditions,
    users,
    activePage,
    productsByPage,
    clickedColumn,
    direction,
    filterByCondition,
    filterByStatus,
    filterByUser,
    filterByMarketplace,
    listingsFiltered,
    filterBySearch,
    searchIsChecked,
    productsSelected,
    productsInPage,
    picturesHasErrored,
    picturesIsLoading,
    listingDraft,
    listingDraftHasErrored,    
    listingDraftIsLoading,    
    newBrand,
    newLocation,
    urlBase,
    compatibilityManual,
    compatibilityManualHasErrored,
    compatibilityManualIsLoading,
    userActive,
    userActiveHasErrored,    
    userActiveIsLoading,
});