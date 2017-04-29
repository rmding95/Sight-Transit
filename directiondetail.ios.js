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

var Direction2 = require('./direction2.ios.js');

class DirectionDetailScreen extends Component {

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
      title: "Place",
      component: Direction2
    });
  }

  render() {
    return (
      <View style={styles.container} accessible={true} accessibilityLabel={'Your stop is in 30 feet'}>
          <TouchableHighlight onPress={() => this._onPress()}>
            <View>
            <Text style={styles.title}>
              Your stop{"\n"}
              is in
            </Text>
            <Text style={styles.distance}>
              30
            </Text>
            <Text style={styles.measure}>
              FEET
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

module.exports = DirectionDetailScreen;