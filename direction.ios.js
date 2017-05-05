import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView
} from 'react-native';

var Direction1Screen = require('./direction1.ios.js');

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
    routeSteps = [];
    legs.forEach(function(element) {
        element.steps.forEach(function(step) {
            routeSteps.push(step.html_instructions);
        }, this);
    }, this);
    this.state = {
      dataSource: ds.cloneWithRows(routeSteps),
      destinationName: props.destinationName,
      destinationArrivalTime: legs[0].arrival_time,
      destinationDepartureTime: legs[0].departure_time,
      destinationDistance: legs[0].distance,
      destinationDuration: legs[0].duration,
      destinationAddress: legs[0].end_address
    };
    console.log(this.state.dataSource);
  }

    _onPress = () => {
        console.log("pressed on continue button");
        this.props.navigator.push({
            title: "Direction",
            component: Direction1Screen
        });
    }

    render() {
        return (
            <View style={styles.container} accessible={true} accessibilityLabel={'Direction'}>
                <View style={styles.halfHeight}>
                    <Text>Directions To {this.state.destinationName}</Text>
                    <Text>At {this.state.destinationAddress} </Text>
                    <Text>Distance: {this.state.destinationDistance.text}, Duration: {this.state.destinationDuration.text}</Text>
                    <Text>Leave at {this.state.destinationDepartureTime.text} and arrive at {this.state.destinationArrivalTime.text}</Text>
                </View>
                
                <ListView
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text style={{textAlign: 'center'}}>{rowData}</Text>}
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

    }
});

module.exports = DirectionScreen;