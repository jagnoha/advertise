export function clickedColumn(state = null, action) {
    switch (action.type) {
        case 'CLICK_ON_COLUMN':
            return action.clickedColumn;

        default:
            return state;
    }
}

export function direction(state = null, action) {
    switch (action.type) {
        case 'CHANGE_DIRECTION':
            return action.direction;

        default:
            return state;
    }
}