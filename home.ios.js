/**
 * home page template
 * TODO: implement navigation
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Homepage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.myPlacesCon}>
            <Text style={styles.myPlacesTxt}>
                My Places
            </Text>
        </View>
        <View style={styles.newTripCont}>
            <Text style={styles.newTripTxt}>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  myPlacesCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  newTripCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  newTripTxt: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  myPlacesTxt: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Homepage', () => Homepage);