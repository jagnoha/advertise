export function listingCheckedHasErrored(state = false, action) {
    switch (action.type) {
        case 'LISTING_CHECKED_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function listingCheckedIsLoading(state = false, action) {
    switch (action.type) {
        case 'LISTING_CHECKED_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function listingChecked(state = "", action) {
    switch (action.type) {
        case 'LISTING_CHECKED_UPDATED':
            return action.listingChecked;

        default:
            return state;
    }
}