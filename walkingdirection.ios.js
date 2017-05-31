import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  NavigatorIOS,
  TouchableHighlight,
  Vibration
} from 'react-native';
var striptags = require('striptags');
var geolib = require('geolib');

class WalkingDirectionScreen extends Component {

    constructor(props) {
        super(props);
        var leg = props.routeSteps[0];
        var steps = [];
        leg.substeps.forEach(function(element) {
            if (element.description.includes("<div")) {
                var splitIndex = element.description.indexOf("<div");
                var firstStep = striptags(element.description.substr(0, splitIndex));
                var secondStep = striptags(element.description.substr(splitIndex));
                steps.push({description: firstStep + '\n\n' + secondStep, endLocation: element.endLocation});

            } else {
                steps.push({description: striptags(element.description), endLocation: element.endLocation});
            }
        }, this);
        this.state = {
            currentDirection: props.routeSteps[0],
            routeDetails: props.routeSteps,
            steps: steps,
            watchID: null,
            currentPosition: 0,
            lastPosition: 0,
            distanceFromObjective: 0,
            destinationCoords: 0,
            destinationName: props.destinationName,
            startAddress: props.startAddress
        };
    }

    _onPress = () => {
        if (this.state.routeDetails.length == 1) {
            var FinalArrivalScreen = require('./finalarrival.ios.js');
            this.props.navigator.replace({
                title: "You Have Arrived",
                component: FinalArrivalScreen,
                passProps: {destinationName: this.state.destinationName, startAddress: this.state.startAddress}
            });
        } else {
            var DirectionDetailScreen = require('./directiondetail.ios.js');
            this.props.navigator.replace({
                title: "Distance From Stop",
                component: DirectionDetailScreen,
                passProps: {currentDirection: this.state.currentDirection, routeDetails: this.state.routeDetails, destinationName: this.state.destinationName, startAddress: this.state.startAddress}
            });
        }
    }

    _directionPress = () => {
        if (this.state.steps.length == 1) {
            this._onPress();
        } else {
            Vibration.vibrate();
            this.state.steps.shift();
            this.setState({steps: this.state.steps});
        }
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({currentPosition: position});

                var destinationCoords = {latitude: this.state.steps[0].endLocation.lat, longitude: this.state.steps[0].endLocation.lng};
                this.setState({destinationCoords});

                var distance = geolib.getDistance(this.state.currentPosition.coords, this.state.destinationCoords, 1, 1);
                this.setState({distanceFromObjective: distance});

                if (distance <= 10.0) {
                    this._directionPress();
                }
            },
            (error) => {return error},
            {enableHighAccuracy: true}
        );
        this.state.watchID = navigator.geolocation.watchPosition((position) => {
                this.setState({currentPosition: position});

                var destinationCoords = {latitude: this.state.steps[0].endLocation.lat, longitude: this.state.steps[0].endLocation.lng};
                this.setState({destinationCoords});

                var distance = geolib.getDistance(this.state.currentPosition.coords, this.state.destinationCoords, 1, 1);
                this.setState({distanceFromObjective: distance});

                if (distance <= 10.0) {
                    this._directionPress();
                }

        }, (error) => {

        }, {enableHighAccuracy: true, distanceFilter: 3, timeout: 250});
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.state.watchID);
    }

    render() {
        return (
            <View style={styles.container}> 
                <TouchableHighlight onPress={() => this._directionPress()}>
                    <View style={styles.content} accessible={true} accessibilityLabel={this.state.steps[0].description}>
                        <Text style={styles.directions}>{this.state.steps[0].description}</Text>                      
                    </View>
                </TouchableHighlight>
                <View style={styles.content} accessible={true} accessibilityLabel={'You are ' + this.state.distanceFromObjective + ' meters away'}>
                    <Text style={styles.directions} accessible={true}>You are {this.state.distanceFromObjective} meters away</Text>
                </View>     
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        padding: 20
    },
    halfHeight: {
        flex: 0.5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'black',
        marginTop: 100
    },
    content: {
        marginTop: 100,
    },
    directions: {
        fontFamily: 'APHont',
        fontSize: 32
    }
});

module.exports = WalkingDirectionScreen;
