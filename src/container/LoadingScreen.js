import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';


const { width, height } = Dimensions.get('window');

export default class LoadingScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    BackgroundColor="1a3f95"
                    barStyle="light-content"
                />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('LinkScreen')}>
                    <Image
                        resizeMode='contain'
                        resizeMethod='auto'
                        style={styles.welcomeScreenImage}
                        source={require('../../assets/logo.png')}
                    />
                </TouchableOpacity>
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
    welcomeScreenImage: {
        width: width,
        height: height - 70
    }
});
