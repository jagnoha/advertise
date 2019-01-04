export function picturesHasErrored(state = [], action) {
    switch (action.type) {
        case 'PICTURES_HAS_ERRORED':
            return action.picturesHasErrored;

        default:
            return state;
    }
}

export function picturesIsLoading(state = [], action) {
    switch (action.type) {
        case 'PICTURES_IS_LOADING':
            return action.picturesIsLoading;

        default:
            return state;
    }
}

