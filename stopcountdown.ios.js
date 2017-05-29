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
            numStops: props.numStops,
            destinationName: props.destinationName,
            startAddress: props.startAddress
        };
    }

    componentDidMount() {
        var timerID = setInterval( () => {
            this.setState({
                numStops: this.state.numStops - 1
            })
        }, 1000)
        this.setState({
            timerID: timerID
        });

        // this._getCurrentLocation();
        // this.state.watchID = navigator.geolocation.watchPosition((position) => {
        //     this._getCurrentLocation();
        // }, (error) => {

        // }, {enableHighAccuracy: true, distanceFilter: 3, timeout: 250});
    }

    componentDidUpdate() {
        if (this.state.numStops < 1) {
            clearInterval(this.state.timerID);

            this.state.routeDetails.shift();
            var nextDirection = this.state.routeDetails[0];

            if (nextDirection.type == "WALKING") {
                var WalkingDirectionScreen = require('./walkingdirection.ios.js');
                this.props.navigator.replace({
                    title: "Walking",
                    component: WalkingDirectionScreen,
                    passProps: {routeSteps: this.state.routeDetails, destinationName: this.state.destinationName, startAddress: this.state.startAddress}
                });
            } else {
                var BusInformationScreen = require('./bus.ios.js');
                this.props.navigator.replace({
                    title: "Bus",
                    component: BusInformationScreen,
                    passProps: {currentDirection: nextDirection, routeDetails: this.state.routeDetails, destinationName: this.state.destinationName, startAddress: this.state.startAddress}
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

    // componentWillUnmount() {
    //     navigator.geolocation.clearWatch(this.state.watchID);
    // }

    componentWillUnmount() {
        clearInterval(this.state.timerID);
    }

    render() {
        return (
            <View style={styles.container} accessible={true} accessibilityLabel={'You have ' + this.state.numStops + ' stops left'}>
                <View>
                <Text style={styles.distance}>
                  {this.state.numStops}
                </Text>
                <Text style={styles.measure}>
                  STOPS LEFT
                </Text>
                </View>
          </View>
        );
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
    marginTop: 200,
    marginLeft: 30
  },
  distance: {
    fontSize: 150,
    fontWeight: 'bold',
    color: '#f9ec00',
    fontFamily: 'APHont',
    marginTop: 275,
    marginLeft: 30
  },
  measure: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#f9ec00',
    fontFamily: 'APHont',
    marginLeft: 30
  }
});

module.exports = StopCountdownScreen;