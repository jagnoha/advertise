import React, { Component } from 'react';
import PartNumber from './PartNumber';


class PartNumberList extends Component {

    render(){
        return (
            this.props.partNumbers.map((item) => {
                return <PartNumber key = {item.id} id = {item.id} value = {item.partNumber} deleteItem = {this.props.deleteItem} />
            })
        )
        
    }
}

export default PartNumberList