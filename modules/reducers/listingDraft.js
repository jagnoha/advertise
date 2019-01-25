
const fields = {
    "sku": "",
    "uuid": "",
    "pictures": [],
    "quantity": "1",
    "price": "",
    "title": "",
    "brand": "",
    "partNumbers": [],
    "bestOffer": false,
    "description": "",
    "condition": "0",
    "conditionDescription": [],
    "location": "",
    "freeShipping": true,
    "domestic": "0",
    "international": "0",
    "length": "8",
    "width": "8",
    "depth": "8",
    "weight": "8",
    "weightUnit": "oz",
    "category": null,
    "lastModified": null,
    "ebayAccount": "",
    "status": "offline",
    "upc": "",
    "authorId": "0",
    "compatibilityUrl": "",
    "compatibilityManual": [],
    "compatibilityEbayId": "",
    "hasCompatibility": false,
}

export function listingDraftHasErrored(state = false, action) {
    switch (action.type) {
        case 'LISTING_DRAFT_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function listingDraftIsLoading(state = false, action) {
    switch (action.type) {
        case 'LISTING_DRAFT_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}


export function listingDraft(state = fields, action) {
    switch (action.type) {
        case 'LISTING_DRAFT_UPDATED':
            return action.listingDraft;
        
        default:
            return state;
    }
}