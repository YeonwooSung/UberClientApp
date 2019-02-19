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
        driver: undefined,
        selected: false
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

        console.log('destination', destination);
    }


    selectDriver = (driver) => {
        this.setState({driver: driver, selected: true});
    }


    render() {
        let { destination, availableDrivers, driver, selected } = this.state;

        let destinationStr = "Destination: " + destination

        //TODO need to calculate the "estimated time for journey"

        return (
            <View style={styles.container}>
                <Image style={styles.logoImage} source={require('../../assets/logo.png')} />
                <View style={styles.textContainer}>
                    <Text style={styles.pickUpRegionText}>Pick Up: Your current location</Text>
                    <Text style={styles.destinationText}>{destinationStr}</Text>
                    <Text style={styles.journeyTimeText}>{'Estimated time for journey: '}</Text>
                </View>
                <ScrollView>
                    {availableDrivers.map(d => (
                        <DriverInfo driver={d} key={uuidv1()} />
                    ))}
                </ScrollView>
                {selected &&
                <View>
                    <Text>{'Your driver is ' + driver.name}</Text>
                </View>
                }
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
    pickUpRegionText: {
        fontSize: width / 20,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: height / 20
    },
    destinationText: {
        fontSize: width / 25,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: height / 20
    },
    journeyTimeText: {
        fontSize: width / 25,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: height / 20
    }
});
