import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

const firebase = require('../component/firebase');

const { width, height } = Dimensions.get('window');

export default class SignupScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            surname: '',
            forename: ''
        }
    }
    static propTypes = {
        navigateTo: PropTypes.func.isRequired
    }

    //TODO need to test this
    checkIfTheUserFilledAllTextInput = () => {
        const { navigate } = this.props.navigateTo;

        const {surname, forename} = this.state;

        console.log(this.password);

        if (surname !== '') {
            if (forename != '') {
                //TODO firebase.storeUserInformation(email, password, forename, surname);
                
                navigate('Login');
            } else {
                alert('Please input your forename');
            }
        } else {
            alert('Please input your surname');
        }
    }

    render() {
        const navigate = this.checkIfTheUserFilledAllTextInput;
        return (
            <View style={styles.container}>
                <StatusBar
                    BackgroundColor="1a3f95"
                    barStyle="light-content"
                />
                <Image style={styles.logoImage}
                    source={require('../../assets/logo.png')} />
                <TextInput style={styles.inputBox}
                    placeholder="Surname"
                    placeholderTextColor="#1a3f95"
                    selectionColor="#fff"
                    keyboardType="name-phone-pad" /* TODO need to test this */
                    onSubmitEditing={(input) => this.setState({surname: input})}
                />
                <TextInput style={styles.inputBox}
                    placeholder="Forename"
                    placeholderTextColor="#1a3f95"
                    selectionColor="#fff"
                    keyboardType="name-phone-pad" /* TODO need to test this */
                    onSubmitEditing={(input) => this.setState({ forename: input })}
                />
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
                    <Text style={styles.buttonText}>"Signup"</Text>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <TouchableOpacity onPress={() => navigate()}>
                        <Text style={styles.toLoginPageButton}> Go back to log in page </Text>
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
    textContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    toLoginPageButton: {
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
