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
            steps.push({description: striptags(element.description), endLocation: element.endLocation});
        }, this);
        this.state = {
            currentDirection: props.routeSteps[0],
            routeDetails: props.routeSteps,
            steps: steps,
            watchID: null,
            currentPosition: 0,
            lastPosition: 0,
            distanceFromObjective: 0,
            destinationCoords: 0
        };
    }

    _onPress = () => {
        if (this.state.routeDetails.length == 1) {
            var HomeScreen = require('./home.ios.js');
            this.props.navigator.push({
                title: "Home",
                component: HomeScreen
            });
        } else {
            var DirectionDetailScreen = require('./directiondetail.ios.js');
            this.props.navigator.push({
                title: "Distance From Stop",
                component: DirectionDetailScreen,
                passProps: {currentDirection: this.state.currentDirection, routeDetails: this.state.routeDetails}
            });
        }
    }

    // on press got called 3 times???
    _directionPress = () => {
        if (this.state.steps.length == 1) {
            this._onPress();
        } else {
            Vibration.vibrate();
            this.state.steps.shift();
            this.setState({steps: this.state.steps});
        }
    }

    _getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({currentPosition: position});

                var destinationCoords = {latitude: this.state.steps[0].endLocation.lat, longitude: this.state.steps[0].endLocation.lng};
                this.setState({destinationCoords});

                var distance = geolib.getDistance(this.state.currentPosition.coords, this.state.destinationCoords, 1, 1);
                this.setState({distanceFromObjective: distance});

                // threshold for considering the user arrived at destination is 10 meters
                if (distance <= 10.0) {
                    this._directionPress();
                }
            },
            (error) => {return error},
            {enableHighAccuracy: true}
        );
    }

    componentDidMount() {
        this._getCurrentLocation();
        this.state.watchID = navigator.geolocation.watchPosition((position) => {
            this._getCurrentLocation();
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
                    <View style={styles.content} accessible ={true} accessibilityLabel={this.state.steps[0].description}>
                        <Text>{this.state.steps[0].description}</Text>
                    </View>
                </TouchableHighlight>                
        
                <Button
                    onPress={() => this._onPress()}
                    title="Continue"
                    accessibilityLabel="Continue"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
    },
    halfHeight: {
        flex: 0.5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'black',
        marginTop: 100
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20
    },
    separator: {
        height: 1,
        margin: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'gray'
    },
    content: {
        marginTop: 100,
    }
});

module.exports = WalkingDirectionScreen;
