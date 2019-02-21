import React from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    Image
} from 'react-native';
import MapView from 'react-native-maps';

import Polyline from '@mapbox/polyline';


/* global variables for width and height of device */
const { width, height } = Dimensions.get('window');

/* global variables for geolocational position */
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0112;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

/* global variable for the api key */
const API_KEY = require('../component/key').GOOGLE_API_KEYS;


/**
 * The aim of this class is to display the route of the client's journey on the google map.
 */
export default class JourneyScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        region: {
            latitude: 56.34026,
            longitude: -2.808796,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        coords: [],
        isLoaded: false,
        journey: undefined
    }

    /* Make the navigation header invisible. */
    static navigationOptions = {
        header: null
    };


    /**
     * This method gets the direction of the polyline by using the google directions API.
     * The polyline will be drawn along the way of the journey.
     * 
     * The format of the startLoc and destinationLoc should be "latitude, longitude".
     *      i.e. "56.325054, -2.8063431"
     */
    getDirections = async (startLoc, destinationLoc) => {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${API_KEY.Google_API_KEY}`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);

            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            });

            this.setState({ coords: coords });

            return coords
        } catch (error) {
            return error
        }
    }


    componentDidMount = () => {
        // Initialise the attributes, and send a request for the google directions api to draw journey route on the map.
        //--------------------------------------------------------------------------------------------------------------
        const journey = this.props.navigation.getParam('journey');

        const pickUpLocation = journey.pickUpLocation;
        const destination = journey.destinationGeolocation;

        const pickUp = pickUpLocation.latitude + ',' + pickUpLocation.longitude;
        const dest = destination.latitude + ',' + destination.longitude;

        // The parameters should be string that contains latitude and longitude
        //      i.e. "40.1884979, 29.061018"
        this.getDirections(pickUp, dest);

        this.setState({ journey: journey, isLoaded: true});
        //--------------------------------------------------------------------------------------------------------------
    }


    /**
     * Change the state of the MainScreen component when the region is changed.
     * @param {*} newRegion 
     */
    onRegionChange(newRegion) {
        this.setState({ region: newRegion });
    }


    render() {
        const { region, coords, isLoaded } = this.state;

        //TODO animate google map to make the marker moves on the polyline
        return (
            <View style={styles.container}>
                <MapView
                    region={region}
                    style={styles.mapContainer}
                    onRegionChange={() => { this.onRegionChange() }}
                >
                    {isLoaded ? //check if the coordinates are loaded
                    <MapView.Polyline
                        coordinates={coords} 
                        strokeWidth={5} 
                        strokeColor="blue" 
                        fillColor="blue" 
                    /> 
                    : 
                    <ActivityIndicator size="large" color="red" />
                    }
                </MapView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject, //TODO need to test
        flex: 1,
        width: width,
        height: height,
    },
});
