export function filterByCondition(state = 'ALL', action) {
    switch (action.type) {
        case 'FILTER_BY_CONDITION':
            return action.filterByCondition;

        default:
            return state;
    }
}

export function filterByStatus(state = 'ALL', action) {
    switch (action.type) {
        case 'FILTER_BY_STATUS':
            return action.filterByStatus;

        default:
            return state;
    }
}

export function filterByMarketplace(state = 'ALL', action) {
    switch (action.type) {
        case 'FILTER_BY_MARKETPLACE':
            return action.filterByMarketplace;

        default:
            return state;
    }
}

export function filterByUser(state = 'ALL', action) {
    switch (action.type) {
        case 'FILTER_BY_USER':
            return action.filterByUser;

        default:
            return state;
    }
}

export function filterBySearch(state='', action) {
    switch (action.type) {
        case 'FILTER_BY_SEARCH':
            return action.filterBySearch;

        default:
            return state;
    }
}

export function searchIsChecked(state = false, action) {
    switch (action.type) {
        case 'SEARCH_IS_CHECKED':
            return action.searchIsChecked;

        default:
            return state;
    }
}