import React from 'react';
import { AsyncStorage } from 'react-native';

import MainScreen from './container/Main';
import LoginScreen from './container/Login';
import SignupScreen from './container/Signup';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            screenName: 'Login'
        }
    }

    /* check if the user is logged in already */
    checkIfLoggedIn = async () => {
        const id = await AsyncStorage.getItem('cs3301Uber@id', undefined);
        const pw = await AsyncStorage.getItem('cs3301Uber@pw', undefined);

        if (id && pw) {
            this.setState({ screenName: 'Main' });
        }
    }

    componentDidMount = () => {
        checkIfLoggedIn();
    }

    /* change the screen (log in screen, sign up screen, or main screen) */
    changeScreen = (screen) => {
        this.setState({screenName: screen});
    }

    render() {
        let { screenName } = this.state;

        /* check the screen name to load the suitable screen */
        if (screenName == 'Login') {
            return (<LoginScreen navigateTo={this.changeScreen}></LoginScreen>);
        } else if (screenName == 'Signup') {
            return (<SignupScreen navigateTo={this.changeScreen}></SignupScreen>);
        }

        return (
            <MainScreen navigateTo={this.changeScreen}></MainScreen>
        );
    }

}
