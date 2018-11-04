import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { AuthSession } from 'expo';

const APP_ID = 'a875e545029e40339ef4a1aa070312ea';
const scopes = 'user-modify-playback-state user-read-currently-playing'
export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      result: null,
    };
  }

  authorize = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl)
      let result = await AuthSession.startAsync({
        authUrl:
          `https://accounts.spotify.com/authorize?` +
          `response_type=code` +
          `&client_id=${APP_ID}` +
          `&scope=${encodeURIComponent(scopes)}` +
          `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
      });
      this.setState({ code : result.code});
    console.log(result);
}

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
    const result = this.authorize();
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
