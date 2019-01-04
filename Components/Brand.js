import React, { Component } from 'react';
import {Text} from 'react-native';

class Brand extends Component {
    
    selectBrand = () => {
        this.props.selectBrand(this.props.value, this.props.id);
    }
        
    render(){
        return <Text onPress={this.selectBrand} style={{ margin:15 }} >{this.props.value}</Text>
    }
}

export default Brand