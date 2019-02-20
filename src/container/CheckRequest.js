import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class CheckRequestScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    /* Make the navigation header invisible. */
    static navigationOptions = {
        header: null
    };


    render () {
        //TODO need to calculate the "estimated time for journey"

        return (
            <View style={styles.container}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
