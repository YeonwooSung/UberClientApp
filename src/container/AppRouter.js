import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'

import MainContainer from './MainContainer'


export default class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Scene key={'root'}>
                    <Scene initial key={'main'} component={MainContainer} title={'MainContainer'} hideNavBar />
                </Scene>
            </Router>
        )
    }
}
