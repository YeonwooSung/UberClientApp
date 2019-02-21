import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class CheckRequestScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: undefined,
            driver: undefined,
            pickUpLocation: undefined,
            destination: undefined,
            destinationGeolocation: undefined,
            timeString: ''
        }
    }

    /* Make the navigation header invisible. */
    static navigationOptions = {
        header: null
    };


    componentDidMount = () => {
        // gets the navigation parameters, and set the state of CheckRequest component
        //----------------------------------------------------------------------------
        const time = this.props.navigation.getParam('time');
        const driver = this.props.navigation.getParam('driver');
        const pickup = this.props.navigation.getParam('pickUpLocation');
        const dest = this.props.navigation.getParam('destination');
        const destGeo = this.props.navigation.getParam('destinationGeolocation');

        let timeString = time.toString().split(' GMT')[0];

        this.setState({
            time: time, 
            driver: driver,
            pickUpLocation: pickup,
            destination: dest,
            destinationGeolocation: destGeo,
            timeString: timeString
        });
        //----------------------------------------------------------------------------
    }


    // This method will start the journey when the user press the "confirm" button
    startJourney = () => {
        //
    }


    // This method will cancel the journey when the user press the "cancel" button
    cancelRequest = () => {
        //
    }


    render () {
        let { driver, destination, timeString } = this.state;

        if (driver) {
            let driverString = 'The driver that you selected is ' + driver.name;
            let destinationString = 'Your destination: ' + destination;
            let timeStr = 'Journey time: ' + timeString;

            //TODO need to calculate the "estimated time for journey"
            let estimatedTime = 'Estimated time: ';

            return (
                <View style={styles.container}>
                    <Image style={styles.logoImage} source={require('../../assets/logo.png')} />
                    <Text style={styles.mainText}>Please confirm your journey</Text>
                    <Text style={styles.infoText}>{driverString}</Text>
                    <Text style={styles.infoText}>{destinationString}</Text>
                    <Text style={styles.infoText}>{timeStr}</Text>
                    <Text style={styles.infoText}>{estimatedTime}</Text>
                    <TouchableOpacity onPress={this.startJourney} style={styles.buttonBox}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.cancelRequest} style={styles.buttonBox}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Image style={styles.logoImage} source={require('../../assets/logo.png')} />
                    <Text style={styles.mainText}>Loading...</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a3f95',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height
    },
    logoImage: {
        width: height / 6,
        height: height / 6,
        marginBottom: width / 10,
        marginTop: width / 15
    },
    mainText: {
        fontSize: width / 20,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: width / 20,
        color: 'white'
    },
    infoText: {
        fontSize: width / 25,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: width / 20,
        color: 'white'
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
