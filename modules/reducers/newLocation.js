const fields = {
    "id": "",
    "value": "",
}

export function newLocation(state = fields, action) {
    switch (action.type) {
        case 'ADD_NEW_LOCATION':
            return action.newLocation;
        
        default:
            return state;
    }
}