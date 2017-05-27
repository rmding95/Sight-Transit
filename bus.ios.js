import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView
} from 'react-native';
var BusArrivalScreen = require('./busarrival.ios.js');

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

    _onPress = () => {
        this.props.navigator.push({
            title: "BusArrival",
            component: BusArrivalScreen,
            passProps: {currentDirection: this.state.currentDirection, routeDetails: this.state.routeDetails, transitDetails: this.state.transitDetails}
        });
    }

    render() {
        return (
            <View style={styles.container} accessible={true} accessibilityLabel={'Bus'}>
                <View style={styles.halfHeight}>
                    <Text>Your next bus {this.state.transitDetails.line.short_name}</Text>
                    <Text>Arrives at {this.state.transitDetails.arrivalTime.text} </Text>
                </View>
                
                <Button
                    onPress={() => this._onPress()}
                    title="Alert Drivers"
                    accessibilityLabel="Alert Drivers"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 90,
        flex: 1,
    },
    halfHeight: {
        flex: 0.5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'black'
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

    }
});

module.exports = BusInformationScreen;