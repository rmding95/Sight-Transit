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
var BusInformationScreen = require('./bus.ios.js');

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
        arrived: false,
        dsCache: [],
        weightedDistance: -1,
        currentDirection: props.currentDirection,
        routeDetails: props.routeDetails
    }
  }

  _onPress = () => {
    this.state.routeDetails.shift();
    this.props.navigator.push({
      title: "Bus Information",
      component: BusInformationScreen,
      passProps: {currentDirection: this.state.routeDetails[0], routeDetails: this.state.routeDetails}
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

  // weighted average of the most recent 10 accuracy distance
  // in order to get at least a better estimate of location
  // returns the computed avg in feet, otherwise undefined if it cannot
  calculateAverage(distance) {
    var cache = this.state.dsCache;
    var cap = 7;
    if (distance != undefined && distance > 0) {
      cache.push(distance);
    }

    if (cache.length >= cap) {
      var newCache = new Array(cap);
      for (var i = 0; i < cap; i++) {
        newCache[i] = cache[i + 1];
      }
      this.setState({dsCache: newCache});
    } else {
      cap = cache.length;
    }
    var total = 0;
    var ds;
    cache = this.state.dsCache;
    for (ds in cache) {
      if (cache[ds] != undefined) {
        total += cache[ds];
      } else {
        cap--;
      }
    }
    // * 3.28084 gives approx foot conversion
    return (total / cap) * 3.28084;
  }

  // determine whether or not the user has arrived at the bus stop
  // returning true if so, and false if not
  calculateArrival(data) {
    // console.log(data);
    if (data != undefined && data[0] != undefined) {
      var distance = data[0].accuracy;
      var avgResult = this.calculateAverage(distance);

      this.setState({weightedDistance: avgResult});
      if (avgResult > 0 && avgResult < 3.5) {
          return true;
      }
    }
    // default to returning undefined which is no
    // different than false in this context
  }

  // listen for change in beacon detection and
  // determine wheter bluetooth is available
  componentDidMount() {
    // listen for change and store into state variable
    // if changed, add into key value data pair of all in range
    this.beaconsDidRange = DeviceEventEmitter.addListener(
        'beaconsDidRange', (data) => {
            this.setState(
                {beacon_dataSource: this.state.beacon_dataSource.cloneWithRows(data.beacons),
                 arrived: this.calculateArrival(data.beacons)}
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

  // remove component
  componentWillUnMount() {
    this.beaconsDidRange = null;
  }

  render() {
    const {bluetoothState, beacon_dataSource, arrived} = this.state;
    if (arrived || beacon_dataSource.getRowCount() == 0) {
      return (
        <View style={styles.container} accessible={true} accessibilityLabel={'You have arrived at your stop'}>
            <TouchableHighlight onPress={() => this._onPress()}>
              <View>
              <Text style={styles.title}>
                You have {"\n"}
                arrived at
              </Text>
              <Text style={styles.distance}></Text>
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
      return (
          <View>
              <Text style={styles.title}>
                  Your stop{"\n"}
                  is in
              </Text>
              <Text style={styles.distance}>
                  {this.state.weightedDistance != -1 ? this.state.weightedDistance.toFixed(0) : 'N/A'}
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