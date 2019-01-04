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
//import AppNavigator from './AppNavigator';
import configureStore from './modules/configureStore.js';
import { Provider } from 'react-redux';
import { Router, Scene, Stack, Tabs } from 'react-native-router-flux';
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
              </Stack>
      </Router>
      </Provider>
    );
  }
}


