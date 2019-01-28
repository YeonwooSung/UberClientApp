import React from 'react';
import {
    StyleSheet
} from 'react-native';

export default class Main extends React.Component {
    render() {
        return(
            <View style={styles.container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});