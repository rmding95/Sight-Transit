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
            <View style={styles.container} accessible={true} accessibilityLabel={'You have 7 stops left'}>
              <TouchableHighlight onPress={() => this._onPress()}>
                <View>
                <Text style={styles.distance}>
                  {this.state.numStops}
                </Text>
                <Text style={styles.measure}>
                  STOPS LEFT
                </Text>
                </View>
            </TouchableHighlight>
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