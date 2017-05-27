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

// once direction is figured out make the screen updated automatically on user location
class StopCountdownScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDirection: props.currentDirection,
            routeDetails: props.routeDetails,
            transitDetails: props.transitDetails,
            numStops: props.numStops
        };
    }

    _onPress = () => {
        if (this.state.numStops > 1) {
            // this.props.navigator.push({
            //     title: "Stops Left",
            //     component: StopCountdownScreen,
            //     passProps: {
            //         currentDirection: this.state.currentDirection, 
            //         routeDetails: this.state.routeDetails, 
            //         transitDetails: this.state.transitDetails, 
            //         numStops: this.state.numStops - 1
            //     }
            // });
            this.state.numStops = this.setState({numStops: this.state.numStops - 1});
        } else {

            this.state.routeDetails.shift();
            var nextDirection = this.state.routeDetails[0];
            if (nextDirection.type == "WALKING") {
                var WalkingDirectionScreen = require('./walkingdirection.ios.js');
                this.props.navigator.push({
                    title: "Walking",
                    component: WalkingDirectionScreen,
                    passProps: {routeSteps: this.state.routeDetails}
                });
            } else {
                var BusInformationScreen = require('./bus.ios.js');
                this.props.navigator.push({
                    title: "Bus",
                    component: BusInformationScreen,
                    passProps: {currentDirection: nextDirection, routeDetails: this.state.routeDetails}
                });
            }
        }
    }

    // _getCurrentLocation = () => {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             this.setState({currentPosition: position});

    //             var destinationCoords = {latitude: this.state.steps[0].endLocation.lat, longitude: this.state.steps[0].endLocation.lng};
    //             this.setState({destinationCoords});

    //             var distance = geolib.getDistance(this.state.currentPosition.coords, this.state.destinationCoords, 1, 1);
    //             this.setState({distanceFromObjective: distance});

    //             // threshold for considering the user arrived at destination is 10 meters
    //             if (distance <= 10.0) {
    //                 this._directionPress();
    //             }
    //         },
    //         (error) => {return error},
    //         {enableHighAccuracy: true}
    //     );
    // }

    // componentDidMount() {
    //     this._getCurrentLocation();
    //     this.state.watchID = navigator.geolocation.watchPosition((position) => {
    //         this._getCurrentLocation();
    //     }, (error) => {

    //     }, {enableHighAccuracy: true, distanceFilter: 3, timeout: 250});
    // }

    // componentWillUnmount() {
    //     navigator.geolocation.clearWatch(this.state.watchID);
    // }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={() => this._onPress()}>   
                    <View style={styles.box1}>
                        <Text>{this.state.numStops}</Text>
                        <Text>STOPS</Text>
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

module.exports = StopCountdownScreen;