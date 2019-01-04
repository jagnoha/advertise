export function listingsHasErrored(state = false, action) {
    switch (action.type) {
        case 'LISTINGS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function listingsIsLoading(state = false, action) {
    switch (action.type) {
        case 'LISTINGS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function listingsFiltered(state = 0, action) {
    switch (action.type) {
        case 'LISTINGS_FILTERED':
            return action.listingsFiltered;
        default:
            return state;
    }
}

export function listings(state = [], action) {
    switch (action.type) {
        case 'LISTINGS_FETCH_DATA_SUCCESS':
            return action.listings;
        
        case 'SORT_LISTINGS':
            return action.listings;
        
        /*case 'FILTER_LISTINGS':
            return action.listings;*/
        
        default:
            return state;
    }
}

