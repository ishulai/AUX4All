import React, {Component} from 'react';
import { StyleSheet, Image, Text, View, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import {List, ListItem, SearchBar} from 'react-native-elements';

class UploadScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      data: [],
      error: null,
      query: "",
    };
  }

  renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: 'grey',
            marginLeft: '0%',
          }}
        />
      );
  };

  addSong = (item) => {
    console.log(item);
    const url = 'http://localhost:8080/addsong';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        uri: item.uri,
        pin: roomPin
      }),
    }).catch(error => {
          this.setState({ error, loading: false });
          console.error(error);
      });
  }
  testSearchQuery = (text) => {
    if (((text.length % 3) == 0) && (text.length !=0)) {
      this.searchQuery(text);
    }
  }
  searchQuery = (text) => {
    const url = 'http://localhost:8080/search';
    this.setState({ loading: true,
                    query: text});
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: text,
      }),
    }).then(res => res.json())
      .then(res => {
        console.log(res.results);
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
      }).catch(error => {
          this.setState({ error, loading: false });
          console.error(error);
      });
  }

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Please Enter a Song"
        darkTheme
        round
        onChangeText={text => this.testSearchQuery(text)}
        autoCorrect={false}
      />
    );
  };

  render() {
    return (
      <SafeAreaView>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                squareAvatar
                title={item.title}
                subtitle={`${item.artist} - ${item.album}`}
                avatar={{ uri: item.album_cover }}
                containerStyle={{ borderBottomWidth: 0, backgroundColor: 'black' }}
                keyExtractor={item => item.uri}
                rightIcon={{name: "ios-add-circle", type: "ionicon"}}
                onPress={() => this.addSong(item)}
              />
            )}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        </List>
      </SafeAreaView>
      );
    }
}

class MusicScreen extends Component {
  constructor() {
    super();
    this.state = {
      voted: false,
      time: null
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    try {
      return (
        <View style={styles.container}>
        <View alignItems="center">
          <Text style={styles.text}>
            Now Playing
          </Text>
          <Image
            style={{width: 200, height: 200, marginTop: 36}}
            source={{uri: songData.current_song.album_cover}}

            />
          <Text style={styles.baseText}>
            {songData.current_song.title}
          </Text>
          <Text style={styles.baseText}>
            {songData.current_song.artist}
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.vote(1)}>
            <Icon name={"ios-thumbs-up"}  size={60} color="green" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.vote(-1)}>
            <Icon name={"ios-thumbs-down"}  size={60} color="red" />
          </TouchableOpacity>
        </View>
        </View>
      );
    } catch(e) {
      return (
        <View style={styles.container}>
        <View alignItems="center">
          <Text style={styles.baseText}>
            No song currently playing.
          </Text>
        </View>
        </View>
      );
    }
  }

  vote = (value) => {
    const url = 'http://localhost:8080/vote';
    if (this.state.voted == true) {
      this.setState(voted: false)
    } else {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pin: roomPin,
          value: value,
        }),
      }).catch(error => {
        this.setState({ error, loading: false, voted: true });
        console.error(error);
      });
    }
  }
}

export default createMaterialBottomTabNavigator({
  Upload: {screen: UploadScreen,
          navigationOptions: {
            tabBarLabel:'Upload',
            tabBarIcon:({tintColor}) => (
              <Icon name="ios-arrow-round-up" color={tintColor} size={24}/>
            )}},
  Music: { screen: MusicScreen,
              navigationOptions: {
                tabBarLabel:'Music',
                tabBarIcon:({tintColor}) => (
                  <Icon name="ios-musical-notes" color={tintColor} size={24}/>
                )}},
}, {
  initialRouteName: "Upload",
  order: ['Upload', 'Music'],
  activeTintColor: '#1e90ff',
  inactiveTintColor: 'grey',
  barStyle: {backgroundColor: 'black'}
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-evenly',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  touchableOpacity: {
    borderWidth:1,
    backgroundColor:'black',
    borderColor:'white',
    alignItems:'center',
    justifyContent:'center',
    marginTop: 36,
    width:100,
    height:100,
    borderRadius:100,
  },
  text: {
    color: 'white',
    fontSize: 36,
    marginBottom: 24,
    marginTop: 12,
    textAlign: 'center'
  },
  baseText: {
    color: 'white',
    marginTop: 36,
    fontSize: 24,
    textAlign: 'center'
  },
});
