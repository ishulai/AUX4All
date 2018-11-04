import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import {authorize} from 'react'

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={[{flex: 1}, styles.elementsContainer]}>
        <Text style={styles.headerText}> Welcome to AUX4ALL</Text>
        <View style={styles.elementsContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity = {.5}
            onPress={this.onPressButton}>
            <Text style={styles.textStyle}> Create a Room </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity = {.5}
            onPress={this.onPressButton}>
            <Text style={styles.textStyle}> Join a Room </Text>
          </TouchableOpacity>
          </View>
        </View>
    );
  }

  onPressButton = () => {
       this.props.navigation.navigate('TabScreen')
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: '#1e90ff',
    fontSize: 36,
    marginTop: 48,
    textAlign: 'center',
  },
  elementsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'black',
  },
  buttonStyle: {
    flexDirection: 'row',
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:15,
    paddingRight:15,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    backgroundColor:'black',
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#1e90ff',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  textStyle: {
    color: '#1e90ff',
    fontSize: 30,
    textAlign: 'center'
  },
});
