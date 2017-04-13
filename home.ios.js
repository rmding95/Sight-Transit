import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';
var PlacesScreen = require('./places.ios.js');
var TripEntryScreen = require('./tripentry.ios.js');

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }
  /*static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }*/

  /*constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
  }

  _onForward() {
    this.props.navigator.push({
      title: 'Scene ' + nextIndex,
    });
  }*/

  _onPress = () => {
    console.log("press");
    this.props.navigator.push({
      title: "Place",
      component: PlacesScreen
    });
  }

  _onPress1 = () => {
    console.log("press");
    this.props.navigator.push({
      title: "Place",
      component: TripEntryScreen
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={[styles.container, styles.top]}>
            <TouchableHighlight onPress={() => this._onPress()}>
              <View accessible={true} accessibilityLabel={'My Places'}>
                <Image style={styles.image} source={require('./img/home.png')} />
                <Text style={{fontSize: 30,fontWeight: 'bold',color: '#2a2a2a',fontFamily: 'APHont'}}>
                  MY PLACES
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        <View style={[styles.container, styles.bot]}>
          <TouchableHighlight onPress={() => this._onPress1()}>
            <View accessible={true} accessibilityLabel={'New Trip'}>
            <Image style={styles.image} source={require('./img/placeholder.png')} />
            <Text style={{fontSize: 30,fontWeight: 'bold',color: '#fff',fontFamily: 'APHont'}}>
              NEW TRIP
            </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
  image: {
    alignItems: 'center',
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 20
  },
  top: {
    backgroundColor: '#fff',
    height:333,
    alignSelf: 'stretch'
  },
  bot: {
    backgroundColor: '#2a2a2a',
    height:333,
    alignSelf: 'stretch'
  }
});

module.exports = HomeScreen;