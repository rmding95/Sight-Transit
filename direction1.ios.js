import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Button,
  TouchableHighlight
} from 'react-native';
var DirectionDetailScreen = require('./directiondetail.ios.js');

// this page gives off initial directions

// todo: for somse reason, the padding is having some issues
// it cuts off the list...

// for now, it is hardcoded and not dynamic like the direction.ios.js
// directions retreived from google maps and fed into here

class Direction1Screen extends Component {
  constructor() {
    super();

    const getRowData = (dataBlob, rowId) => dataBlob[`${rowId}`];
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2},
        getRowData);
    this.state = {
      dataSource: ds.cloneWithRows(['Turn left onto Montlake Blvd NE',
                                    'Slight right to stay on Montlake Blvd NE',
                                    'Turn right at Snohomish Ln N',
                                    'Turn right at Holly St',
                                    'Turn left at Snohomish Ln N',
                                    'Turn right at Graham St',
                                    'Turn right at 15th Ave NE',
                                    'Slight right onto 16th Ave NE'])
    };
  }

  _onPress = () => {
    this.props.navigator.push({
        title: 'Detail',
        component: DirectionDetailScreen
    })
  }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => this._onPress()}>
                <ListView
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text style={{textAlign: 'center'}}>{rowData}</Text>}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}
                    initialListSize={15}
                    //onEndReach={redirect}
                    />}
                />
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        //marginTop: 100,
        flexDirection: 'row',
        paddingLeft: 20
    },
    separator: {
        height: 1,
        margin: 40,
        backgroundColor: '#8E8E8E'
    }
});

module.exports = Direction1Screen;