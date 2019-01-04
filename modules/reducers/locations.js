export function locationsHasErrored(state = false, action) {
    switch (action.type) {
        case 'LOCATIONS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function locationsIsLoading(state = false, action) {
    switch (action.type) {
        case 'LOCATIONS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function locations(state = [], action) {
    switch (action.type) {
        case 'LOCATIONS_FETCH_DATA_SUCCESS':
            return action.locations;

        default:
            return state;
    }
}