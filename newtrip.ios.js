'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  NativeAppEventEmitter,
  TouchableHighlight,
  Image,
  AsyncStorage
} from 'react-native';

var DirectionScreen = require('./direction.ios.js');
var SpeechToText = require('react-native-speech-to-text-ios');
let googlePlaceApiKey = "AIzaSyBb7lDyjRIlU7STXU8d4WueMDk5bI3sxrU";
let googleDirectionApiKey = "AIzaSyBr8DLoX9-BH052cK8WmY7PiV755QhvolE";

//Google Place API Key: AIzaSyBb7lDyjRIlU7STXU8d4WueMDk5bI3sxrU
// this page isn't necessary either if the other is kept.
class NewTripScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            talking: false,
            savingLocation: props.savingLocation,
            saveName: props.saveName
        };
    }

   _onPress = () => {
        this.setState({destinationName: "Placeholder"});

        var json = { geocoded_waypoints: 
        [ { geocoder_status: 'OK',
        place_id: 'ChIJqYuyw4UTkFQRgZeMzMSJDFk',
        types: [ 'street_address' ] },
        { geocoder_status: 'OK',
        place_id: 'EjE1NTUgTkUgTm9ydGhnYXRlIFdheSAjNDI0LCBTZWF0dGxlLCBXQSA5ODEyNSwgVVNB',
        types: [ 'subpremise' ] } ],
        routes: 
        [ { bounds: 
        { northeast: { lat: 47.71933749999999, lng: -122.290283 },
        southwest: { lat: 47.679569, lng: -122.321309 } },
        copyrights: 'Map data ©2017 Google',
        fare: { currency: 'USD', text: '$2.50', value: 2.5 },
        legs: 
        [ { arrival_time: 
        { text: '5:45am',
        time_zone: 'America/Los_Angeles',
        value: 1494593151 },
        departure_time: 
        { text: '5:21am',
        time_zone: 'America/Los_Angeles',
        value: 1494591682 },
        distance: { text: '4.7 mi', value: 7545 },
        duration: { text: '24 mins', value: 1469 },
        end_address: '555 NE Northgate Way #424, Seattle, WA 98125, USA',
        end_location: { lat: 47.708585, lng: -122.321309 },
        start_address: '7029 35th Ave NE, Seattle, WA 98115, USA',
        start_location: { lat: 47.6801659, lng: -122.2903965 },
        steps: 
        [ { distance: { text: '236 ft', value: 72 },
        duration: { text: '1 min', value: 65 },
        end_location: { lat: 47.6796265, lng: -122.290283 },
        html_instructions: 'Walk to 35th Ave NE & NE 70th St',
        polyline: { points: 'ap_bH~ykiVvBCK@?U' },
        start_location: { lat: 47.6801659, lng: -122.2903965 },
        steps: 
        [ { distance: { text: '217 ft', value: 66 },
        duration: { text: '1 min', value: 49 },
        end_location: { lat: 47.679569, lng: -122.2903844 },
        html_instructions: 'Head <b>south</b> on <b>35th Ave NE</b>',
        polyline: { points: 'ap_bH~ykiVvBC' },
        start_location: { lat: 47.6801659, lng: -122.2903965 },
        travel_mode: 'WALKING' },
        { distance: { text: '20 ft', value: 6 },
        duration: { text: '1 min', value: 16 },
        end_location: { lat: 47.6796265, lng: -122.290283 },
        html_instructions: 'Make a <b>U-turn</b><div style="font-size:0.9em">Destination will be on the right</div>',
        maneuver: 'uturn-left',
        polyline: { points: 'il_bHzykiVK@?U' },
        start_location: { lat: 47.679569, lng: -122.2903844 },
        travel_mode: 'WALKING' } ],
        travel_mode: 'WALKING' },
        { distance: { text: '2.9 mi', value: 4621 },
        duration: { text: '8 mins', value: 469 },
        end_location: { lat: 47.71933749999999, lng: -122.293205 },
        html_instructions: 'Bus towards Jackson Park Wedgwood',
        polyline: { points: 'ul_bHfykiV?T_IHuIDUBgJHm@?_IJq@@kBBQ?mDDuDF{B?o@BqCCoCCu@?{ACoCEo@?_B?oCCi@AG?_BCC?gA?eACi@BeA?]?uC?a@COB_CC{DL[?c@?wBDuDFqABkGLa@@mDFmDHy@C}GGy@A}HKo@?wHK}GGK?y@Ae@?mB@i@B]Fk@TiDrB]JQFYFa@@gDIo@EyHWg@Ay@AMEsAc@wCy@e@IA`B?bDAzB?~AM?' },
        start_location: { lat: 47.6796265, lng: -122.290283 },
        transit_details: 
        { arrival_stop: 
        { location: { lat: 47.71933749999999, lng: -122.293205 },
        name: 'NE 125th St & 33rd Ave NE' },
        arrival_time: 
        { text: '5:30am',
        time_zone: 'America/Los_Angeles',
        value: 1494592225 },
        departure_stop: 
        { location: { lat: 47.6796265, lng: -122.290283 },
        name: '35th Ave NE & NE 70th St' },
        departure_time: 
        { text: '5:22am',
        time_zone: 'America/Los_Angeles',
        value: 1494591756 },
        headsign: 'Jackson Park Wedgwood',
        line: 
        { agencies: 
        [ { name: 'Metro Transit',
        phone: '1 (206) 553-3000',
        url: 'http://metro.kingcounty.gov/' } ],
        short_name: '65',
        url: 'http://metro.kingcounty.gov/schedules/065/n0.html',
        vehicle: 
        { icon: '//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png',
        name: 'Bus',
        type: 'BUS' } },
        num_stops: 18 },
        travel_mode: 'TRANSIT' },
        { distance: { text: '1.6 mi', value: 2636 },
        duration: { text: '7 mins', value: 432 },
        end_location: { lat: 47.7086334, lng: -122.318367 },
        html_instructions: 'Bus towards Northgate Lake City',
        polyline: { points: '{dgbHnkliVL??T?xBAzE?R?V~@b@DDFB`Bx@~BhAdAj@PHvAp@|FtCj@ZtBdATL~At@lDdBdAj@|DlB`Af@`GxCN^Xj@hCdEf@`ADLFTLn@Bz@BdA@j@DXLdA\\tAh@fBLb@Lr@DPD`AA~AArJ?x@CzHClN?bFAh@?xDAxA?nA?bAAbK?fBM?' },
        start_location: { lat: 47.71933749999999, lng: -122.293205 },
        transit_details: 
        { arrival_stop: 
        { location: { lat: 47.7086334, lng: -122.318367 },
        name: 'NE Northgate Way & Roosevelt Way NE' },
        arrival_time: 
        { text: '5:43am',
        time_zone: 'America/Los_Angeles',
        value: 1494592981 },
        departure_stop: 
        { location: { lat: 47.71933749999999, lng: -122.293205 },
        name: 'NE 125th St & 33rd Ave NE' },
        departure_time: 
        { text: '5:35am',
        time_zone: 'America/Los_Angeles',
        value: 1494592549 },
        headsign: 'Northgate Lake City',
        line: 
        { agencies: 
        [ { name: 'Metro Transit',
        phone: '1 (206) 553-3000',
        url: 'http://metro.kingcounty.gov/' } ],
        short_name: '75',
        url: 'http://metro.kingcounty.gov/schedules/075/n0.html',
        vehicle: 
        { icon: '//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png',
        name: 'Bus',
        type: 'BUS' } },
        num_stops: 7 },
        travel_mode: 'TRANSIT' },
        { distance: { text: '0.1 mi', value: 216 },
        duration: { text: '3 mins', value: 170 },
        end_location: { lat: 47.708585, lng: -122.321309 },
        html_instructions: 'Walk to 555 NE Northgate Way #424, Seattle, WA 98125, USA',
        polyline: { points: '}aebHxhqiVJH?j@?R?\\?`A?T?@?f@AtA?^?X?R?d@?z@?dA?T' },
        start_location: { lat: 47.7086334, lng: -122.318367 },
        steps: 
        [ { distance: { text: '0.1 mi', value: 216 },
        duration: { text: '3 mins', value: 170 },
        end_location: { lat: 47.708585, lng: -122.321309 },
        html_instructions: 'Head <b>west</b> on <b>NE Northgate Way</b><div style="font-size:0.9em">Destination will be on the right</div>',
        polyline: { points: '}aebHxhqiVJH?j@?R?\\?`A?T?@?f@AtA?^?X?R?d@?z@?dA?T' },
        start_location: { lat: 47.7086334, lng: -122.318367 },
        travel_mode: 'WALKING' } ],
        travel_mode: 'WALKING' } ],
        traffic_speed_entry: [],
        via_waypoint: [] } ],
        overview_polyline: { points: 'ap_bH~ykiVvBCK@?U?TuSN}JLkOP_EDqHFo@BqCCeECkFIoC?aHIkA?eACi@BcB?wDCOB_CCwELcLPiS`@oUYqSS_BAwCD]Fk@TiDrB]Jk@Na@@gDIiJ]aBCaBi@wCy@e@IAdGAzEM?L??nCAnF?V~@b@LH`FbCvAt@tIfEvGdDrNfH`GxCN^Xj@hCdEl@nATdAF`CFdALdA\\tAv@jCRdAD`AA~AAlLGhXC`PA~RM?JH?~@?vBArJ?T' },
        summary: '',
        warnings: [ 'Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.' ],
        waypoint_order: [] } ],
        status: 'OK' }

        var destName = "Placeholder";

        if (this.state.savingLocation) {
            AsyncStorage.setItem(this.state.saveName, JSON.stringify(json));
            AsyncStorage.setItem(this.state.saveName + 'Destination', destName);
            this.props.navigator.pop();
       } else {
            this.props.navigator.replace({
                title: "Direction",
                component: DirectionScreen,
                passProps: {routeDetails: /*JSON.stringify(this.state.route)*/ JSON.stringify(json), destinationName: destName}
            });
       }
   }

   _onDirectionConfirmation = () => {
       if (this.state.savingLocation) {
            AsyncStorage.setItem(this.state.saveName, JSON.stringify(this.state.route));
            AsyncStorage.setItem(this.state.saveName + 'Destination', this.state.destinationName);
            this.props.navigator.pop();
       } else {
        this.props.navigator.replace({
            title: "Direction",
            component: DirectionScreen,
            passProps: {routeDetails: JSON.stringify(this.state.route), destinationName: this.state.destinationName}
        });
       }
   }

   _talk = () => {
       if (this.state.talking) {
           this.state.talking = false;
           SpeechToText.finishRecognition();
       } else {
           this.state.talking = true;
           SpeechToText.startRecognition("en-US");
           navigator.geolocation.getCurrentPosition(
                (position) => {
                    var initialPosition = JSON.stringify(position);
                    this.setState({initialPosition});
                },
                (error) => alert(error.message),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
           );
       }
   }

   componentWillMount() {
        if (typeof this.state.savingLocation != 'undefined') {
            this.setState({saveName: this.state.saveName});
        } else {
            this.setState({savingLocation: false});
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
                        return {location: response.results[0], coords: JSON.parse(this.state.initialPosition)};
                    }, function(error) {
                    }).then((data) => {
                        this.setState({destinationName: data.location.name});
                        this.setState({destinationAddress: data.location.formatted_address});
                        callGoogleDirectionApi(data.coords, data.location.formatted_address).then((response) => {
                            this.setState({route: response});
                        }, function(error) {
                        }).then(() => {
                            this._onDirectionConfirmation();
                        }, function(error) {

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
            <View>
            <View style={styles.container} accessible={true} accessibilityLabel={'Where are you headed?'}>
                <TouchableHighlight onPress={() => this._talk()}>
                    <View style={styles.square} accessible={true} accessibilityLabel={'Tap to voice input a desination'}>
                        <Image style={styles.talkButton} source={require('./img/002-sound.png')} />
                    </View>
                </TouchableHighlight>

                
          </View>
          <View>
                <View>
                    <Text style={styles.header}>Where are you headed? </Text>
                </View>
              <Button
                    onPress={() => this._onPress()}
                    title="Continue"
                    accessibilityLabel="Continue"
                />
             </View>
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
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
    }
}

async function callGoogleDirectionApi(origin, destination) {
    var baseUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=";
    var url = baseUrl + origin.coords.latitude + "," + origin.coords.longitude + "&destination=" + destination + "&mode=transit&transit_mode=bus&key=" + googleDirectionApiKey
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 200
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'APHont',
        marginLeft: 30,
        color: '#2a2a2a',
        paddingBottom: 20
    },
    square: {
        width: 300,
        height: 300,
        marginTop: 40,
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2a2a'
    },
    talkButton: {
        backgroundColor: '#2a2a2a',
        marginLeft: 10,
        height:130,
        width:130
    }
    
});

module.exports = NewTripScreen;
