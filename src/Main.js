import React from 'react';
import { 
    AsyncStorage,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

import LoginScreen from './container/Login';
import SignupScreen from './container/Signup';
import Menu from './container/Menu';


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
            this.setState({ screenName: 'Menu' });
        }

        //after finish checking, load the corresponding screen (Menu screen or Log in Screen)
        this.setState({ isLoaded: true });
    }

    componentDidMount = () => {
        this.checkIfLoggedIn();
    }

    /* change the screen (log in screen, sign up screen, or menu screen) */
    changeScreen = (screen) => {
        this.setState({screenName: screen});
    }

    render() {
        let { screenName, isLoaded } = this.state;
        let navigate = this.props.navigation.navigate;

        /* check the screen name to load the suitable screen */
        if (isLoaded) {
            if (screenName == 'Login') {
                // load the log in screen
                return (<LoginScreen navigateTo={this.changeScreen}></LoginScreen>);
            } else if (screenName == 'Signup') {
                // load the sign up screen
                return (<SignupScreen navigateTo={this.changeScreen}></SignupScreen>);
            }

            return (
                <Menu navigateTo={this.changeScreen} navigate={navigate}></Menu>
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
