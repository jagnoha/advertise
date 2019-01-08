import React, { Component } from 'react';
import CheckboxFormX from 'react-native-checkbox-form';
import { View, Text } from 'react-native';


const mockData = [
    {
        label: 'As Pictured',
        value: 'As Pictured'
    },
    {
        label: 'New, Open Bag/Box for Taking Pictures',
        value: 'New, Open Bag/Box for Taking Pictures'
    },
    {
        label: 'Box Damage',
        value: 'Box Damage'
    },
    {
        label: 'Bag Damage',
        value: 'Bag Damage'
    },
    {
        label: 'Open Box',
        value: 'Open Box'
    },
    {
        label: 'Out of Box',
        value: 'Out of Box'
    },
    {
        label: 'Out of Bag',
        value: 'Out of Bag'
    },
    /*{
        label: 'NOS',
        value: 'NOS',
        RNchecked: false,
    },*/
    /*{
        label: 'Rebuilt / Remanufactured',
        value: 'Rebuilt / Remanufactured'
    },*/
    {
        label: 'Missing Parts',
        value: 'Missing Parts'
    },
    {
        label: 'Some Dent',
        value: 'Some Dent'
    },
    {
        label: 'Some Scratches',
        value: 'Some Scratches'
    },    
    {
        label: 'Dirty',
        value: 'Dirty'
    },
    /*{
        label: 'Small Cracks',
        value: 'Small Cracks'
    },
    {
        label: 'Vintage',
        value: 'Vintage'
    },
    {
        label: 'Unknown Condition',
        value: 'Unknown Condition'
    },*/
    {
        label: 'New Take off',
        value: 'New Take off'
    },
    
];

class ConditionDescription extends Component {



    render(){
        return (
            <View style={{ marginBottom: 5, backgroundColor: "#E7E7E7" }} >
              <CheckboxFormX
                  style={{ margin: 10 }}
                  textStyle={{ margin: 10}}
                  dataSource={mockData}
                  itemShowKey="label"
                  itemCheckedKey="RNchecked"
                  iconSize={25}
                  formHorizontal={true}
                  labelHorizontal={false}
                  onChecked={(item) => this.props.onSelectConditionDescription(item)}
              />
              <View>

                  {/*this.props.conditionDescription.filter(item => item.RNchecked === true).map((item,index) => {
                      return (
                        <Text key={index}>{item.label}</Text>
                      )
                  })*/}

                  
              </View>
              </View>        
              )
    }
}

export default ConditionDescription







