
export function compatibilityManualHasErrored(state = false, action) {
    switch (action.type) {
        case 'COMPATIBILITY_MANUAL_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function compatibilityManualIsLoading(state = false, action) {
    switch (action.type) {
        case 'COMPATIBILITY_MANUAL_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}


export function compatibilityManual(state = [], action) {
    switch (action.type) {
        case 'COMPATIBILITY_MANUAL_UPDATED':
            return action.listingDraft;
        
        default:
            return state;
    }
}