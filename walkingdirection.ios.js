import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  NavigatorIOS
} from 'react-native';

// Add direction monitoring of the user's progress
class WalkingDirectionScreen extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var leg = props.routeSteps[0];
        var steps = [];
        leg.substeps.forEach(function(element) {
            steps.push(element.description);
        }, this);
        this.state = {
            currentDirection: props.routeSteps[0],
            routeDetails: props.routeSteps,
            dataSource: ds.cloneWithRows(steps)
        };
    }

    _onPress = () => {
        if (this.state.routeDetails.length == 1) {
            var HomeScreen = require('./home.ios.js');
            this.props.navigator.push({
                title: "Home",
                component: HomeScreen
            });
        } else {
            var DirectionDetailScreen = require('./directiondetail.ios.js');
            this.props.navigator.push({
                title: "Distance From Stop",
                component: DirectionDetailScreen,
                passProps: {currentDirection: this.state.currentDirection, routeDetails: this.state.routeDetails}
            });
        }
    }

    render() {
        return (
            <View style={styles.container}> 
                <ListView
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text style={{textAlign: 'center'}}>{rowData}</Text>}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
                <Button
                    onPress={() => this._onPress()}
                    title="Continue"
                    accessibilityLabel="Continue"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
    },
    halfHeight: {
        flex: 0.5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'black',
        marginTop: 100
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20
    },
    separator: {
        height: 1,
        margin: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'gray'

    }
});

module.exports = WalkingDirectionScreen;