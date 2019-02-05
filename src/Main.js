import React from 'react';

import MainScreen from './container/MainScreen';
import LoginScreen from './container/Login';
import SignupScreen from './container/Signup';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            screenName: 'Login'
        }
    }

    /* change the screen (log in screen, sign up screen, or main screen) */
    changeScreen = (screen) => {
        this.setState({screenName: screen});
    }

    render() {
        let { screenName } = this.state;

        /* check the screen name to load the suitable screen */
        if (screenName == 'Login') {
            return (<LoginScreen></LoginScreen>);
        } else if (screenName == 'Signup') {
            return (<SignupScreen></SignupScreen>);
        }

        return (
            <MainScreen></MainScreen>
        );
    }

}
