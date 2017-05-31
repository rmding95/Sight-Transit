import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView
} from 'react-native';
import BeaconBroadcast from 'react-native-ibeacon-simulator';

var BusArrivalScreen = require('./busarrival.ios.js');

// TODO: i'd argue we don't need an ALERT DRIVER button
// it should be automated in that, if the user is looking for X bus,
// the signal should be sent within the phone itself
// thus why I made it signal before pressing the button...
// we need to work on this page since the OBA API has not been called yet
class BusInformationScreen extends Component {

    constructor(props) {
        super(props);
        var transitDetails = props.currentDirection.transitDetails;
        this.state = {
            currentDirection: props.currentDirection,
            routeDetails: props.routeDetails,
            transitDetails: transitDetails,
            destinationName: props.destinationName,
            startAddress: props.startAddress,
            timer: 10
        };
    }

    componentWillMount() {
        // const uuid = "e20a39f4-73f5-4bc4-a12f-17d1ad07a961"; // this is the bus_stop's
        const uuid = "2d3d4821-9c64-4b3d-81d6-5b3d9ba6eab1"; // this is the phone's uuid... in real world need to create a unique one per DL
        const identifier = "user_beacon";
        const major = 0;
        const minor = 256;
        BeaconBroadcast.startAdvertisingBeaconWithString(uuid, identifier, major, minor);
    }

    componentDidMount() {
        var timerID = setInterval( () => {
            this.setState({
                timer: this.state.timer - 1
            })
            }, 1000)
        this.setState({
            timerID: timerID
        });
    }

    componentDidUpdate() {
        if (this.state.timer < 1) {
            clearInterval(this.state.timerID);
            
            this.props.navigator.replace({
                title: "Bus Arrival",
                component: BusArrivalScreen,
                passProps: {currentDirection: this.state.currentDirection, routeDetails: this.state.routeDetails, transitDetails: this.state.transitDetails, destinationName: this.state.destinationName, startAddress: this.state.startAddress}
            });
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.halfHeight} accessible={true} accessibilityLabel={'Your next bus ' + this.state.transitDetails.line.short_name + ' arrives at ' + this.state.transitDetails.arrivalTime.text}>
                    <Text style={styles.details}>Your next bus {this.state.transitDetails.line.short_name}</Text>
                    <Text style={styles.details}>Arrives in {this.state.transitDetails.arrivalTime.text} minutes</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1
    },
    halfHeight: {
        marginTop: 120,
        marginLeft: 30
    },
    h1: {
        fontSize: 24,
        fontFamily: 'APHont'
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'APHont',
        marginTop: 20
    },
    distance: {
        fontSize: 70,
        fontFamily: 'APHont',
        marginTop: 120
    },
    duration: {
        fontSize: 70,
        fontFamily: 'APHont'
    },
    list: {
        marginLeft:30,
        fontFamily: 'APHont',
        fontSize: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'black'
    },
    separator: {
        marginTop: 30,
        marginBottom: 30,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderWidth: 1,
        borderTopColor: '#2a2a2a',
        width:414

    },
    details: {
        fontFamily: 'APHont',
        fontSize: 24   
    }
});

module.exports = BusInformationScreen;