import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  NavigatorIOS,
  AsyncStorage
} from 'react-native';

var DirectionScreen = require('./direction.ios.js');
var NewTripScreen = require('./newtrip.ios.js');
class PlacesScreen extends Component {

  constructor(props) {
    super(props);
  }

  _onPress = (location) => {
    const routeSteps = AsyncStorage.getItem(location).then((value) => {
      if (value !== null) {
        this.setState({routeSteps: value});
      } else {
        this.props.navigator.replace({
          title: "Enter Your Destination",
          component: NewTripScreen,
          passProps: {savingLocation: true, saveName: location}
        });
      }
    });
    const destinationName = AsyncStorage.getItem(location + 'Destination').then((value) => {
      if (value !== null) {
        this.setState({destinationName: value});
      } else {
      }
    });
  }

    componentWillUpdate(nextProps, nextState) {
        if (typeof nextState.routeSteps != 'undefined' && typeof nextState.destinationName != 'undefined') {
          this.props.navigator.replace({
            title: "Directions",
            component: DirectionScreen,
            passProps: {routeDetails: nextState.routeSteps, destinationName: nextState.destinationName}
          });
        }
    }

    render() {
        return (
          <View style={styles.container} accessible={true} accessibilityLabel={'Home'}>
            <TouchableHighlight onPress={() => this._onPress('Home')}>
              <View style={styles.box1}>
                <Text style={{fontSize: 36,fontWeight: 'bold',color: '#fff',fontFamily: 'APHont'}}>HOME</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this._onPress('School')}>
              <View style={styles.box2} accessible={true} accessibilityLabel={'School'}>
                <Text style={{fontSize: 36,fontWeight: 'bold',color: '#f9ec00',fontFamily: 'APHont'}}>SCHOOL</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this._onPress('Work')}>
              <View style={styles.box3} accessible={true} accessibilityLabel={'Work'}>
                <Text style={{fontSize: 36,fontWeight: 'bold',color: '#2a2a2a',fontFamily: 'APHont'}}>WORK</Text>
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
  }
});

module.exports = PlacesScreen;
