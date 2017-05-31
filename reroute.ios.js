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

let googlePlaceApiKey = "AIzaSyBb7lDyjRIlU7STXU8d4WueMDk5bI3sxrU";
let googleDirectionApiKey = "AIzaSyBr8DLoX9-BH052cK8WmY7PiV755QhvolE";
var DirectionScreen = require('./direction.ios.js');

class RerouteScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            endLocation: props.endLocation,
            destinationName: props.destinationName
        }
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
            callGoogleDirectionApi(position.coords, this.state.endLocation).then((response) => {
                this.setState({route: response});
            }, function(error) {
            }).then(() => {
                this._onDirectionConfirmation();
            }, function(error) {

            })
        },
        (error) => {},
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container} accessible={true} accessibilityLabel={"Recalculating Route"}>
                <Text style={styles.title}>Recalculating Route...</Text>
            </View>
        )
    }
}

async function callGoogleDirectionApi(origin, destination) {
    var baseUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=";
    var url = baseUrl + origin.latitude + "," + origin.longitude + "&destination=" + destination.lat + "," + destination.lng + "&mode=transit&transit_mode=bus&key=" + googleDirectionApiKey
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
    backgroundColor: '#0023ff'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f9ec00',
    fontFamily: 'APHont',
    marginTop: 120,
    marginLeft: 30
  },
  distance: {
    fontSize: 150,
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
});

module.exports = RerouteScreen;