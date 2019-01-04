
const fields = {
    "sku": "",
    "uuid": "",
    "pictures": [],
    "quantity": "1",
    "price": "",
    "title": "",
    "brand": "",
    "partNumbers": [],
    "bestOffer": true,
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
}

export function listingDraft(state = fields, action) {
    switch (action.type) {
        case 'LISTING_DRAFT_UPDATED':
            return action.listingDraft;
        
        default:
            return state;
    }
}