import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView
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
      routeSteps: routeInfo.routeSteps
    };
  }

    _onPress = () => {
        if (routeSteps[0].type === "WALKING") {
            this.props.navigator.replace({
                title: "Walking",
                component: WalkingDirectionScreen,
                passProps: {routeSteps: this.state.routeSteps}
            });
        } else {
            // THIS DOES NOT WORK 
            this.props.navigator.replace({
                title: "Bus",
                component: BusDirectionScreen,
                passProps: {routeDetails: this.state.routeSteps}
            });
        }
    }

    render() {
        return (
            <View style={styles.container} accessible={true} accessibilityLabel={'Direction'}>
                <View style={styles.halfHeight}>
                    <Text style={styles.h1}>Directions to {this.state.destinationName}</Text>
                    <Text style={{fontFamily: 'APHont'}}>{this.state.destinationAddress} </Text>
                    <Text style={{fontFamily: 'APHont'}}>Distance: {this.state.destinationDistance.text}, Duration: {this.state.destinationDuration.text}</Text>
                    <Text style={{fontFamily: 'APHont'}}>Leave at {this.state.destinationDepartureTime.text}, and you'll arrive at {this.state.destinationArrivalTime.text}</Text>
                </View>
                
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text style ={styles.list}>{rowData}</Text>}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
                <Button
                    onPress={() => this._onPress()}
                    title="Continue"
                    accessibilityLabel="Continue"
                />
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
    },
    halfHeight: {
        flex: 0.5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'black',
        marginTop: 144,
        marginLeft: 30
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'APHont'
    },
    list: {
        marginLeft:30,
        fontFamily: 'APHont',
        fontSize: 16
    },
    separator: {
        marginTop: 30,
        marginBottom: 30,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderWidth: 1,
        borderBottomColor: '#2a2a2a',
        width:414

    }
});

module.exports = DirectionScreen;