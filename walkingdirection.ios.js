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

// Add direction monitoring of the user's progress
class WalkingDirectionScreen extends Component {

    constructor(props) {
        super(props);
        var leg = props.routeSteps[0];
        var steps = [];
        leg.substeps.forEach(function(element) {
            steps.push(striptags(element.description));
        }, this);
        this.state = {
            currentDirection: props.routeSteps[0],
            routeDetails: props.routeSteps,
            steps: steps,
            watchID: null,
            initialPosition: null,
            lastPosition: null
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

    _directionPress = () => {
        if (this.state.steps.length == 1) {
            this._onPress();
        } else {
            Vibration.vibrate();
            this.state.steps.shift();
            this.setState({steps: this.state.steps});
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                this.setState({initialPosition});
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true}
        );
        this.state.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            this.setState({lastPosition});
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
                    <View style={styles.content}>
                        <Text>{this.state.steps[0]}</Text>
                    </View>
                </TouchableHighlight>                
                <Text>{this.state.lastPosition}</Text>
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