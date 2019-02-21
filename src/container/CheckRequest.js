import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    AsyncStorage
} from 'react-native';

const {width, height} = Dimensions.get('window');


/**
 * The aim of this component is to let the client check the journey request to confirm or cancel the request.
 */
export default class CheckRequestScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: undefined,
            driver: undefined,
            pickUpLocation: undefined,
            destination: undefined,
            destinationGeolocation: undefined,
            timeString: '',
            estimatedTime: '',
            fare: 0
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


        //TODO need to calculate the "estimated time for journey"
        //TODO need to calculate the "fare"
    }


    navigateTo = () => {
        this.props.navigation.navigate('LinkScreen');
    }

    // This method will start the journey when the user press the "confirm" button
    startJourney = async () => {
        const { time, driver, pickUpLocation, destination, destinationGeolocation, estimatedTime, fare } = this.state;

        // make an instance to store the information of the new journey
        const newJourney = {
            time: time,
            driver: driver,
            pickUpLocation: pickUpLocation,
            destination: destination,
            destinationGeolocation: destinationGeolocation,
            estimatedTime: estimatedTime,
            fare: fare
        }

        try {
            // gets the journey list from the local storage
            let journeyList = JSON.parse(await AsyncStorage.getItem('cs3301Uber@journey'));

            journeyList.push(newJourney); //add new journey object to the journey list

            //store the journey list in the local storage
            await AsyncStorage.setItem('cs3301Uber@journey', JSON.stringify(journeyList));

            this.navigateTo(); //navigate to LinkScreen
        } catch {
            try {
                let journeyList = [newJourney];

                //store the journey list in the local storage
                await AsyncStorage.setItem('cs3301Uber@journey', JSON.stringify(journeyList));

                this.navigateTo(); //navigate to LinkScreen
            } catch {
                alert('failed to confirm the journey!');
            }
        }
    }


    // This method will cancel the journey when the user press the "cancel" button
    cancelRequest = () => {
        this.props.navigation.goBack();
    }


    render () {
        let { driver, destination, timeString, estimatedTime, fare } = this.state;

        if (driver) {
            let driverString = 'The driver that you selected is ' + driver.name;
            let destinationString = 'Your destination: ' + destination;
            let timeStr = 'Journey time: ' + timeString;

            let estimatedTime = 'Estimated time: ' + estimatedTime;

            let fareString = 'Fare: £' + fare; //TODO need to test this

            return (
                <View style={styles.container}>
                    <Image style={styles.logoImage} source={require('../../assets/logo.png')} />
                    <Text style={styles.mainText}>Please confirm your journey</Text>
                    <Text style={styles.infoText}>{driverString}</Text>
                    <Text style={styles.infoText}>{destinationString}</Text>
                    <Text style={styles.infoText}>{timeStr}</Text>
                    <Text style={styles.infoText}>{estimatedTime}</Text>
                    <Text style={styles.infoText}>{fareString}</Text>
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
