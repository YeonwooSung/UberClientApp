import React from 'react';
import { StyleSheet, View } from 'react-native'

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Uber',
        headerStyle: {
            backgroundColor: '#1a3f95',
        },
        headerTintColor: '#fff',
    };

    state = {
        id: undefined,
        pw: undefined
    }

    componentDidMount = () => {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = async () => {
        const id = await AsyncStorage.getItem('cs3301Uber@id', undefined);
        const pw = await AsyncStorage.getItem('cs3301Uber@pw', undefined);

        this.setState({ id: id, pw: pw });
    }

    storeID = async () => {
        try {
            const { id, pw } = this.state;

            await AsyncStorage.setItem('cs3301Uber@id', id);

            await AsyncStorage.setItem('cs3301Uber@pw', pw);

            this.props.navigation.navigate('Monitor', { id: id, pw: pw }); //TODO navigate part

        } catch {
            alert('failed to store id');
        }
    }

    render() {
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
                <TouchableOpacity style={styles.loginButtonBox} onPress={() => this.storeID()}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logoImage: {
        width: height / 6,
        height: height / 6,
        marginBottom: height / 10,
        marginTop: height / 20
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
    }
});