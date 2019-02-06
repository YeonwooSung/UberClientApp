import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

export default class MainScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    static propTypes = {
        /* the navigateTo() function will be used for implementing the log out function */
        navigateTo: PropTypes.func.isRequired
    }

    render() {
        return (
            <View style={styles.container}></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
