import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen.js'
import TabScreen from './screens/TabScreen.js'


const RootStack = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    TabScreen: TabScreen,
  },
  {
    initialRouteName: 'HomeScreen',
  });

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
