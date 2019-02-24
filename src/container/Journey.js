import React from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    Image
} from 'react-native';
import MapView, { ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';

import Polyline from '@mapbox/polyline';


/* global variables for width and height of device */
const { width, height } = Dimensions.get('window');

/* global variables for geolocational position */
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0112;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

/* global variable for the api key */
const API_KEY = require('../component/key').GOOGLE_API_KEYS;

/* constant to load the image */
const TAXI_IMG = require('../../assets/taxi.png');

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
        journey: undefined,
        driver: undefined,
        pickUp: undefined,
        destination: undefined,
        coordIndex: 0,
        currentCoord: undefined,
        intervalID: 0
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

            // this will be used to animate the driver marker on the map along polyline
            let initialCoordination = new AnimatedRegion({
                latitude: coords[0].latitude,
                longitude: coords[0].longitude
            });

            this.setState({ 
                coords: coords,
                currentCoord: initialCoordination
            });

            this.interval_animation();

            return coords
        } catch (error) {
            return error
        }
    }

    // use the setInterval() function to execute the animateDriver() method every seconds
    interval_animation() {
        let timerId = setInterval(() => {
            this.animateDriver();
            console.log('yes');
        }, 1000);

        // storet the id of setInterval() function, which will be used for removing the timer when the task is finished
        this.setState({intervalID: timerId});
    }

    /**
     * The aim of this method is to animate the map marker on the google map.
     * By using the animation, the driver (marker with the car image) could move along the polyline.
     * This will allow the user to track the driver’s location and display in real time.
     */
    animateDriver = () => {
        let { coords, coordIndex, currentCoord } = this.state;

        if (coords.length - 1 > coordIndex) {
            coordIndex += 1;

            this.setState({ coordIndex: coordIndex });

            let newCoordinate = {
                latitude: coords[coordIndex].latitude,
                longitude: coords[coordIndex].longitude
            };

            if (this.marker) {
                //move the marker on the map from current coordinate to given coordinate
                currentCoord.timing(newCoordinate).start();
            }

        } else {
            let {intervalID} = this.state;

            clearInterval(intervalID); //stop setInterval() to execute animateDriver()

            alert('Finished!!'); //TODO use notification component

            // Let the LinkScreen know that this journey is finished.
            let finishJourney = this.props.navigation.getParam('finishJourney');
            finishJourney();
        }

    }


    componentDidMount = () => {
        // Initialise the attributes, and send a request for the google directions api to draw journey route on the map.
        //--------------------------------------------------------------------------------------------------------------
        let journey = this.props.navigation.getParam('journey');
        let driver = journey.driver;

        const pickUpLocation = journey.pickUpLocation;
        const destination = journey.destinationGeolocation;

        const pickUp = pickUpLocation.latitude + ',' + pickUpLocation.longitude;
        const dest = destination.latitude + ',' + destination.longitude;

        // The parameters should be string that contains latitude and longitude
        //      i.e. "40.1884979, 29.061018"
        this.getDirections(pickUp, dest);

        // set the attributes with suitable values
        this.setState({ 
            journey: journey, 
            isLoaded: true, 
            driver: driver, 
            pickUp: pickUpLocation, 
            destination: destination
        });
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
        const { region, coords, isLoaded, currentCoord } = this.state;

        return (
            <View style={styles.container}>
                <MapView
                    region={region}
                    style={styles.mapContainer} 
                    onRegionChange={() => { this.onRegionChange() }}
                >
                    <Marker.Animated
                        ref={marker => { this.marker = marker; }} 
                        coordinate={currentCoord} 
                    >
                        <View>
                            <Image
                                source={TAXI_IMG}
                                style={styles.carImage}
                                onLoad={() => this.forceUpdate()}
                            />
                        </View>
                    </Marker.Animated>
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
        );
    }

}

JourneyScreen.propTypes = {
    provider: ProviderPropType,
};


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
    carImage: {
        width: width / 15,
        height: width / 15
    }
});
