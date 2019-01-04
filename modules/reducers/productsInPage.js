export function productsInPage(state=[], action) {
    switch (action.type) {
        case 'PRODUCTS_IN_PAGE':
            return action.productsInPage;
        default:
            return state;
    }
}