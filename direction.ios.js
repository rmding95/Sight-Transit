import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  TouchableHighlight
} from 'react-native';

var WalkingDirectionScreen = require('./walkingdirection.ios.js');

// this is the initial confirmation of destination
// todo: directions are not dynamic (walk, bus, walk)
// pull from google maps and fed here
// style is a bit weird here as well.
// issue adding border to each list item when it works fine in another page...

// look into creating custom component that takes in route data and returns listview of instructions
class DirectionScreen extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var routeDetails = JSON.parse(props.routeDetails);
    var legs = routeDetails.routes[0].legs;
    routeInfo = processGoogleData(legs);
    this.state = {
      dataSource: ds.cloneWithRows(routeInfo.routePreview),
      destinationName: props.destinationName,
      destinationArrivalTime: legs[0].arrival_time,
      destinationDepartureTime: legs[0].departure_time,
      destinationDistance: legs[0].distance,
      destinationDuration: legs[0].duration,
      destinationAddress: legs[0].end_address,
      startAddress: legs[0].start_address,
      routeSteps: routeInfo.routeSteps
    };
  }

    _onPress = () => {
        if (routeSteps[0].type === "WALKING") {
            this.props.navigator.replace({
                title: "Walking",
                component: WalkingDirectionScreen,
                passProps: {routeSteps: this.state.routeSteps, destinationName: this.state.destinationName, startAddress: this.state.startAddress}
            });
        } else {
            var BusInformationScreen = require('./busarrival.ios.js');
            this.props.navigator.replace({
                title: "Bus",
                component: BusInformationScreen,
                passProps: {routeDetails: this.state.routeSteps, currentDirection: this.state.routeSteps[0], destinationName: this.state.destinationName, startAddress: this.state.startAddress}
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.halfHeight} accessible={true} accessibilityLabel={'Directions to ' + this.state.destinationName 
            + '. It is ' + this.state.destinationDistance.text + ' away and will take ' + this.state.destinationDuration.text}>
                    <Text style={styles.h1}>Directions to {this.state.destinationName}</Text>
                    <Text style={styles.h2}>{this.state.destinationAddress}</Text>
                    <Text style={styles.distance}>{this.state.destinationDistance.text}</Text>
                    <Text style={styles.duration}>{this.state.destinationDuration.text}</Text> 
                </View>

                <TouchableHighlight onPress={() => this._onPress()}>
                  <View style={styles.box1} accessible={true} accessibilityLabel={'Continue'}>
                    <Text style={{fontSize: 24,fontWeight: 'bold',color: '#fff',fontFamily: 'APHont'}}>CONTINUE</Text>
                  </View>
                </TouchableHighlight>
            </View>
        );
    }
}

function processGoogleData(legs) {
    routeSteps = [];
    routePreview = [];
    legs.forEach(function(element) {
        element.steps.forEach(function(step) {
            routePreview.push(step.html_instructions);
            direction = {
                distance: step.distance, 
                duration: step.duration,
                endLocation: step.end_location,
                startLocation: step.start_location,
                description: step.html_instructions,
                type: step.travel_mode,
                substeps: [],
            };
            if (direction.type === "WALKING") {
                step.steps.forEach(function(substep) {
                    detailedSteps = {
                        distance: substep.distance,
                        duration: substep.duration,
                        endLocation: substep.end_location,
                        description: substep.html_instructions,
                        startLocation: substep.start_location,
                        maneuver: substep.maneuver
                    };
                    direction.substeps.push(detailedSteps);
                }, this)
            } else {
                transitDetails = {
                    arrivalStop: step.transit_details.arrival_stop,
                    arrivalTime: step.transit_details.arrival_time,
                    departureTime: step.transit_details.departure_time,
                    departureStop: step.transit_details.departure_stop,
                    headsign: step.transit_details.headsign,
                    line: step.transit_details.line,
                    numStops: step.transit_details.num_stops
                };
                direction["transitDetails"] = transitDetails;
            }
            routeSteps.push(direction);
        }, this);
    }, this);
    return {routeSteps: routeSteps, routePreview: routePreview};
}

// border not working for seperator, will have to look into it later
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        justifyContent: 'space-between'
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
    box1: {
        backgroundColor: '#2a2a2a',
        height: 100,
        justifyContent: 'center', 
        alignItems: 'center' 
    }
});

module.exports = DirectionScreen;