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
var PlacesScreen = require('./places.ios.js');

class HomeScreen extends React.Component {

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
    this.props.navigator.push({
      title: "Place",
      component: PlaceScreen
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={[styles.container, styles.top]}>
            <TouchableHighlight onPress={() => this._onPress}>
              <View>
                <Image style={styles.image} source={require('./img/home.png')} />
                <Text style={styles.text}>
                  My Places
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        <View style={[styles.container, styles.bot]}>
          <TouchableHighlight onPress={() => this._onPress}>
            <View>
            <Image style={styles.image} source={require('./img/placeholder.png')} />
            <Text style={styles.text}>
              New Trip
            </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 20,
    marginTop: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    alignItems: 'center'
  },
  top: {

  },
  bot: {
    backgroundColor: '#A9A9A9'
  }
});

module.exports = HomeScreen;