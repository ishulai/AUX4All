import React, {Component} from 'react';
import { StyleSheet, Image, Text, View, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
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

  testSearchQuery = (text) => {
    if (text.length >=3) {
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
        this.arrayholder = res.results;
      }).catch(error => {
          this.setState({ error, loading: false });
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

  addSongToQueue = (item) => {
    console.log(`Adding ${item.title}`);
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    console.log(this.state.data)
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
                onPress={() => this.addSongToQueue(item)}
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
  render() {
    return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Now Playing
      </Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.touchableOpacity}>

          <Icon name={"ios-thumbs-up"}  size={60} color="green" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchableOpacity}>
          <Icon name={"ios-thumbs-down"}  size={60} color="red" />
        </TouchableOpacity>
      </View>
    </View>
    );
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
  activeTintColor: 'blue',
  inactiveTintColor: 'grey',
  barStyle: {backgroundColor: 'black'}
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttons: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  touchableOpacity: {
    borderWidth:1,
    backgroundColor:'black',
    borderColor:'white',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    borderRadius:100,
  },
  text: {
    color: 'white',
    fontSize: 36,
    marginTop: 48,
    textAlign: 'center'
  },
});
