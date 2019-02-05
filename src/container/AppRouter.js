import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'

import MainScreen from './Main'


export default class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Scene key={'root'}>
                    <Scene initial key={'main'} component={MainScreen} title={'MainScreen'} hideNavBar />
                </Scene>
            </Router>
        )
    }
}
