import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  NavigatorIOS,
  TextInput,
  Button
} from 'react-native';

class TripEntryScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Where you headed?
                </Text>
                <TextInput
                    style={{height: 100, borderColor: 'gray', borderWidth: 1}}
                    multiline={true}
                    numberOfLines={10}
                />
                <Button
                    onPress={buttonPressed}
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
        justifyContent: 'center'
    },
});

module.exports = TripEntryScreen;