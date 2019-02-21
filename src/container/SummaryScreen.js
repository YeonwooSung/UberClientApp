import React from 'react'
import {
    View,
    AsyncStorage,
    StyleSheet,
    Dimensions
} from 'react-native';


/* global variables for width and height of device */
const { width, height } = Dimensions.get('window');

export default class SummaryScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height
    }
});
