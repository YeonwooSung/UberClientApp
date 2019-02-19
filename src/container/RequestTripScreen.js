import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
    Image
} from 'react-native';
import uuidv1 from 'uuid/v1';

import DriverInfo from '../component/DriverInfo';


const { width, height } = Dimensions.get('window');

/**
 * The aim of this class is to display the Request Trip screen, which allows the user to request the trip.
 */
export default class RequestTripScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        pickUpLocation: undefined,
        destination: undefined,
        destinationGeolocation: undefined,
        availableDrivers: [],
        driver: undefined
    }

    /* Make the navigation header invisible. */
    static navigationOptions = {
        header: null
    };

    componentDidMount = () => {
        const pickUpLocation = this.props.navigation.getParam('destination', { latitude: 56.34026, longitude: -2.808796 });
        const destination = this.props.navigation.getParam('destination', {latitude: 56.34026, longitude: -2.808796});
        const availableDrivers = this.props.navigation.getParam('drivers',[]);
        const destinationGeolocation = this.props.navigation.getParam('destinationGeolocation', { latitude: 56.34026, longitude: -2.808796 });

        this.setState({
            pickUpLocation: pickUpLocation, 
            destination: destination, 
            availableDrivers: availableDrivers, 
            destinationGeolocation: destinationGeolocation 
        });

        console.log('destination', destination)
    }


    render() {
        let { destination, availableDrivers } = this.state;

        let destinationStr = "Destination: "

        return (
            <View style={styles.container}>
                <Image style={styles.logoImage} source={require('../../assets/logo.png')} />
                <View style={styles.textContainer}>
                    <Text style={styles.regionText}>Pick Up: Your current location</Text>
                    <Text style={styles.regionText}>{destinationStr}</Text>
                </View>
                <ScrollView>
                    {availableDrivers.map(d => (
                        <DriverInfo driver={d} key={uuidv1()} />
                    ))}
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImage: {
        width: height / 6,
        height: height / 6,
        marginBottom: height / 20,
        marginTop: height / 30
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        width: width,
        height: height / 4
    },
    regionText: {
        fontSize: width / 20,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: height / 20
    }
});
