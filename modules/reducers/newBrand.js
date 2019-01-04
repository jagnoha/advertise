const fields = {
    "id": "",
    "value": "",
}

export function newBrand(state = fields, action) {
    switch (action.type) {
        case 'ADD_NEW_BRAND':
            return action.newBrand;
        
        default:
            return state;
    }
}