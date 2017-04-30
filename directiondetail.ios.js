import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  DeviceEventEmitter,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';
import Beacons                from 'react-native-beacons-manager';
import BluetoothState         from 'react-native-bluetooth-state';
var Direction2 = require('./direction2.ios.js');

class DirectionDetailScreen extends Component {

  constructor(props) {
    super(props);

    // constuct a listview of datas on  bluetooths in range
    var ds = new ListView.DataSource(
        {rowHasChanged: (r1, r2) => r1 != r2 }
    );
    // state of the beacon defined
    this.state = {
        bluetoothState: '',
        identifier: "bus_stop_beacon",
        uuid: "e20a39f4-73f5-4bc4-a12f-17d1ad07a961",
        beacon_dataSource: ds.cloneWithRows([]),
        arrived: 'false'
    }
  }

  _onPress = () => {
    console.log("press");
    this.props.navigator.push({
      title: "Place",
      component: Direction2
    });
  }

  // initialize authorization and
  // start range for the beacon detection
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

  // listen for change in beacon detection and
  // determine wheter bluetooth is available
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

    var distance = this.state.beacon_dataSource.accuracy;
    console.log("distance = " + distance);
    if (distance > 0.0 && distance < 1.5) {
        this.setState({arrived: true});
    }

    // listen to bluetooth change state
    // and on change set state to the one found
    BluetoothState.subscribe(
        bluetoothState => {
            this.setState({bluetoothState: bluetoothState});
        }
    );
    BluetoothState.initialize();
  }

  // remove component
  componentWillUnMount() {
    this.beaconsDidRange = null;
  }

  render() {
    const {bluetoothState, beacon_dataSource, arrived} = this.state;

    if (arrived) {
      return (
        <View style={styles.container} accessible={true} accessibilityLabel={'You have arrived at your stop'}>
            <TouchableHighlight onPress={() => this._onPress()}>
              <View>
              <Text style={styles.title}>
                You have {"\n"}
                arrived at
              </Text>
              <Text style={styles.distance}>

              </Text>
              <Text>Distance = {beacon_dataSource.accuracy}</Text>
              <Text style={styles.measure}>
                YOUR STOP
              </Text>
              </View>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
      <View style={styles.container} accessible={true}
      accessibilityLabel={'Your stop is in' + (beacon_dataSource.accuracy? beacon_dataSource.accuracy.toFixed(0) : 'not found')}>
        {/*<TouchableHighlight onPress={() => this._onPress()}>
        </TouchableHighlight>*/}
          <Text>
              Bluetooth connection status: {bluetoothState ? bluetoothState : 'N/A'}
          </Text>
          <ListView
              dataSource={beacon_dataSource}
              enableEmptySections={true}
              renderRow={this.renderRow}
          />
        </View>
      );
    }
}

  // Renders the row listing in the display of user
  // approaching the bus stop
  // TODO: we might need to handle going in the wrong direction...
  // but let's assume the users do the right thing FIRST.
  renderRow = rowData => {
      var range = rowData.proximity ? rowData.proximity : 'N/A';
      // by definition:
      // immediate < 0.3m
      // near < 5.0m
      // far > 5.0m
      // if (range == 'immediate' || range == 'near') {
      //     range = 'Approaching bus stop in: ';
      // }
      return (
          <View>
              <Text style={styles.title}>
                  Your stop{"\n"}
                  is in
              </Text>
              <Text style={styles.distance}>
                  {rowData.accuracy ? rowData.accuracy.toFixed(0) : 'not found'}
              </Text>
              <Text style={styles.measure}>
                  FEET
              </Text>
          </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0023ff'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f9ec00',
    fontFamily: 'APHont',
    marginTop: 100,
    marginLeft: 30
  },
  distance: {
    fontSize: 150,
    fontWeight: 'bold',
    color: '#f9ec00',
    fontFamily: 'APHont',
    marginTop: 175,
    marginLeft: 30
  },
  measure: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#f9ec00',
    fontFamily: 'APHont',
    marginLeft: 30
  }
});

module.exports = DirectionDetailScreen;