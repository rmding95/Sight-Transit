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
var NewTripScreen = require('./newtrip.ios.js');

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  _onPress = () => {
    this.props.navigator.push({
      title: "Place",
      component: PlacesScreen
    });
  }

  _onPress1 = () => {
    this.props.navigator.push({
      title: "Destination",
      component: NewTripScreen
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <TouchableHighlight onPress={() => this._onPress()}>
          <View style={styles.top} accessible={true} accessibilityLabel={'My Places'}>
              <View>
                <Image style={styles.image} source={require('./img/home.png')} />
                <Text style={{fontSize: 30,fontWeight: 'bold',color: '#2a2a2a',fontFamily: 'APHont'}}>
                  MY PLACES
                </Text>
              </View>
            
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._onPress1()}>
          <View style={styles.bot} accessible={true} accessibilityLabel={'New trip'}>
            <View>
            <Image style={styles.image} source={require('./img/placeholder.png')} />
            <Text style={{fontSize: 30,fontWeight: 'bold',color: '#fff',fontFamily: 'APHont'}}>
              NEW TRIP
            </Text>
            </View>
        </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
  image: {
    alignItems: 'center',
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 30,
    marginLeft: 25
  },
  top: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height:333,
    width:414,
    alignSelf: 'stretch'
  },
  bot: {
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    height:333,
    width:414,
    alignSelf: 'stretch'
  }
});

module.exports = HomeScreen;