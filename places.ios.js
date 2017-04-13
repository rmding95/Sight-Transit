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


class PlacesScreen extends Component {
    render() {
        return (
          <View style={styles.container} accessible={true} accessibilityLabel={'Home'}>
            <View style={styles.box1}>
              <Text style={{fontSize: 36,fontWeight: 'bold',color: '#fff',fontFamily: 'APHont'}}>HOME</Text>
            </View>
            <View style={styles.box2} accessible={true} accessibilityLabel={'School'}>
              <Text style={{fontSize: 36,fontWeight: 'bold',color: '#f9ec00',fontFamily: 'APHont'}}>SCHOOL</Text>
            </View>
            <View style={styles.box3} accessible={true} accessibilityLabel={'Work'}>
              <Text style={{fontSize: 36,fontWeight: 'bold',color: '#2a2a2a',fontFamily: 'APHont'}}>WORK</Text>
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
  }
});

module.exports = PlacesScreen;
