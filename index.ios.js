import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class SightTransit extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.container, styles.top]}>
          <Image style={styles.image} source={require('./img/sighttransit_braille.png')} />
          <Text style={styles.text}>
            My Places
          </Text>
        </View>
        <View style={[styles.container, styles.bot]}>
          <Image style={styles.image} source={require('./img/sighttransit_braille.png')} />
          <Text style={styles.text}>
            New Trip
          </Text>
        </View>
      </View>
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
