import React from 'react';

window.helpers = (function () {

    Object.defineProperty(Array.prototype, 'chunk', {
        value: function(chunkSize) {
            var that = this;
            return Array(Math.ceil(that.length/chunkSize)).fill().map(function(_,i){
                return that.slice(i*chunkSize,i*chunkSize+chunkSize);
            });
        }

    })

    function getConditionFromId(list, id){
        return list.filter((item) => item.id === id)[0].type; 
    } 
    
    function getNameFromId(list, id){
        return list.filter((item) => item.id === id)[0].username; 
    }

    function getBrandFromId(list, id){
        
        const result = list.filter((item) => item.id === id);

        if (result.length > 0){
            return result[0].value
        } else {
            return null
        }
                
    }

    function getListingFromId(list, id){
        
        const result = list.filter((item) => item.uuid === id);

        if (result.length > 0){
            return result[0]
        } else {
            return null
        }
                
    }

    function getLocationFromId(list, id){
        const result = list.filter((item) => item.id === id);

        if (result.length > 0){
            return result[0].value;
        } else {
            return null
        }
       
    }

    function getEbayMarketplaceFromId(list, id){
        return list.filter((item) => item.id === id)[0].ebayUserId;
    }

    function getLocationIdFromName(list, name){
        const result = list.filter((item) => item.value === name);
        if (result.length > 0){
            return result[0].id;
        } else {
            return null;
        }
    }

    function getColorConnection(status){
        if (status === 'online'){
          return 'green';
        } else if (status === 'offline'){
          return 'yellow';
        };
        return 'red';
    } 

    function isProductChecked(list, id){
        return (list.filter(item => item === id).length > 0 ? true : false) 
    }

    const priceWarning = (price) => {
        if (Number(price) <= 0){
          return <p>Warning Price</p>
        }
    }
      
    const outOfStock = (qty) => {
        if (qty < 1){  
          return <p>Out of Stock</p>
        }
    }

    const shippingOptions = [
        {text:'USPS First Class',value: '0'},
        {text:'USPS Priority Mail',value: '1'},
        {text:'UPS Ground',value: '2'},
        {text:'FedEx Ground',value: '5'},
        {text:'Pallet',value: '3'},
        {text:'Local Pickup',value: '4'},    
    ]

    const internationalShippingOptions = [
        {text:'GSP',value: '0'},
        {text:'No International',value: '1'},
    ]

    const weightUnit = [
        {value:'oz', text: 'oz'},
        {value:'lbs', text: 'lb'},
        {value:'gr', text: 'gr'},
        {value:'Kg', text: 'Kg'},
    ]

    const conditionOptions = [
        {text: 'New', value: '0'},
        {text: 'New (Other)', value: '1'},
        {text: 'Used', value: '2'},
        {text: 'Manufacturer refurbished', value: '3'},
        {text: 'For parts or not working', value: '4'},
    ]

    const conditionDescriptionOptions = [
        {value:'Box Damage', text: 'Box Damage'},
        {value:'Bag Damage', text: 'Bag Damage'},
        {value:'Open Box', text: 'Open Box'},
        {value:'Out of Box', text: 'Out of Box'},
        {value:'Out of Bag', text: 'Out of Bag'},
        {value:'NOS', text: 'NOS'},
        {value:'Rebuilt / Remanufactured', text: 'Rebuilt / Remanufactured'},
        {value:'Missing Parts', text: 'Missing Parts'},
        {value:'Some Dent', text: 'Some Dent'},
        {value:'Some Scratches', text: 'Some Scratches'},
        {value:'As Pictured', text: 'As Pictured'},
        {value:'Dirty', text: 'Dirty'},
        {value:'Small Cracks', text: 'Small Cracks'},
        {value:'Vintage', text: 'Vintage'},
        {value:'Unknown Condition', text: 'Unknown Condition'},
        {value:'New Take Off', text: 'New Take Off'},
        {value:'New, Open Bag/Box for Taking Pictures', text: 'New, Open Bag/Box for Taking Pictures'},   
    ]

    const productsByPageOptions = [
        {value: '10', text: '10 results per page'},
        {value: '25', text: '25 results per Page'},
        {value: '50', text: '50 results per page'},
        {value: '100', text: '100 results per page'},
        {value: '200', text: '200 results per page'},
    ]

    return {
        getConditionFromId,
        getNameFromId,
        getColorConnection,
        priceWarning,
        outOfStock,
        isProductChecked,
        getBrandFromId,
        getLocationFromId,
        shippingOptions,
        internationalShippingOptions,
        weightUnit,
        conditionOptions,
        conditionDescriptionOptions,
        getLocationIdFromName,
        getEbayMarketplaceFromId,
        productsByPageOptions,
        getListingFromId,

    }

}())