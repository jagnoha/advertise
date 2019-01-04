export function ebayMarketplacesHasErrored(state = false, action) {
    switch (action.type) {
        case 'EBAY_MARKETPLACES_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function ebayMarketplacesIsLoading(state = false, action) {
    switch (action.type) {
        case 'EBAY_MARKETPLACES_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function ebayMarketplaces(state = [], action) {
    switch (action.type) {
        case 'EBAY_MARKETPLACES_FETCH_DATA_SUCCESS':
            return action.ebayMarketplaces;

        default:
            return state;
    }
}