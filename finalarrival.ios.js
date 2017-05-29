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

class FinalArrivalScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      destinationName: props.destinationName,
      startAddress: props.startAddress
    };
  }

  _onPress = () => {
    this.props.navigator.pop();
  }

  _reverse = () => {

  }

  render() {
    return (
      <View style={styles.container} accessible={true} accessibilityLabel={'You have arrived at'}>

          <View>
            <Text style={styles.title}>
                You have arrived at {this.state.destinationName}
            </Text>
          </View>

          <TouchableHighlight onPress={() => this._reverse()}>
              <View style={styles.box2} accessible={true} accessibilityLabel={'Yes'}>
                <Text style={{fontSize: 60,fontWeight: 'bold',color: '#fff',fontFamily: 'APHont'}}>YES</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this._onPress()}>
              <View style={styles.box3} accessible={true} accessibilityLabel={'No'}>
                <Text style={{fontSize: 60,fontWeight: 'bold',color: '#f9ec00',fontFamily: 'APHont'}}>NO</Text>
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
    fontWeight: 'normal',
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
  box2: {
    backgroundColor: '#2a2a2a',
    height: 210,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  box3: {
    backgroundColor: '#0023ff',
    height: 210,
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});

module.exports = FinalArrivalScreen;