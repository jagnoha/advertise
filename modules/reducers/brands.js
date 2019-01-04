export function brandsHasErrored(state = false, action) {
    switch (action.type) {
        case 'BRANDS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function brandsIsLoading(state = false, action) {
    switch (action.type) {
        case 'BRANDS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function brands(state = [], action) {
    switch (action.type) {
        case 'BRANDS_FETCH_DATA_SUCCESS':
            return action.brands;

        default:
            return state;
    }
}