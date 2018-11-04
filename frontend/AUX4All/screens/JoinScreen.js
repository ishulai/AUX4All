import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import renderIf from 'render-if'

export default class JoinScreen extends Component {
  constructor() {
    super();
    this.state = {code: '',
                  status: false}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          Please Enter the Code Displayed on Your Host's Device
        </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(code) => this.setState({code})}
          placeholder='Code'
        />
        {renderIf(this.state.status)(
          <Text style={styles.errorText}>
            Invalid Code. Please Try Again
          </Text>
        )}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity = {.5}
          onPress={() => this.joinRoom(this.state.code)}>
          <Text style={styles.textStyle}> Join Room</Text>
        </TouchableOpacity>
      </View>
    );
  }

  joinRoom = (pin) => {
    const url = 'http://localhost:8080/joinroom';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pin: pin,
      }),
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          data: res,
          error: res.error || null,
          loading: false,
        });
        userId = this.state.data.user_id
        if (userId != false) {
          roomPin = pin
          window.setInterval(function(){
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
                this.setState({
                  data: res,
                  error: res.error || null,
                  loading: false,
                });
              }).catch(error => {
                  this.setState({ error, loading: false });
              });
          }, 3000);
          this.props.navigation.navigate("TabScreen");
        } else {
          this.setState({status: true})
        }
      }).catch(error => {
          this.setState({ error, loading: false });
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'black'
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
    borderColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center'
},
  textInputStyle: {
    height: 70,
    paddingHorizontal: 20,
    borderColor: 'white',
    color: '#1e90ff',
    fontSize: 20,
    backgroundColor: 'black',
    borderRadius:20,
    borderWidth: 3,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
  },
  headerText: {
    color: '#1e90ff',
    fontSize: 30,
    textAlign: 'center'
  },
  textStyle: {
    color: '#1e90ff',
    fontSize: 30,
    textAlign: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center'
  },
});
