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

class FinalArrivalScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        currentDirection: props.currentDirection,
        routeDetails: props.routeDetails,
        transitDetails: props.transitDetails
    };
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
    this.props.navigator.replace({
      title: "On Board",
      component: OnBoardScreen,
      passProps: {currentDirection: this.state.currentDirection, routeDetails: this.state.routeDetails, transitDetails: this.state.transitDetails}
    });
  }

  render() {
    return (
      <View style={styles.container} accessible={true} accessibilityLabel={'You have arrived at'}>
          <TouchableHighlight onPress={() => this._onPress()}>
            <View>
            <Text style={styles.title}>
                Arriving At ....
            </Text>
            <Text style={styles.distance}>
              Richard Senpai, please pass me prop
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
    fontWeight: 'regular',
    color: '#f9ec00',
    fontFamily: 'APHont',
    marginTop: 100,
    marginLeft: 30
  },
  distance: {
    fontSize: 36,
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

module.exports = FinalArrivalScreen;