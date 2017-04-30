'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
    Button,
    NativeAppEventEmitter
} from 'react-native';

var DirectionScreen = require('./direction.ios.js');
var SpeechToText = require('react-native-speech-to-text-ios');
var googlePlaceApiKey = "AIzaSyBb7lDyjRIlU7STXU8d4WueMDk5bI3sxrU";

// this page allows users to input their destination
// todo: style is a bit off... navigator bar requires margin. smh.
// gonna have to look back on flexbox. 

// i do believe tripentry.ios.js is no longer needed. although,
// this page isn't necessary either.

//Google Place API Key: AIzaSyBb7lDyjRIlU7STXU8d4WueMDk5bI3sxrU
// this page isn't necessary either if the other is kept.
class DestinationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' , talking: false};
    }

   _onPress = (location) => {
        console.log("pressed on continue button");
        this.props.navigator.push({
        title: "Direction",
        component: DirectionScreen,
        passProps: {myProp: location}
        });
   }

   _talk = () => {
       if (this.state.talking) {
           this.state.talking = false;
           SpeechToText.finishRecognition();
           // confirm destination with user 

           // send request to google place api

       } else {
           this.state.talking = true;
           SpeechToText.startRecognition("en-US");
       }
   }

   componentDidMount() {
       navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                this.setState({initialPosition});
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
       );
       this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            this.setState({lastPosition});
        });

        this.subscription = NativeAppEventEmitter.addListener(
            'SpeechToText',
            (result) => {
                if (result.error) {
                    alert(JSON.stringify(result.error));
                } else if (result.isFinal) {
                    this.setState({talkingResult: result.bestTranscription.formattedString});
                    var list = callGooglePlaceApi(this.state.talkingResult, this.state.initialPosition);
                }        
            }
        );
   }

   componentWillUnmount() {
       navigator.geolocation.clearWatch(this.watchID);

        if (this.subscription != null) {
            this.subscription.remove();
            this.subscription = null;
        }
   }

    render() {
        return (
            <View style={styles.container} accessible={true} accessibilityLabel={'Destination'}>
                <View>
                    <Text> Where are you headed? </Text>
                    <Text> {this.state.initialPosition} </Text>
                    <Text> Result: {this.state.talkingResult} </Text>
                </View>

                <Button
                    onPress={() => this._talk()}
                    title="Press to Talk"
                    accessibilityLabel="Continue"
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

async function callGooglePlaceApi(query, initialPosition) {
    var coords = JSON.parse(initialPosition);
    var baseUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
    // might want to check if we get the initial position
    var lat = coords.coords.latitude;
    var long = coords.coords.longitude;
    var url = baseUrl + query + "&location=" + lat + "," + long + "&key=" + googlePlaceApiKey;
    console.log(url);
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 100
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
