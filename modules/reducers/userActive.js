export function userActiveHasErrored(state = false, action) {
    switch (action.type) {
        case 'USER_aCTIVE_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function userActiveIsLoading(state = false, action) {
    switch (action.type) {
        case 'USER_ACTIVE_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function userActive(state = "", action) {
    switch (action.type) {
        case 'USER_ACTIVE_FETCH_DATA_SUCCESS':
            return action.userActive;

        default:
            return state;
    }
}