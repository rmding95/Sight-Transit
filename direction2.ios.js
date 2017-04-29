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

    // constuct a listview of datas on  bluetooths in range
    var bus_ds = new ListView.DataSource(
        {rowHasChanged: (r1, r2) => r1 != r2 }
    );
    // state of the beacon defined
    this.state = {
        bluetoothState: '',
        identifier: "bus_stop_beacon",
        uuid: "e20a39f4-73f5-4bc4-a12f-17d1ad07a961",
        beacon_dataSource: ds.cloneWithRows([])
    }
  }

    // this is a beacon detector, roughly...
    // still need to integrate onto this page dynamically
    // refer to State in react-native...
    componentWillMount() {
        // ask for permission to turn beacon on?
        Beacons.requestWhenInUseAuthorization();

        const region = {
            identifier: "bus_stop_beacon",
            uuid: "e20a39f4-73f5-4bc4-a12f-17d1ad07a961"
        };
        // begin the range detection
        Beacons.startRangingBeaconsInRegion(region);
    }


  _onPress = () => {
        console.log("pressed on continue button");
        this.props.navigator.push({
            title: "Bus",
            component: BusScreen
        });
    }

    componentDidMount() {
        // listen for change and store into state variable
        // if changed, add into key value data pair of all in range
        this.beaconsDidRage = DeviceEventEmitter.addListener(
            'beaconsDidRange', (data) => {
                this.setState(
                    {beacon_dataSource: this.state.beacon_dataSource.cloneWithRows(data.beacons)}
                );
            }
        );
        // listen to bluetooth change state
        // and on change set state to the one found
        BluetoothState.subscribe(
            bluetoothState => {
                this.setState({bluetoothState: bluetoothState});
            }
        );
        BluetoothState.initialize();
    }

    // unmounts the detection to nothing
    componentWillUnMount() {
        this.beaconsDidRage = null;
    }

    render() {
        // changes the two variable to the one defined in state
        const {bluetoothState, beacon_dataSource} = this.state;
        return (
            <View style={styles.container}>
                {/*<TouchableHighlight onPress={() => this._onPress()}>
                </TouchableHighlight>*/}
                    <Text>
                        Bluetooth connection status: {bluetoothState ? bluetoothState : 'NA'}
                    </Text>
                    <Text>
                        All beacons in the area
                    </Text>
                    {/*<ListView
                        style={styles.list}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => <Text style={{textAlign: 'center'}}>{rowData}</Text>}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}
                        initialListSize={15}
                        //onEndReach={redirect}
                        />}
                    />*/}

                    <ListView
                        dataSource={beacon_dataSource}
                        enableEmptySections={true}
                        renderRow={this.renderRow}
                    />
            </View>
        );
    }

    renderRow = rowData => {
        return (
            <View>
                <Text>
                    UUID: {rowData.uuid ? rowData.uuid : 'NA'}
                </Text>
                <Text>
                    Major: {rowData.major ? rowData.major : 'NA'}
                </Text>
                <Text>
                    Minor: {rowData.minor ? rowData.minor : 'NA'}
                </Text>
                <Text>
                    Distance: {rowData.rssi ? rowData.accuracy.rssi : 'NA'}m
                </Text>
                <Text>
                    Proximity: {rowData.proximity ? rowData.proximity : 'NA'}m
                </Text>
                <Text>
                    Distance: {rowData.accuracy ? rowData.accuracy.toFixed(2) : 'NA'}m
                </Text>
            </View>
        )
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