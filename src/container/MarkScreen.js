import React from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';


/* global variable for the api key */
const API_KEY = require('../component/key').GOOGLE_API_KEYS;

/* global variables for width and height of device */
const { width, height } = Dimensions.get('window');

/* global variables for geolocational position */
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0112;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


// This function will log the occurred event
function log(eventName, e) {
    console.log(eventName, e.nativeEvent);
}


/**
 * The aim of this class is to allow the user to mark the pickup location and the
 * destination by placing the location pins at a desired pickup location and destination.
 */
export default class MarkScreen extends React.Component {

    /* Make the navigation header invisible. */
    static navigationOptions = {
        header: null
    };

    state = {
        region: {
            latitude: 56.34026,
            longitude: -2.808796,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        pickUpLocation: {
            latitude: 56.34026,
            longitude: -2.808796,
        },
        destinationGeolocation: {
            latitude: 56.34026,
            longitude: -2.808796,
        },
        isPicked_pickUp: false,
        isPicked_dest: false,
        drivers: [{
            latlng: {
                latitude: 56.335054,
                longitude: -2.8063431,
            },
            name: "James",
            phoneNum: '08789393456',
            ratings: [3, 4, 3]
        }, {
            latlng: {
                latitude: 56.345054,
                longitude: -2.808796,
            },
            name: "Steve",
            phoneNum: '08789245676',
            ratings: [5, 4]
        }, {
            latlng: {
                latitude: 56.325054,
                longitude: -2.8063431,
            },
            name: "Tomas",
            phoneNum: '08780987654',
            ratings: []
        }]
    }


    /**
     * To let the app know that the user picked the pickup location.
     */
    pickMarker_pickupLocation = () => {
        this.setState({isPicked_pickUp: true});
    }

    /**
     * To let the app know that the user picked the destination.
     */
    pickMarker_destination = () => {
        this.setState({isPicked_dest: true});
    }


    /**
     * This method will navigate the screen to the RequestTripScreen.
     */
    requestTrip = () => {
        let {
            pickUpLocation,
            destinationGeolocation,
            drivers
        } = this.state;

        //TODO navigation param

        let navigate = this.props.navigation.navigate;

        // use a valid API key to initialise the Geocoder (Google Geocoding API)
        Geocoder.init(API_KEY.Google_API_KEY);

        // get the name of the destination by using Google Geocoding API
        Geocoder.from(destinationGeolocation)
        .then(json => {
            let destination = json.results[0].address_components[0];

            navigate('Request', {
                pickUpLocation: pickUpLocation,
                destination: destination,
                drivers: drivers,
                destinationGeolocation: destinationGeolocation
            });
        })
        .catch(error => console.warn(error));
    }


    render() {
        let { region, pickUpLocation, destinationGeolocation, isPicked_pickUp, isPicked_dest } = this.state;

        return(
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={region}
                >
                    <Marker
                        coordinate={pickUpLocation}
                        title={'pickup location'}
                        onSelect={(e) => log('onSelect', e)}
                        onDragStart={(e) => log('onDragStart', e)}
                        onDragEnd={(e) => this.setState({pickUpLocation: e.nativeEvent.coordinate})}
                        onPress={(e) => log('onPress', e)}
                        draggable
                    />
                    {isPicked_pickUp &&
                    <Marker
                        coordinate={destinationGeolocation}
                        title={'destination'}
                        onSelect={(e) => log('onSelect', e)}
                        onDragStart={(e) => log('onDragStart', e)}
                        onDragEnd={(e) => this.setState({ destinationGeolocation: e.nativeEvent.coordinate })}
                        onPress={(e) => log('onPress', e)}
                        draggable
                    />}
                </MapView>
                {!isPicked_pickUp ?
                (<TouchableOpacity style={styles.requestTripButton} onPress={this.pickMarker_pickupLocation}>
                    <Text style={styles.requestTripText}>
                        Select pickup location
                    </Text>
                </TouchableOpacity>)
                :
                (!isPicked_dest ? 
                <TouchableOpacity style={styles.requestTripButton} onPress={this.pickMarker_destination}>
                    <Text style={styles.requestTripText}>
                        Select destination
                    </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.requestTripButton} onPress={this.requestTrip}>
                    <Text style={styles.requestTripText}>
                        Request journey
                    </Text>
                </TouchableOpacity>)
                }
            </View>
        );
    }
}

MarkScreen.propTypes = {
    provider: ProviderPropType,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        width: width,
        height: height,
        flex: 1
    },
    requestTripButton: {
        position: 'absolute',
        width: width / 3,
        height: width / 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a3f95',
        borderRadius: 25,
        top: height / 6 * 5,
        left: width / 3
    },
    requestTripText: {
        color: 'white',
        fontSize: width / 25,
        textAlign: 'center'
    }
});
