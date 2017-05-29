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

var StopCountdownScreen = require('./stopcountdown.ios.js');

class OffBoardScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        currentDirection: props.currentDirection,
        routeDetails: props.routeDetails,
        transitDetails: props.transitDetails
    };
  }

  _onPress = () => {
    this.props.navigator.push({
      title: "Stops Left",
      component: StopCountdownScreen,
      passProps: {currentDirection: this.state.currentDirection, routeDetails: this.state.routeDetails, transitDetails: this.state.transitDetails, numStops: this.state.transitDetails.numStops}
    });
  }

render() {
        return (
          <View style={styles.container} accessible={true} accessibilityLabel={'Are you off the bus?'}>
            <TouchableHighlight onPress={() => this._onPress('Are you off the bus?')}>
              <View style={styles.box1}>
                <Text style={{fontSize: 24,color: '#2a2a2a',fontFamily: 'APHont'}}>Are you off the bus?</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this._onPress('Yes')}>
              <View style={styles.box2} accessible={true} accessibilityLabel={'Yes'}>
                <Text style={{fontSize: 60,fontWeight: 'bold',color: '#fff',fontFamily: 'APHont'}}>YES</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this._onPress('No')}>
              <View style={styles.box3} accessible={true} accessibilityLabel={'No'}>
                <Text style={{fontSize: 60,fontWeight: 'bold',color: '#f9ec00',fontFamily: 'APHont'}}>NO</Text>
              </View>
            </TouchableHighlight>
          </View>

        );
    }
}


const styles = StyleSheet.create({
  box1: {
    backgroundColor: '#fff',
    height: 200,
    marginTop: 64,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  box2: {
    backgroundColor: '#2a2a2a',
    height: 210,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  box3: {
    backgroundColor: '#0023ff',
    height: 210,
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});




module.exports = OffBoardScreen;
