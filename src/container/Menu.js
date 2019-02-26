import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';


/* global variables for width and height of device */
const { width, height } = Dimensions.get('window');

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        /* the navigateTo() function will be used for implementing the log out function */
        navigateTo: PropTypes.func.isRequired,
        /* navigate() function will be used for navigation that navigates to the request trip screen */
        navigate: PropTypes.func.isRequired
    }


    /**
     * This method navigates to the other screen component.
     */
    navigateTo = (screenName) => {
        this.props.navigate(screenName);
    }


    /**
     * Implemented for the log out feature.
     */
    removeInfo_Async = async () => {
        await AsyncStorage.removeItem('cs3301Uber@id', (err) => { if (err) console.log(err); });
        await AsyncStorage.removeItem('cs3301Uber@pw', (err) => { if (err) console.log(err); });

        navigateTo('Login');
    }


    render() {
        return(
            <View style={styles.container}>
                <Image style={styles.logoImage} source={require('../../assets/logo.png')} />
                <TouchableOpacity style={styles.buttonBox} onPress={() => this.navigateTo('MainScreen')}>
                    <Text style={styles.buttonText}>
                        Search Destination
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBox} onPress={() => this.navigateTo('MarkScreen')}>
                    <Text style={styles.buttonText}>
                        Mark the Loactions
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBox} onPress={this.removeInfo_Async}>
                    <Text style={styles.buttonText}>
                        Log out
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a3f95',
        alignItems: 'center'
    },
    logoImage: {
        width: height / 6,
        height: height / 6,
        marginBottom: height / 10,
        marginTop: height / 5
    },
    buttonBox: {
        width: width * 4 / 5,
        height: height / 15,
        backgroundColor: '#a8a9ad',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 5,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: width / 25,
        fontWeight: '500',
        color: "#ffffff",
        textAlign: 'center'
    },
});
