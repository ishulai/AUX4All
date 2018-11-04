import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen.js'
import TabScreen from './screens/TabScreen.js'
import JoinScreen from './screens/JoinScreen.js'
import CodeScreen from './screens/CodeScreen.js'

console.disableYellowBox = true;


const RootStack = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    TabScreen: TabScreen,
    JoinScreen: JoinScreen,
    CodeScreen: CodeScreen,
  },
  {
    initialRouteName: 'HomeScreen',
  });

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
