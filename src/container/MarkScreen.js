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


/**
 * The aim of this class is to allow the user to mark the pickup location and the
 * destination by placing the location pins at a desired pickup location and destination.
 */
export default class MarkScreen extends React.Component {

    /* Make the navigation header invisible. */
    static navigationOptions = {
        header: null
    };

    static propTypes = {
        provider: ProviderPropType,
    };

    state = {
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
     * 
     */
    pickMarker_pickupLocation = () => {
        //TODO get pickup location info when user put marker on the pickup location
        this.setState({isPicked_pickUp: true});
    }

    /**
     * 
     */
    pickMarker_destination = () => {
        //TODO get destination info when user put marker on the destination
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

        let navigate = this.props.navigation.navigate;

        // use a valid API key to initialise the Geocoder (Google Geocoding API)
        Geocoder.init(API_KEY.Google_API_KEY);

        // get the name of the destination by using Google Geocoding API
        Geocoder.from(destination)
        .then(json => {
            let destination = json.results[0].address_components[0];
            console.log(destination); //TODO need to test this

            navigate('Request', {
                pickUpLocation: pickUpLocation,
                destination: 'TODO',
                drivers: drivers,
                destinationGeolocation: destinationGeolocation
            });
        })
        .catch(error => console.warn(error));
    }


    render() {
        let { pickUpLocation, destinationGeolocation, isPicked_pickUp, isPicked_dest } = this.state;

        return(
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    {isPicked_pickUp &&
                    <Marker
                        coordinate={pickUpLocation}
                        onSelect={(e) => log('onSelect', e)}
                        onDrag={(e) => log('onDrag', e)}
                        onDragStart={(e) => log('onDragStart', e)}
                        onDragEnd={(e) => log('onDragEnd', e)}
                        onPress={(e) => log('onPress', e)}
                        draggable
                    />}
                    {isPicked_dest &&
                    <Marker
                        coordinate={destinationGeolocation}
                        onSelect={(e) => log('onSelect', e)}
                        onDrag={(e) => log('onDrag', e)}
                        onDragStart={(e) => log('onDragStart', e)}
                        onDragEnd={(e) => log('onDragEnd', e)}
                        onPress={(e) => log('onPress', e)}
                        draggable
                    />}
                    {!isPicked_pickUp ?
                    (<TouchableOpacity style={styles.requestTripButton} onPress={}>
                        <Text style={styles.requestTripText}>
                            Select pickup location
                        </Text>
                    </TouchableOpacity>)
                    :
                    (!isPicked_dest ? 
                    <TouchableOpacity style={styles.requestTripButton} onPress={}>
                        <Text style={styles.requestTripText}>
                            Select destination
                        </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.requestTripButton} onPress={}>
                        <Text style={styles.requestTripText}>
                            Request journey
                        </Text>
                    </TouchableOpacity>)
                    }
                </MapView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        width: width,
        height: height
    },
    requestTripButton: {
        position: 'absolute',
        width: width / 3,
        height: width / 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a3f95',
        borderRadius: 25,
    },
    requestTripText: {
        color: 'white',
        fontSize: width / 25,
        textAlign: 'center'
    }
});
