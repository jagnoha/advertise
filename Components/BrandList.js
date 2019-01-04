import React, { Component } from 'react';
import Brand from './Brand';

class BrandList extends Component {

    render(){
        return (
            this.props.brandListFiltered.map((item) => {
                return <Brand key = {item.id} id = {item.id} value = {item.value} selectBrand = {this.props.selectBrand} />
            })
        )
        
    }
}

export default BrandList