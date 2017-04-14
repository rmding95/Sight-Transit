import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView
} from 'react-native';
var BusArrivalScreen = require('./busarrival.ios.js');
// this is the initial confirmation of destination
// todo: directions are not dynamic (walk, bus, walk)
// pull from google maps and fed here
// style is a bit weird here as well.
// issue adding border to each list item when it works fine in another page...
class BusScreen extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['45      -4 min', '71       2 min', '45      DELAYED   6 min'])
    };
  }

    _onPress = () => {
        console.log("pressed on continue button");
        this.props.navigator.push({
            title: "BusArrival",
            component: BusArrivalScreen
        });
    }

    render() {
        return (
            <View style={styles.container} accessible={true} accessibilityLabel={'Bus'}>
                <View style={styles.halfHeight}>
                    <Text style={{fontSize: 20}}>Your next bus {this.props.myProp}</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>45 / 67 / 71</Text>
                </View>
                
                <ListView
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text style={{textAlign: 'center'}}>{rowData}</Text>}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
                <Button
                    onPress={() => this._onPress()}
                    title="Alert Drivers"
                    accessibilityLabel="Alert Drivers"
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

module.exports = BusScreen;