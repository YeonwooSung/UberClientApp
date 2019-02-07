import React from 'react';
import { 
    AsyncStorage,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

import MainScreen from './container/Main';
import LoginScreen from './container/Login';
import SignupScreen from './container/Signup';


const { width, height } = Dimensions.get('window');

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            screenName: 'Login',
            isLoaded: false
        }
    }

    /* Make the navigation header invisible. */
    static navigationOptions = {
        header: null
    };

    /* check if the user is logged in already */
    checkIfLoggedIn = async () => {
        const id = await AsyncStorage.getItem('cs3301Uber@id', undefined);
        const pw = await AsyncStorage.getItem('cs3301Uber@pw', undefined);

        if (id && pw) {
            this.setState({ screenName: 'Main' });
        }

        //after finish checking, load the corresponding screen (Main screen or Log in Screen)
        this.setState({ isLoaded: true });
    }

    componentDidMount = () => {
        this.checkIfLoggedIn();
    }

    /* change the screen (log in screen, sign up screen, or main screen) */
    changeScreen = (screen) => {
        this.setState({screenName: screen});
    }

    render() {
        let { screenName, isLoaded } = this.state;

        /* check the screen name to load the suitable screen */
        if (isLoaded) {
            if (screenName == 'Login') {
                return (<LoginScreen navigateTo={this.changeScreen}></LoginScreen>);
            } else if (screenName == 'Signup') {
                return (<SignupScreen navigateTo={this.changeScreen}></SignupScreen>);
            }

            return (
                <MainScreen navigateTo={this.changeScreen}></MainScreen>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Image style={styles.logoImage} source={require('../assets/logo.png')} />
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a3f95',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImage: {
        width: height / 6,
        height: height / 6,
        marginBottom: height / 10,
        marginTop: height / 20
    }
});
