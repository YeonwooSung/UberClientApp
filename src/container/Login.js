import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';


const { width, height } = Dimensions.get('window');

export default class LoginScreen extends React.Component {
    state = {
        id: undefined,
        pw: undefined
    }

    static propTypes = {
        navigateTo: PropTypes.func.isRequired
    }

    storeID_Async = async () => {
        try {
            const { id, pw } = this.state;

            //TODO
            /* need to test this part!!! */
            const userList = await AsyncStorage.getItem('cs3301Uber@users', (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });

            let i;
            for (i = 0; i < userList.length; i++) {
                if (userList[i]['id'] === id) {
                    if (userList[i]['pw'] === pw) {
                        await AsyncStorage.setItem('cs3301Uber@id', id);

                        await AsyncStorage.setItem('cs3301Uber@pw', pw);

                        this.props.navigateTo('Main');
                    }
                }
            }
            /* need to test this part!!! */

        } catch {
            alert('failed to store id');
        }
    }

    render() {
        let navigate = this.props.navigateTo;
        return (
            <View style={styles.container}>
                <Image style={styles.logoImage} source={require('../../assets/logo.png')} />
                <TextInput style={styles.inputBox}
                    placeholder="ID"
                    placeholderTextColor="#1a3f95"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onChangeText={(id) => this.setState({ id: id })}
                    value={this.state.id}
                    onSubmitEditing={() => this.password.focus()}
                />
                <TextInput style={styles.inputBox}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#1a3f95"
                    onChangeText={(pw) => this.setState({ pw: pw })}
                    value={this.state.pw}
                    ref={(input) => this.password = input}
                />
                <TouchableOpacity style={styles.loginButtonBox} onPress={() => this.storeID_Async()}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.signupTextContainer}>
                    <TouchableOpacity onPress={() => navigate('Signup')}>
                        <Text style={styles.signupButton}> Register </Text>
                    </TouchableOpacity>
                </View>
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
    loginButtonBox: {
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
    signupTextContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: width / 20,
        flexDirection: 'row'
    },
    signupButton: {
        color: "#ffffff",
        fontSize: width / 20,
        fontWeight: '500'
    }
});