import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
   Button
} from 'react-native';

var DirectionScreen = require('./direction.ios.js');

// this page allows users to input their destination
// todo: style is a bit off... navigator bar requires margin. smh.
// gonna have to look back on flexbox. 
class DestinationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
  }

   _onPress = (location) => {
     console.log("pressed on continue button");
     this.props.navigator.push({
       title: "Direction",
       component: DirectionScreen,
       passProps: {myProp: location}
     });
   }

    render() {
        return (
            <View style={styles.container} accessible={true} accessibilityLabel={'Destination'}>
                <View>
                    <Text> Where are you headed? </Text>
                </View>

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />

                <Button
                    onPress={() => this._onPress(this.state.text)}
                    title="Continue"
                    accessibilityLabel="Continue"
                />
          </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    txt: {
        flex: 0.5
    },
    input: {
        margin: 25,
        height: 400,
        backgroundColor: '#d3d3d3'
    }
    
});

module.exports = DestinationScreen;
