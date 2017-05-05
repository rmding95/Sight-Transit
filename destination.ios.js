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
  Image
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

   _onPress = () => {
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

        var json = { geocoded_waypoints: 
        [ { geocoder_status: 'OK',
        place_id: 'ChIJX8OBq_IUkFQRpIfcLThk2m0',
        types: [ 'premise' ] },
        { geocoder_status: 'OK',
        place_id: 'ChIJK7n32bBtkFQRAKhKEB0aUnM',
        types: [ 'premise' ] } ],

        routes: 
        [ { bounds: 
        { northeast: { lat: 47.65534, lng: -122.1310846 },
        southwest: { lat: 47.6165886, lng: -122.312469 } },
        copyrights: 'Map data ©2017 Google',
        fare: { currency: 'USD', text: '$5.00', value: 5 },
        legs: 
        [ { arrival_time: 
        { text: '5:26pm',
        time_zone: 'America/Los_Angeles',
        value: 1493771163 },
        departure_time: 
        { text: '4:36pm',
        time_zone: 'America/Los_Angeles',
        value: 1493768179 },
        distance: { text: '12.6 mi', value: 20299 },
        duration: { text: '50 mins', value: 2984 },
        end_address: '15600 NE 8th St, Bellevue, WA 98008, USA',
        end_location: { lat: 47.6172202, lng: -122.1319293 },
        start_address: 'Mary Gates Hall, 1851 NE Grant Ln, Seattle, WA 98105, USA',
        start_location: { lat: 47.6549592, lng: -122.3082632 },
        steps: 
        [ { distance: { text: '0.2 mi', value: 364 },
        duration: { text: '4 mins', value: 256 },
        end_location: { lat: 47.6550484, lng: -122.312195 },
        html_instructions: 'Walk to 15th / 40th',
        polyline: { points: 'orzaHrioiVNt@k@\\`@hBJl@UHCDCDAD?F?@@H@JBj@@rAE`ACXAPABCLETA@K^Q`@EPCJAHAHAP?V?B@^v@@?N' },
        start_location: { lat: 47.6549592, lng: -122.3082632 },
        steps: 
        [ { distance: { text: '72 ft', value: 22 },
        duration: { text: '1 min', value: 16 },
        end_location: { lat: 47.654877, lng: -122.3085292 },
        html_instructions: 'Head <b>southwest</b>',
        polyline: { points: 'orzaHrioiVNt@' },
        start_location: { lat: 47.6549592, lng: -122.3082632 },
        travel_mode: 'WALKING' },
        { distance: { text: '89 ft', value: 27 },
        duration: { text: '1 min', value: 22 },
        end_location: { lat: 47.6550994, lng: -122.3086755 },
        html_instructions: 'Turn <b>right</b> toward <b>NE Grant Ln</b>',
        maneuver: 'turn-right',
        polyline: { points: '_rzaHhkoiVk@\\' },
        start_location: { lat: 47.654877, lng: -122.3085292 },
        travel_mode: 'WALKING' },
        { distance: { text: '207 ft', value: 63 },
        duration: { text: '1 min', value: 42 },
        end_location: { lat: 47.6548696, lng: -122.3094379 },
        html_instructions: 'Turn <b>left</b> onto <b>NE Grant Ln</b>',
        maneuver: 'turn-left',
        polyline: { points: 'kszaHfloiV`@hBJl@' },
        start_location: { lat: 47.6550994, lng: -122.3086755 },
        travel_mode: 'WALKING' },
        { distance: { text: '82 ft', value: 25 },
        duration: { text: '1 min', value: 18 },
        end_location: { lat: 47.6550257, lng: -122.3096319 },
        html_instructions: 'Turn <b>right</b> to stay on <b>NE Grant Ln</b>',
        maneuver: 'turn-right',
        polyline: { points: '}qzaH~poiVUHCDCDAD?F?@' },
        start_location: { lat: 47.6548696, lng: -122.3094379 },
        travel_mode: 'WALKING' },
        { distance: { text: '187 ft', value: 57 },
        duration: { text: '1 min', value: 38 },
        end_location: { lat: 47.6549784, lng: -122.3103822 },
        html_instructions: 'Slight <b>left</b> to stay on <b>NE Grant Ln</b>',
        maneuver: 'turn-slight-left',
        polyline: { points: '}rzaHdroiV@H@JBj@@rA' },
        start_location: { lat: 47.6550257, lng: -122.3096319 },
        travel_mode: 'WALKING' },
        { distance: { text: '456 ft', value: 139 },
        duration: { text: '1 min', value: 89 },
        end_location: { lat: 47.6553287, lng: -122.3121139 },
        html_instructions: 'Continue straight onto <b>W Stevens Way NE</b>',
        maneuver: 'straight',
        polyline: { points: 'srzaHzvoiVE`ACXAPABCLETA@K^Q`@EPCJAHAHAP?V?B@^' },
        start_location: { lat: 47.6549784, lng: -122.3103822 },
        travel_mode: 'WALKING' },
        { distance: { text: '102 ft', value: 31 },
        duration: { text: '1 min', value: 31 },
        end_location: { lat: 47.6550484, lng: -122.312195 },
        html_instructions: 'Turn <b>left</b> onto <b>15th Ave NE</b><div style="font-size:0.9em">Destination will be on the right</div>',
        maneuver: 'turn-left',
        polyline: { points: 'ytzaHtapiVv@@?N' },
        start_location: { lat: 47.6553287, lng: -122.3121139 },
        travel_mode: 'WALKING' } ],
        travel_mode: 'WALKING' },
        { distance: { text: '10.2 mi', value: 16453 },
        duration: { text: '22 mins', value: 1290 },
        end_location: { lat: 47.6446686, lng: -122.133759 },
        html_instructions: 'Bus towards Redmond',
        polyline: { points: 'aszaHfbpiV?Sx@?fCDjB@\\?NBLHJHLJX\\bB}Db@gA\\_ADIDKtCiH|@eC^iA`A_CtAeDjAoCxA_EN[Ri@NS`@@pC?z@?zG?PLHBlCJX?l@?v@IZKHCb@a@RCNIRMDAJGDAFIHEFEBVLVPTZ\\TZLVLZDb@@VAFCLKRQLM?SIMQMe@Ik@UuBIw@G}@M_BEyAGaB?e@?q@?A?eBAaBE}@WeCSeBY_B[gD[eDO_BGoAAQ?EIsBA}@?aABmCDeBBmAReI^{L~@{^Dm@NuG@]P_GDgAFmAHu@Fw@R_Bn@eEZqABQLe@r@wCRw@`@oBXgBHq@LeAlDgc@\\}DzE}k@?C|@sKdJwhANqBn@yH~@kLn@wHl@wHHyAP}B\\mDXqDNcB@CVcCh@sFv@}I|@qKf@uEF}A@mBA{BCcBGaBI}@KqAYqB[iB]eB_@sAg@{Ak@}Au@{Ay@yAiAeBmBwC}@{AaAkAs@{Ag@mAc@mAc@wAWcAA?Mm@I]EQkFqVgBeIm@aE_A_Ee@aCUaBMuAM_BKkBCqC@mBFqCLoCVgEVsDZsD^_Dd@}CP}@h@_Cp@eC`AwC~@cCz@kBhAmBjAgBxDiFvAoBRYbB}Bh@u@T[xAkBV]Z[b@e@l@g@~@y@d@YhAs@|@e@t@c@|A_At@a@n@c@h@c@d@g@b@i@\\e@`@k@Xi@Zo@Re@Vm@Vs@ZaARcATiANeARiCH{ABmBAuEGsECcE@qDFoBHeCF{@J}@PkBP{AZqBr@_DzAmIRaARgAfA_G`@aC`@wCPuBJmC?eCGkCAOKqDSiFCiACy@WiICmAAqA@{A@a@@]B_ADcAR}DtAqYHqB@m@?G@{DCuBCmAEiAIgBEo@CW?AASG{@KaAOmAYmBOcA[cB_@eBa@_B]gAu@{Bo@_Bo@sAi@kAgCkFkAaCcDwGeBsDwA{CkByD}AeDaC}EeCiFeBqDmAaCaAyA_AgA_AgAkAiA_Au@y@k@_Ag@kAq@aAq@e@[}@[}@WcAYu@KqASe@Qe@IeAOs@Ew@E}@?cADG?{@JAS' },
        start_location: { lat: 47.6550484, lng: -122.312195 },
        transit_details: 
        { arrival_stop: 
        { location: { lat: 47.6446686, lng: -122.133759 },
        name: 'SR 520 & NE 40th St' },
        arrival_time: 
        { text: '5:02pm',
        time_zone: 'America/Los_Angeles',
        value: 1493769725 },
        departure_stop: 
        { location: { lat: 47.6550484, lng: -122.312195 },
        name: '15th / 40th' },
        departure_time: 
        { text: '4:40pm',
        time_zone: 'America/Los_Angeles',
        value: 1493768435 },
        headsign: 'Redmond',
        line: 
        { agencies: 
        [ { name: 'Sound Transit',
        phone: '1 (888) 889-6368',
        url: 'http://www.soundtransit.org/' } ],
        short_name: '542',
        url: 'http://www.soundtransit.org/Schedules/ST-Express-Bus/542',
        vehicle: 
        { icon: '//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png',
        name: 'Bus',
        type: 'BUS' } },
        num_stops: 6 },
        travel_mode: 'TRANSIT' },
        { distance: { text: '338 ft', value: 103 },
        duration: { text: '2 mins', value: 96 },
        end_location: { lat: 47.6447792, lng: -122.132393 },
        html_instructions: 'Walk to 156th Ave NE & Overlake Transit Center - Bay 7',
        polyline: { points: 'erxaH~fmhVUqG' },
        start_location: { lat: 47.6446686, lng: -122.133759 },
        steps: 
        [ { distance: { text: '338 ft', value: 103 },
        duration: { text: '2 mins', value: 96 },
        end_location: { lat: 47.6447792, lng: -122.132393 },
        polyline: { points: 'erxaH~fmhVUqG' },
        start_location: { lat: 47.6446686, lng: -122.133759 },
        travel_mode: 'WALKING' } ],
        travel_mode: 'WALKING' },
        { distance: { text: '2.0 mi', value: 3151 },
        duration: { text: '15 mins', value: 904 },
        end_location: { lat: 47.6165886, lng: -122.132515 },
        html_instructions: 'Bus towards Factoria Crossroads',
        polyline: { points: '{rxaHl~lhV?SjB@zG?x@?vA?~MBrH?d@?lPDD?t@?rL?nA?xA?b@?H?J?^?hB?`J?vA?hDBl@?|D@bA?n@?xA?vF@b@?|@?fB?RB|@?nB?~B?rC?Z?r@?V?jC?T?hC?t@?P?xA?|@@j@?|B?pAA?T' },
        start_location: { lat: 47.6447792, lng: -122.132393 },
        transit_details: 
        { arrival_stop: 
        { location: { lat: 47.6165886, lng: -122.132515 },
        name: '156th Ave NE & NE 8th St' },
        arrival_time: 
        { text: '5:23pm',
        time_zone: 'America/Los_Angeles',
        value: 1493770988 },
        departure_stop: 
        { location: { lat: 47.6447792, lng: -122.132393 },
        name: '156th Ave NE & Overlake Transit Center - Bay 7' },
        departure_time: 
        { text: '5:08pm',
        time_zone: 'America/Los_Angeles',
        value: 1493770084 },
        headsign: 'Factoria Crossroads',
        line: 
        { agencies: 
        [ { name: 'Metro Transit',
        phone: '1 (206) 553-3000',
        url: 'http://metro.kingcounty.gov/' } ],
        short_name: '245',
        url: 'http://metro.kingcounty.gov/schedules/245/n0.html',
        vehicle: 
        { icon: '//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png',
        name: 'Bus',
        type: 'BUS' } },
        num_stops: 10 },
        travel_mode: 'TRANSIT' },
        { distance: { text: '0.1 mi', value: 228 },
        duration: { text: '3 mins', value: 180 },
        end_location: { lat: 47.6172202, lng: -122.1319293 },
        html_instructions: 'Walk to 15600 NE 8th St, Bellevue, WA 98008, USA',
        polyline: { points: 'ubsaHf_mhV?QY@y@S?yFS?I?IAAh@?R?V?pA?@' },
        start_location: { lat: 47.6165886, lng: -122.132515 },
        steps: 
        [ { distance: { text: '157 ft', value: 48 },
        duration: { text: '1 min', value: 39 },
        end_location: { lat: 47.6170121, lng: -122.1323437 },
        html_instructions: 'Head <b>north</b> on <b>156th Ave NE</b> toward <b>NE 8th St</b>',
        polyline: { points: 'ubsaHf_mhV?QY@y@S' },
        start_location: { lat: 47.6165886, lng: -122.132515 },
        travel_mode: 'WALKING' },
        { distance: { text: '308 ft', value: 94 },
        duration: { text: '1 min', value: 75 },
        end_location: { lat: 47.6170076, lng: -122.1310884 },
        html_instructions: 'Turn <b>right</b> onto <b>NE 8th St</b>',
        maneuver: 'turn-right',
        polyline: { points: 'iesaHb~lhV?yF' },
        start_location: { lat: 47.6170121, lng: -122.1323437 },
        travel_mode: 'WALKING' },
        { distance: { text: '75 ft', value: 23 },
        duration: { text: '1 min', value: 21 },
        end_location: { lat: 47.6172149, lng: -122.1310846 },
        html_instructions: 'Turn <b>left</b>',
        maneuver: 'turn-left',
        polyline: { points: 'iesaHhvlhVS?I?IA' },
        start_location: { lat: 47.6170076, lng: -122.1310884 },
        travel_mode: 'WALKING' },
        { distance: { text: '207 ft', value: 63 },
        duration: { text: '1 min', value: 45 },
        end_location: { lat: 47.6172202, lng: -122.1319293 },
        html_instructions: 'Turn <b>left</b><div style="font-size:0.9em">Destination will be on the right</div>',
        maneuver: 'turn-left',
        polyline: { points: 'qfsaHfvlhVAh@?R?V?pA?@' },
        start_location: { lat: 47.6172149, lng: -122.1310846 },
        travel_mode: 'WALKING' } ],
        travel_mode: 'WALKING' } ],
        traffic_speed_entry: [],
        via_waypoint: [] } ],
        overview_polyline: { points: 'orzaHrioiVNt@k@\\l@vCYNEJB^D~BIzAMx@e@tAIp@?Z@^v@@?N?S`EDhC@\\LXTX\\bB}D`AgCJUtCiH|@eC`BiE`DuHhB{ERi@NSrD@vI?ZPfDJl@?v@Id@Ob@a@RCb@WPI^WBVLVl@r@b@r@LZDb@?^O`@QLM?SIMQMe@Ik@_@mDU}CM{D?_EG_Dk@kFY_B[gDk@eGS{EA_CHsFvBky@h@aRLuCPmBbAeH^cB`A}Dt@gDb@yCzDme@vHs~@dNocB|AoRZwEhAgM`AwJtBoVf@uEF}A?iFKeEUoCu@{E}@yDsAyDu@{Ay@yAwD}F}@{AaAkA{AiDgAeDYcAWkAqFcWgBeIm@aEeBaIc@wDYkEA_GTaHn@{JZsD^_Dv@{EzAeG`C{Gz@kBhAmBdGqIxF}HnBgCr@y@pAmAdBsAzG}DdBeAh@c@d@g@`AoAz@uAn@uAn@aBZaARcAd@oCRiCH{ABmBAuEKwKHaHPaE\\iDl@mEr@_DzAmIf@iChBaK`@wCPuBJmC?eCI{C_@{Kc@{O?mDB_AHcChBo_@J_D@cEGcEOqDK}AS}Bi@{Dk@gDaAeEsAcE_BsDaLqU}DoIiE_JgGgMsDsHaAyA_AgA_AgAkAiAyBaBkCyAgBmA{Bs@cAYu@KqASe@QkBYkBKaCDcAJWeH?SjB@tI?vPBl[DlV?lUB~I@rL@zBBlD?bJ?bI?~E@hD?pAA?T?QY@y@S?yF]?IAAh@?j@?rA' },
        summary: '',
        warnings: [ 'Walking directions are in beta.    Use caution – This route may be missing sidewalks or pedestrian paths.' ],
        waypoint_order: [] } ],
        status: 'OK' }

        this.props.navigator.push({
            title: "Direction",
            component: DirectionScreen,
            passProps: {routeDetails: /*JSON.stringify(this.state.route)*/ JSON.stringify(json), destinationName: this.state.destinationName}
        });
   }

   _onDirectionConfirmation = () => {
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

        // the 'this' is not correctly referring to the class 'this'
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
                        console.log("Failed", error);
                    }).then((data) => {
                        this.setState({destinationName: data.location.name});
                        this.setState({destinationAddress: data.location.formatted_address});
                        callGoogleDirectionApi(data.coords, data.location.formatted_address).then((response) => {
                            console.log("Direction Success!", response);
                            this.setState({route: response});
                        }, function(error) {
                            console.log("Direction Failed", error);
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
            <View style={styles.container} accessible={true} accessibilityLabel={'Destination'}>
                <View>
                    <Text> Where are you headed? </Text>
                </View>

                <TouchableHighlight onPress={() => this._talk()}>
                    <Image style={styles.talkButton} source={require('./img/002-sound.png')} />
                </TouchableHighlight>

                {/*<Button style={styles.talkButton}
                    onPress={() => this._talk()}
                    title="Press to Talk"
                    accessibilityLabel="Continue"
                />*/}

                <Button
                    onPress={() => this._onPress()}
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
    },
    txt: {
        flex: 0.5
    },
    talkButton: {
        margin: 10,
        backgroundColor: '#2a2a2a'
    }
    
});

module.exports = DestinationScreen;
