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
import BeaconBroadcast from 'react-native-ibeacon-simulator';

var StopCountdownScreen = require('./stopcountdown.ios.js');

class OnBoardScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        currentDirection: props.currentDirection,
        routeDetails: props.routeDetails,
        transitDetails: props.transitDetails
    };
  }

  _onPress = () => {
    BeaconBroadcast.stopAdvertisingBeacon();
    this.props.navigator.push({
      title: "Stops Left",
      component: StopCountdownScreen,
      passProps: {currentDirection: this.state.currentDirection, routeDetails: this.state.routeDetails, transitDetails: this.state.transitDetails, numStops: this.state.transitDetails.numStops}
    });
  }

    render() {
        return (
          <View style={styles.container} accessible={true} accessibilityLabel={'Home'}>
            <Text style={{fontSize: 20,fontWeight: 'bold',fontFamily: 'APHont', margin: 100}}>Are you on board?</Text>
            <TouchableHighlight onPress={() => this._onPress()}>
              <View style={styles.box1}>
                <Image style={styles.image} source={require('./img/002-sound.png')} />
              </View>
            </TouchableHighlight>
          </View>

        );
    }
}


const styles = StyleSheet.create({
  box1: {
    backgroundColor: '#2a2a2a',
    height: 200,
    marginTop: 64,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  box2: {
    backgroundColor: '#0023ff',
    height: 200,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  box3: {
    backgroundColor: '#fff',
    height: 200,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  image: {
    alignItems: 'center',
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 20
  }
});

module.exports = OnBoardScreen;
