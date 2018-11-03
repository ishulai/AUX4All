import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
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

  this.arrayholder = [];
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

  searchFilterFunction = text => {
    console.log(this.arrayholder);
    const newData = this.arrayholder.filter(item => {
    const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;
      });
    this.setState({
      data: newData,
    });
    };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Please Enter a Song"
        darkTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <SafeAreaView>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={`${item.name.first} ${item.name.last}`}
                subtitle={item.email}
                avatar={{ uri: item.picture.thumbnail }}
                containerStyle={{ borderBottomWidth: 0, backgroundColor: 'black' }}
              />
            )}
            keyExtractor={item => item.email}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        </List>
      </SafeAreaView>
      );
    }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
       this.arrayholder = res.results;
     })
     .catch(error => {
       this.setState({ error, loading: false });
     });
 };
}

class MusicScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Music Screen</Text>
      </View>
    );
  }
}

export default createMaterialBottomTabNavigator({
  Upload: { screen: UploadScreen,
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
}
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
