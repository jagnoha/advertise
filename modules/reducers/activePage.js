export function activePage(state = 1, action) {
    switch (action.type) {
        case 'CHANGE_ACTIVE_PAGE':
            return action.activePage;

        default:
            return state;
    }
}