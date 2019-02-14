import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

export default class SignupScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            password: '',
            surname: '',
            forename: '',
            phoneNumber: ''
        }
    }

    static propTypes = {
        navigateTo: PropTypes.func.isRequired
    }

    storeUserInfo_Async = async () => {
        try {
            const { id, password, surname, forename, phoneNumber } = this.state;

            const newUserObj = {
                id: id,
                pw: password,
                surname: surname,
                forename: forename,
                phoneNum: phoneNumber
            };

            try {
                let userList = await AsyncStorage.getItem('cs3301Uber@users');

                console.log('fml');

                userList = JSON.parse(userList);

                userList.push(newUserObj);

                await AsyncStorage.setItem('cs3301Uber@users', JSON.stringify(userList));
            } catch {
                try {
                    let userList = [newUserObj];

                    await AsyncStorage.setItem('cs3301Uber@users', JSON.stringify(userList));
                } catch {
                    alert('error!');
                }
            }

        } catch (err) {
            console.log(err);
            alert('failed to sign up');
        }
    }

    /* This method checks if the user filled all text inputs */
    checkIfTheUserFilledAllTextInput_Async = async () => {
        const navigate = this.props.navigateTo;

        const {id, password, surname, forename, phoneNumber} = this.state;

        if (surname !== '') {
            if (forename != '') {
                if (phoneNumber !== '') {
                    if (id !== '') {
                        if (password !== '') {
                            //store the user information in the local storage
                            await this.storeUserInfo_Async();

                            //navigate to the log in screen
                            navigate('Login');
                        } else {
                            alert('Please input password');
                        }
                    } else {
                        alert('Please input your ID');
                    }
                } else {
                    alert('Please input your phone number!');
                }
            } else {
                alert('Please input your forename');
            }
        } else {
            alert('Please input your surname');
        }
    }

    render() {
        const navigate = this.checkIfTheUserFilledAllTextInput_Async;
        const {navigateTo} = this.props;
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
                    keyboardType="name-phone-pad"
                    onSubmitEditing={(input) => this.setState({surname: input})}
                />
                <TextInput style={styles.inputBox}
                    placeholder="Forename"
                    placeholderTextColor="#1a3f95"
                    selectionColor="#fff"
                    keyboardType="name-phone-pad"
                    onSubmitEditing={(input) => this.setState({ forename: input })}
                />
                <TextInput style={styles.inputBox}
                    placeholder="Phone Number"
                    placeholderTextColor="#1a3f95"
                    selectionColor="#fff"
                    keyboardType="numeric"
                    onSubmitEditing={(input) => this.setState({ phoneNumber: input })}
                />
                <TextInput style={styles.inputBox}
                    placeholder="ID"
                    placeholderTextColor="#1a3f95"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={
                        (input) => {
                            this.password.focus();
                            this.setState({id: input});
                        }
                    }
                />
                <TextInput style={styles.inputBox}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#1a3f95"
                    onSubmitEditing={(input) => {this.setState({ password: input })}}
                    ref={(input) => this.password = input}
                />
                <TouchableOpacity style={styles.buttonBox} onPress={() => navigate()}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <TouchableOpacity onPress={() => navigateTo('Login')}>
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
