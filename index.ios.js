import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';
var HomeScreen = require('./home.ios.js');

export default class SightTransit extends React.Component {

  render() {
    return (
      <NavigatorIOS style={styles.container}
        initialRoute={{
          title: 'Home',
          component: HomeScreen,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 20,
    marginTop: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    alignItems: 'center'
  },
  top: {

  },
  bot: {
    backgroundColor: '#A9A9A9'
  }
});

AppRegistry.registerComponent('SightTransit', () => SightTransit);
