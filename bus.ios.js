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
        transitDetails: transitDetails
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

    _onPress = () => {
        this.props.navigator.replace({
            title: "BusArrival",
            component: BusArrivalScreen,
            passProps: {currentDirection: this.state.currentDirection, routeDetails: this.state.routeDetails, transitDetails: this.state.transitDetails}
        });
    }

    render() {
        return (
            <View style={styles.container} accessible={true} accessibilityLabel={'Your next bus ' + this.state.transitDetails.line.short_name + ' arrives at ' + this.state.transitDetails.arrivalTime.text}>
                <View style={styles.halfHeight}>
                    <Text>Your next bus {this.state.transitDetails.line.short_name}</Text>
                    <Text>Arrives at {this.state.transitDetails.arrivalTime.text} </Text>
                </View>
                
                <Button
                    onPress={() => this._onPress()}
                    title="Alert Drivers"
                    accessibilityLabel="Alert Driver"
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

    }
});

module.exports = BusInformationScreen;