import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';

var DirectionScreen = require('./direction.ios.js');

class OnBoardScreen extends Component {

    render() {
        return (
          <View style={styles.container} accessible={true} accessibilityLabel={'Home'}>
            <Text style={{fontSize: 20,fontWeight: 'bold',fontFamily: 'APHont', margin: 100}}>Are you on board?</Text>
              <View style={styles.box1}>
                <Image style={styles.image} source={require('./img/002-sound.png')} />
              </View>
          </View>

        );
    }
}


const styles = StyleSheet.create({
  box1: {
    backgroundColor: '#2a2a2a',
    height: 200,
    marginTop: 64,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  box2: {
    backgroundColor: '#0023ff',
    height: 200,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  box3: {
    backgroundColor: '#fff',
    height: 200,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  image: {
    alignItems: 'center',
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 20
  }
});

module.exports = OnBoardScreen;
