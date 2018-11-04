import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { AuthSession } from 'expo';

const APP_ID = '81d45c5a55ea49b3bd0433b88f691aca';
const scopes = 'user-modify-playback-state user-read-playback-state user-read-currently-playing'

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      result: null,
    };
  }

  authorize = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl);
    let result = await AuthSession.startAsync({
      authUrl:
        `https://accounts.spotify.com/authorize?` +
        `response_type=code` +
        `&client_id=${APP_ID}` +
        `&scope=${encodeURIComponent(scopes)}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        '&show_dialog=true',
    });
    this.setState({ token : result.params.code});
    this.createRoom(result.params.code, redirectUrl)
  }

  createRoom = (token, redirectUrl) => {
    const url = 'http://localhost:8080/createroom';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        redirect_uri: redirectUrl
      }),
    }).then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: res.error || null,
          loading: false,
        });
        userId = this.state.data.user_id
        roomPin = this.state.data.pin
        this.props.navigation.navigate("CodeScreen");

        window.setInterval(() => {
          const url = 'http://localhost:8080/getstatus';
          fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pin: roomPin,
            }),
          }).then(res => res.json())
            .then(res => {
              songData = res
              console.log(songData.current_song.album_cover)
              this.setState({
                data: res,
                error: res.error || null,
                loading: false,
              });
            }).catch(error => {
                console.error(error);
                //this.setState({ loading: false });
            });
        }, 3000);
      }).catch(error => {
          console.error(error);
          //this.setState({ err: error, loading: false });
      });
  }

  render() {
    return (
      <View style={[{flex: 1}, styles.elementsContainer]}>
        <Text style={styles.headerText}> Welcome to AUX4ALL</Text>
        <View style={styles.elementsContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity = {.5}
            onPress={this.authorize}>
            <Text style={styles.textStyle}> Create a Room </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity = {.5}
            onPress={this.onPressJoinButton}>
            <Text style={styles.textStyle}> Join a Room </Text>
          </TouchableOpacity>
          </View>
        </View>
    );
  }

  onPressJoinButton = () => {
    this.props.navigation.navigate('JoinScreen');
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
    borderColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  textStyle: {
    color: '#1e90ff',
    fontSize: 30,
    textAlign: 'center'
  },
});
