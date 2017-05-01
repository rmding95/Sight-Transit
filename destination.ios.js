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
let googlePlaceApiKey = "AIzaSyBb7lDyjRIlU7STXU8d4WueMDk5bI3sxrU";
let googleDirectionApiKey = "AIzaSyBr8DLoX9-BH052cK8WmY7PiV755QhvolE";

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

        // test data for the next screen
        // var json = { geocoded_waypoints: 
        // [ { geocoder_status: 'OK',
        // place_id: 'ChIJqYuyw4UTkFQRgZeMzMSJDFk',
        // types: [ 'street_address' ] },
        // { geocoder_status: 'OK',
        // place_id: 'ChIJDabxhY8TkFQR6dxBw2qNYmo',
        // types: [ 'premise' ] } ],
        // routes: 
        // [ { bounds: 
        // { northeast: { lat: 47.682495, lng: -122.2903956 },
        // southwest: { lat: 47.6801215, lng: -122.2904514 } },
        // copyrights: 'Map data ©2017 Google',
        // legs: 
        // [ { distance: { text: '0.2 mi', value: 264 },
        // duration: { text: '3 mins', value: 202 },
        // end_address: '7340 35th Ave NE, Seattle, WA 98115, USA',
        // end_location: { lat: 47.682495, lng: -122.2904514 },
        // start_address: '7029 35th Ave NE, Seattle, WA 98115, USA',
        // start_location: { lat: 47.6801215, lng: -122.2903956 },
        // steps: 
        // [ { distance: { text: '0.2 mi', value: 264 },
        // duration: { text: '3 mins', value: 202 },
        // end_location: { lat: 47.682495, lng: -122.2904514 },
        // html_instructions: 'Walk to 7340 35th Ave NE, Seattle, WA 98115, USA',
        // polyline: { points: 'wo_bH~ykiV}EBo@@gA@E?U?cA?M@W?' },
        // start_location: { lat: 47.6801215, lng: -122.2903956 },
        // steps: 
        // [ { distance: { text: '0.2 mi', value: 264 },
        // duration: { text: '3 mins', value: 202 },
        // end_location: { lat: 47.682495, lng: -122.2904514 },
        // html_instructions: 'Head <b>north</b> on <b>35th Ave NE</b> toward <b>NE 73rd St</b><div style="font-size:0.9em">Destination will be on the right</div>',
        // polyline: { points: 'wo_bH~ykiV}EBo@@gA@E?U?cA?M@W?' },
        // start_location: { lat: 47.6801215, lng: -122.2903956 },
        // travel_mode: 'WALKING' } ],
        // travel_mode: 'WALKING' } ],
        // traffic_speed_entry: [],
        // via_waypoint: [] } ],
        // overview_polyline: { points: 'wo_bH~ykiV{MH' },
        // summary: '35th Ave NE',
        // warnings: [ 'Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.' ],
        // waypoint_order: [] } ],
        // status: 'OK' }

        // var json = { geocoded_waypoints: 
        // [ { geocoder_status: 'OK',
        // place_id: 'ChIJqYuyw4UTkFQRgZeMzMSJDFk',
        // types: [ 'street_address' ] },
        // { geocoder_status: 'OK',
        // place_id: 'ChIJdXctU5ITkFQR0V2vrtZU550',
        // types: [ 'premise' ] } ],
        // routes: 
        // [ { bounds: 
        // { northeast: { lat: 47.6899605, lng: -122.290283 },
        // southwest: { lat: 47.679569, lng: -122.2907115 } },
        // copyrights: 'Map data ©2017 Google',
        // fare: { currency: 'USD', text: '$2.50', value: 2.5 },
        // legs: 
        // [ { arrival_time: 
        // { text: '5:20am',
        // time_zone: 'America/Los_Angeles',
        // value: 1493641225 },
        // departure_time: 
        // { text: '5:16am',
        // time_zone: 'America/Los_Angeles',
        // value: 1493640989 },
        // distance: { text: '0.8 mi', value: 1256 },
        // duration: { text: '4 mins', value: 236 },
        // end_address: '8400 35th Ave NE, Seattle, WA 98115, USA',
        // end_location: { lat: 47.68974859999999, lng: -122.2907029 },
        // start_address: '7029 35th Ave NE, Seattle, WA 98115, USA',
        // start_location: { lat: 47.6801471, lng: -122.2903961 },
        // steps: 
        // [ { distance: { text: '230 ft', value: 70 },
        // duration: { text: '1 min', value: 64 },
        // end_location: { lat: 47.6796265, lng: -122.290283 },
        // html_instructions: 'Walk to 35th Ave NE & NE 70th St',
        // polyline: { points: '}o_bH~ykiVrBCK@?U' },
        // start_location: { lat: 47.6801471, lng: -122.2903961 },
        // steps: 
        // [ { distance: { text: '210 ft', value: 64 },
        // duration: { text: '1 min', value: 48 },
        // end_location: { lat: 47.679569, lng: -122.2903844 },
        // html_instructions: 'Head <b>south</b> on <b>35th Ave NE</b>',
        // polyline: { points: '}o_bH~ykiVrBC' },
        // start_location: { lat: 47.6801471, lng: -122.2903961 },
        // travel_mode: 'WALKING' },
        // { distance: { text: '20 ft', value: 6 },
        // duration: { text: '1 min', value: 16 },
        // end_location: { lat: 47.6796265, lng: -122.290283 },
        // html_instructions: 'Make a <b>U-turn</b><div style="font-size:0.9em">Destination will be on the right</div>',
        // maneuver: 'uturn-left',
        // polyline: { points: 'il_bHzykiVK@?U' },
        // start_location: { lat: 47.679569, lng: -122.2903844 },
        // travel_mode: 'WALKING' } ],
        // travel_mode: 'WALKING' },
        // { distance: { text: '0.7 mi', value: 1163 },
        // duration: { text: '2 mins', value: 115 },
        // end_location: { lat: 47.6899605, lng: -122.290611 },
        // html_instructions: 'Bus towards Jackson Park Wedgwood',
        // polyline: { points: 'ul_bHfykiV?T_IHuIDUBgJHm@?_IJq@@kBBQ?mDDuDF{B??Q' },
        // start_location: { lat: 47.6796265, lng: -122.290283 },
        // transit_details: 
        // { arrival_stop: 
        // { location: { lat: 47.6899605, lng: -122.290611 },
        // name: '35th Ave NE & NE 85th St' },
        // arrival_time: 
        // { text: '5:19am',
        // time_zone: 'America/Los_Angeles',
        // value: 1493641177 },
        // departure_stop: 
        // { location: { lat: 47.6796265, lng: -122.290283 },
        // name: '35th Ave NE & NE 70th St' },
        // departure_time: 
        // { text: '5:17am',
        // time_zone: 'America/Los_Angeles',
        // value: 1493641062 },
        // headsign: 'Jackson Park Wedgwood',
        // line: 

        // { agencies: 
        // [ { name: 'Metro Transit',
        // phone: '1 (206) 553-3000',
        // url: 'http://metro.kingcounty.gov/' } ],
        // short_name: '65',
        // url: 'http://metro.kingcounty.gov/schedules/065/n0.html',
        // vehicle: 
        // { icon: '//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png',
        // name: 'Bus',
        // type: 'BUS' } },
        // num_stops: 4 },
        // travel_mode: 'TRANSIT' },
        // { distance: { text: '75 ft', value: 23 },
        // duration: { text: '1 min', value: 17 },
        // end_location: { lat: 47.68974859999999, lng: -122.2907029 },
        // html_instructions: 'Walk to 8400 35th Ave NE, Seattle, WA 98115, USA',
        // polyline: { points: 'gmabHh{kiV?RL?NAJ?' },
        // start_location: { lat: 47.6899605, lng: -122.290611 },
        // steps: 
        // [ { distance: { text: '75 ft', value: 23 },
        // duration: { text: '1 min', value: 17 },
        // end_location: { lat: 47.68974859999999, lng: -122.2907029 },
        // html_instructions: 'Head <b>south</b> on <b>35th Ave NE</b><div style="font-size:0.9em">Destination will be on the right</div>',
        // polyline: { points: 'gmabHh{kiV?RL?NAJ?' },
        // start_location: { lat: 47.6899605, lng: -122.290611 },
        // travel_mode: 'WALKING' } ],
        // travel_mode: 'WALKING' } ],
        // traffic_speed_entry: [],
        // via_waypoint: [] } ],
        // overview_polyline: { points: '}o_bH~ykiVrBCK@?U?TuSN}JLkOP_EDqHF?Q?R\\AJ?' },
        // summary: '',
        // warnings: [ 'Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.' ],
        // waypoint_order: [] } ],
        // status: 'OK' }

        this.props.navigator.push({
            title: "Direction",
            component: DirectionScreen,
            passProps: {routeDetails: JSON.stringify(this.state.route)}
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
                    callGooglePlaceApi(this.state.talkingResult, this.state.initialPosition).then((response) => {
                        console.log("Success!", response);
                        return {location: response.results[0], coords: JSON.parse(this.state.initialPosition)};
                    }, function(error) {
                        console.log("Failed", error);
                    }).then((data) => {
                        console.log("Nearest Location", data);
                        this.setState({destinationName: data.location.name});
                        this.setState({destinationAddress: data.location.formatted_address});
                        callGoogleDirectionApi(data.coords, data.location.formatted_address).then((response) => {
                            console.log("Direction Success!", response);
                            this.setState({route: response});
                        }, function(error) {
                            console.log("Direction Failed", error);
                        })
                    })
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
                    <Text> Are you headed to {this.state.destinationName} at {this.state.destinationAddress}? </Text>
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

async function callGoogleDirectionApi(origin, destination) {
    var baseUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=";
    var url = baseUrl + origin.coords.latitude + "," + origin.coords.longitude + "&destination=" + destination + "&mode=transit&transit_mode=bus&key=" + googleDirectionApiKey
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
        marginTop: 50
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
