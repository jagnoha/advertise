import React, { Component } from 'react';
import {Text} from 'react-native';


class PartNumber extends Component {
    
    deleteListing = () => {
        this.props.deleteItem(this.props.id);
    }
    
    render(){
        return <Text onPress={this.deleteListing} style={{ margin:15 }} >{this.props.value}</Text>
    }
}

export default PartNumber