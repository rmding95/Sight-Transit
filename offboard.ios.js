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
    this.props.navigator.replace({
      title: "Stops Left",
      component: StopCountdownScreen,
      passProps: {currentDirection: this.state.currentDirection, routeDetails: this.state.routeDetails, transitDetails: this.state.transitDetails, numStops: this.state.transitDetails.numStops}
    });
  }

render() {
        return (
          <View style={styles.container} accessible={true} accessibilityLabel={'Are You On Board'}>
            <TouchableHighlight onPress={() => this._onPress('Are You On Board')}>
              <View style={styles.box1}>
                <Text style={{fontSize: 36,fontWeight: 'bold',color: '#2a2a2a',fontFamily: 'APHont'}}>Are You On Board</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this._onPress('Yes')}>
              <View style={styles.box2} accessible={true} accessibilityLabel={'Yes'}>
                <Text style={{fontSize: 36,fontWeight: 'bold',color: '#fff',fontFamily: 'APHont'}}>Yes</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this._onPress('No')}>
              <View style={styles.box3} accessible={true} accessibilityLabel={'No'}>
                <Text style={{fontSize: 36,fontWeight: 'bold',color: '#f9ec00',fontFamily: 'APHont'}}>No</Text>
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
    height: 200,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  box3: {
    backgroundColor: '#0023ff',
    height: 200,
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});




module.exports = OnBoardScreen;
