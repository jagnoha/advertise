export function productsSelected(state = [], action) {
    switch (action.type) {
        case 'PRODUCTS_SELECTED':
            return action.productsSelected;
        default:
            return state;
    }
}