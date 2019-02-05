import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';

//import { Card } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

export default class SignupScreen extends React.Component {
    static navigationOptions = {
        title: 'Uber',
        headerStyle: {
            backgroundColor: '#1a3f95',
        },
        headerTintColor: '#fff',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    BackgroundColor="1a3f95"
                    barStyle="light-content"
                />
                <Image style={styles.logoImage}
                    source={require('../../assets/logo.png')} />
                <TextInput style={styles.inputBox}
                    placeholder="Email"
                    placeholderTextColor="#1a3f95"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()}
                />
                <TextInput style={styles.inputBox}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#1a3f95"
                    ref={(input) => this.password = input}
                />
                <TouchableOpacity style={styles.buttonBox}>
                    <Text style={styles.buttonText}>"Login"</Text>
                </TouchableOpacity>
                <View style={styles.signupTextContainer}>
                    <Text style={styles.signupText}> Go back to log in page </Text>
                    <TouchableOpacity onPress={() => navigate('Login')}>
                        <Text style={styles.signupButton}> 로그인 </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a3f95',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signupTextContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16
    },
    signupButton: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: '500'
    },
    inputBox: {
        width: width * 4 / 5,
        height: height / 15,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: width / 25,
        color: '#ffffff',
        marginVertical: 5
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
    logoImage: {
        width: height / 6,
        height: height / 6,
        marginBottom: height / 10,
        marginTop: height / 20
    }
});
