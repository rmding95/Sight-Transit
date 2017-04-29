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
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
var SpeechToText = require('react-native-speech-to-text-ios');

// this page allows users to input their destination
// todo: style is a bit off... navigator bar requires margin. smh.
// gonna have to look back on flexbox. 

// i do believe tripentry.ios.js is no longer needed. although,
// this page isn't necessary either.

//Google Place API Key: AIzaSyBb7lDyjRIlU7STXU8d4WueMDk5bI3sxrU
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
                } else {
                    console.log(result.bestTranscription.formattedString);
                }        
            }
        );

        SpeechToText.startRecognition("en-US");
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
                </View>

                <GooglePlacesAutocomplete
                    styles={{
                        textInputContainer: {
                        borderTopWidth: 50,
                        borderBottomWidth:0
                        },
                        textInput: {
                        marginLeft: 0,
                        marginRight: 0,

                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16
                        },
                        predefinedPlacesDescription: {
                        color: '#1faadb'
                        },
                    }}
                    placeholder='Search'
                    minLength={2}
                    autoFocus={true}
                    listViewDisplayed='auto'
                    fetchDetails={true}
                    renderDescription={(row) => row.description}
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    console.log(data);
                    console.log(details);
                    }}
                    query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyBb7lDyjRIlU7STXU8d4WueMDk5bI3sxrU',
                    language: 'en', // language of the results
                    types: '(geocode)', // default: 'geocode'
                    }}
                    styles={{
                    description: {
                        fontWeight: 'bold',
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                    }}

                    currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance'
                    }}
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
