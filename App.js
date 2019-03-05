/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import MainApp from './Components/MainApp';
import ToShelf from './Components/ToShelf';
import Drafts from './Components/Drafts';
import Locations from './Components/Locations';

//import AppNavigator from './AppNavigator';
import configureStore from './modules/configureStore.js';
import { Provider } from 'react-redux';
import { Router, Scene, Stack, Tabs } from 'react-native-router-flux';
import FlashMessage from "react-native-flash-message";
//import { createStackNavigator } from 'react-navigation';

const store = configureStore();

/*const AppNavigator = createStackNavigator({
  MainApp: { screen: MainApp },
});*/


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>          
              <Stack key="root">
                <Scene key="home" component={MainApp} hideNavBar={true} />
                <Scene key="toShelf" component={ToShelf} hideNavBar={true} />
                <Scene key="drafts" component={Drafts} hideNavBar={true} />
                <Scene key="locations" component={Locations} hideNavBar={true} />                  
                         
              
              </Stack>
      </Router>
      <FlashMessage position="top" />
      </Provider>
    );
  }
}


