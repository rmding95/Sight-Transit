import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView
} from 'react-native';

var Direction1Screen = require('./direction1.ios.js');

// this is the initial confirmation of destination
// todo: directions are not dynamic (walk, bus, walk)
// pull from google maps and fed here
class DirectionScreen extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Walk 6min', 'Bus 10min', 'Walk 2min'])
    };
  }

    _onPress = () => {
        console.log("pressed on continue button");
        this.props.navigator.push({
            title: "Direction1",
            component: Direction1Screen
        });
    }

    render() {
        return (
            <View style={styles.container} accessible={true} accessibilityLabel={'Direction'}>
                <View style={styles.halfHeight}>
                    <Text style={{fontSize: 20}}>Direction to {this.props.myProp}</Text>
                </View>
                
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

// border not working for seperator, will have to look into it later
const styles = StyleSheet.create({
    container: {
        marginTop: 90,
        flex: 1,
    },
    halfHeight: {
        flex: 0.5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'black'
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

module.exports = DirectionScreen;