import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';
var OnBoardScreen = require('./onboard.ios.js');

class BusArrivalScreen extends Component {

  constructor(props) {
    super(props);
  }
  /*static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }*/

  /*constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
  }

  _onForward() {
    this.props.navigator.push({
      title: 'Scene ' + nextIndex,
    });
  }*/

  _onPress = () => {
    console.log("press");
    this.props.navigator.push({
      title: "On Board",
      component: OnBoardScreen
    });
  }

  render() {
    return (
      <View style={styles.container} accessible={true} accessibilityLabel={'Your bus is arriving'}>
          <TouchableHighlight onPress={() => this._onPress()}>
            <View>
            <Text style={styles.title}>
                Arriving . . .
            </Text>
            <Text style={styles.distance}>
              71
            </Text>
            <Text style={styles.measure}>
              BUS
            </Text>
            </View>
        </TouchableHighlight>
      </View>
    );
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
  },
});

module.exports = BusArrivalScreen;