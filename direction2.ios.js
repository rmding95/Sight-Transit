import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Button,
  TouchableHighlight,
  DeviceEventEmitter
} from 'react-native';
import Beacons                from 'react-native-beacons-manager';
import BluetoothState         from 'react-native-bluetooth-state';
var BusScreen = require('./bus.ios.js');
// this page is for the arrival at destination

// todo: for somse reason, the padding is having some issues
// it cuts off the list...

// for now, it is hardcoded and not dynamic like the direction.ios.js
class Direction2Screen extends Component {
  constructor(props) {
    super(props);

    const getRowData = (dataBlob, rowId) => dataBlob[`${rowId}`];
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2},
        getRowData);
    this.state = {
      dataSource: ds.cloneWithRows(['Turn right at 15th Ave NE',
                                    'Slight right onto 16th Ave NE',
                                    'Your destination will be on the left'])
    };
  }

  _onPress = () => {
        console.log("pressed on continue button");
        this.props.navigator.push({
            title: "Bus",
            component: BusScreen
        });
    }

    render() {
        return (
            <Text>
                You have arrived at your stop.
            </Text>  
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        //marginTop: 100,
        flexDirection: 'row',
        paddingLeft: 20
    },
    separator: {
        height: 1,
        margin: 40,
        backgroundColor: '#8E8E8E'
    }
});

module.exports = Direction2Screen;