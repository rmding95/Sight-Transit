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

let googlePlaceApiKey = "AIzaSyBb7lDyjRIlU7STXU8d4WueMDk5bI3sxrU";
let googleDirectionApiKey = "AIzaSyBr8DLoX9-BH052cK8WmY7PiV755QhvolE";
var DirectionScreen = require('./direction.ios.js');

class FinalArrivalScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      destinationName: props.destinationName,
      startAddress: props.startAddress
    };
  }

  _onPress = () => {
    this.props.navigator.pop();
  }

  _reverse = () => {
    callGooglePlaceApi(this.state.startAddress, this.state.initialPosition).then((response) => {
        return {location: response.results[0], coords: JSON.parse(this.state.initialPosition)};
    }, function(error) {
    }).then((data) => {
        this.setState({destinationName: data.location.name});
        this.setState({destinationAddress: data.location.formatted_address});
        callGoogleDirectionApi(data.coords, data.location.formatted_address).then((response) => {
            this.setState({route: response});
        }, function(error) {
        }).then(() => {
            this._onDirectionConfirmation();
        }, function(error) {

        })
    })
  }

   _onDirectionConfirmation = () => {
       this.props.navigator.replace({
           title: "Direction",
           component: DirectionScreen,
           passProps: {routeDetails: JSON.stringify(this.state.route), destinationName: this.state.destinationName}
       });
   }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
          var initialPosition = JSON.stringify(position);
          this.setState({initialPosition});
      },
      (error) => {},
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render() {
    return (
      <View style={styles.container}>

          <View accessible={true} accessibilityLabel={'You have arrived at' + this.state.destinationName + '. Return to where you came from?'}>
            <Text style={styles.title}>
                You've arrived at {this.state.destinationName}. Return to where you came from?
            </Text>
          </View>

          <TouchableHighlight onPress={() => this._reverse()}>
              <View style={styles.box2} accessible={true} accessibilityLabel={'Yes'}>
                <Text style={{fontSize: 60,fontWeight: 'bold',color: '#fff',fontFamily: 'APHont'}}>YES</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this._onPress()}>
              <View style={styles.box3} accessible={true} accessibilityLabel={'No'}>
                <Text style={{fontSize: 60,fontWeight: 'bold',color: '#f9ec00',fontFamily: 'APHont'}}>NO</Text>
              </View>
            </TouchableHighlight>
      </View>
    );
  }
}

async function callGoogleDirectionApi(origin, destination) {
    var baseUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=";
    var url = baseUrl + origin.coords.latitude + "," + origin.coords.longitude + "&destination=" + destination + "&mode=transit&transit_mode=bus&key=" + googleDirectionApiKey
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
    }
}

async function callGooglePlaceApi(query, initialPosition) {
    var coords = JSON.parse(initialPosition);
    var baseUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
    // might want to check if we get the initial position
    var lat = coords.coords.latitude;
    var long = coords.coords.longitude;
    var url = baseUrl + query + "&location=" + lat + "," + long + "&key=" + googlePlaceApiKey;
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 36,
    fontWeight: 'normal',
    color: '#2a2a2a',
    fontFamily: 'APHont',
    marginTop: 100,
    marginLeft: 30
  },
  distance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f9ec00',
    fontFamily: 'APHont',
    marginTop: 175,
    marginLeft: 30
  },
  measure: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#f9ec00',
    fontFamily: 'APHont',
    marginLeft: 30
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

module.exports = FinalArrivalScreen;