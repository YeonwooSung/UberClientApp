import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    AsyncStorage,
    Image,
    TextInput,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Text
} from 'react-native';
import { Location, Permissions } from 'expo';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import uuidv1 from 'uuid/v1';

import LocationItem from '../component/LocationItem';


/* global variables for width and height of device */
const { width, height } = Dimensions.get('window');

/* global variables for geolocational position */
const LATITUDE_DELTA = 0.0112; //0.0922;
const LONGITUDE_DELTA = 0.0031;

/* constant to load the image */
const TAXI_IMG = require('../../assets/taxi.png');

/* api key for the Google Places API, which will be used for auto completion */
const placeAPI_key = require('../component/key').GEOLOCATION_KEYS;


/**
 * This class renders the main screen of the uber clone app.
 */
export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 56.34026,
                longitude: -2.808796,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            drivers: [{
                latlng: {
                    latitude: 56.335054,
                    longitude: -2.8063431,
                },
                name: "James"
            }, {
                latlng: {
                    latitude: 56.345054,
                    longitude: -2.808796,
                },
                name: "Steve"
            }, {
                latlng: {
                    latitude: 56.325054,
                    longitude: -2.8063431,
                },
                name: "Tomas"
            }],
            autoCompleteValue: undefined,
            selectedDestination: {
                latitude: 56.34026,
                longitude: -2.808796,
            },
            selected: false
        }
    }


    static propTypes = {
        /* the navigateTo() function will be used for implementing the log out function */
        navigateTo: PropTypes.func.isRequired,
        /* navigate() function will be used for navigation that navigates to the request trip screen */
        navigate: PropTypes.func.isRequired
    }


    /**
     * Implemented for the log out feature.
     */
    removeInfo_Async = async () => {
        await AsyncStorage.removeItem('cs3301Uber@id', (err) => { if (err) console.log(err); });
        await AsyncStorage.removeItem('cs3301Uber@pw', (err) => { if (err) console.log(err); });
    }

    /**
     * The aim of this method is to get the current location of the user asynchronously.
     */
    getCurrentLocationAsync = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position); //TODO set the current position

                // set the user's location to display a map of the user’s current location
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                })
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }


    /**
     * This method gets the permission for the location asynchronously.
     */
    getPermissionForLocationAsync = async () => {
        const isEnabled = (await Location.getProviderStatusAsync()).locationServicesEnabled;

        if (!isEnabled) {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);

            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            } else {
                this.getCurrentLocationAsync();
            }
        } else {
            this.getCurrentLocationAsync();
        }
    }


    _onPressRequestButton = (regionValue) => {
        let {region, drivers, selectedDestination} = this.state;
        //TODO get the geolocational information of destination point -> navigate to request trip screen
        this.props.navigate('Request', {
            pickUpLocation: region, 
            destination: regionValue, 
            drivers: drivers,
            destinationGeolocation: selectedDestination
        });
    }


    componentDidMount() {
        //this.removeInfo_Async();
        //TODO this.getPermissionForLocationAsync();
    }


    /**
     * Change the state of the MainScreen component when the region is changed.
     * @param {*} newRegion 
     */
    onRegionChange(newRegion) {
        this.setState({ region: newRegion });
    }


    /**
     * Set the latitude and longitude of destination.
     */
    setDestinationLatLng = (lat, lng) => {
        this.setState({
            selectedDestination: {
                latitude: lat, 
                longitude: lng
            }, 
            selected: true
        });
    }


    /**
     * Store the auto completed value.
     */
    onAutoCompleteInput = (autoCompleteValue) => {
        console.log('autoCompleteInput: ', autoCompleteValue);
        this.setState({ autoCompleteValue: autoCompleteValue });
    }

    render() {
        let { region, drivers, autoCompleteValue, selected } = this.state;

        return (
            <View style={styles.container}>
                <MapView
                    region={region}
                    style={styles.mapContainer}
                    onRegionChange={() => { this.onRegionChange() }}
                >
                    {drivers.map(d => (
                        <Marker
                            coordinate={d.latlng}
                            title={d.name}
                            key={d.name}
                        >
                            <View>
                                <Image
                                    source={TAXI_IMG}
                                    style={styles.carImage}
                                    onLoad={() => this.forceUpdate()}
                                />
                            </View>
                        </Marker>
                    ))}
                </MapView>
                <GoogleAutoComplete 
                    apiKey={placeAPI_key.Google_Place_API_KEY} 
                    debounce={300} components="country:uk" 
                    queryTypes='geocode' 
                >
                    {({
                        handleTextChange,
                        locationResults,
                        fetchDetails,
                        isSearching,
                        inputValue
                    }) => (
                            <React.Fragment>
                                <View style={styles.searchBarContainer}>
                                    <TextInput
                                        style={styles.searchBar}
                                        placeholder="Type Here..."
                                        onChangeText={handleTextChange}
                                        value={inputValue}
                                    />
                                </View>
                                {isSearching && <ActivityIndicator size="large" color="red" />}
                                {!selected && <ScrollView 
                                    style={locationResults.length != 0 ? {
                                        position: 'absolute',
                                        top: width / 5,
                                        left: width / 10,
                                        width: width / 5 * 4,
                                        height: (locationResults.length > 4 ? width / 2 : (
                                            locationResults.length > 1 ? width / 5 : width / 10
                                        )),
                                    } : {width: 0, height: 0}}
                                >
                                    {locationResults.map(el => (
                                        <LocationItem
                                            {...el}
                                            onAutoCompleteInput={this.onAutoCompleteInput}
                                            fetchDetails={fetchDetails} 
                                            setDestinationLatLng={this.setDestinationLatLng} 
                                            key={uuidv1()}
                                        />
                                    ))}
                                </ScrollView>}
                            </React.Fragment>
                        )}
                </GoogleAutoComplete>
                {selected && <View style={styles.requestTripContainer}>
                    <TouchableOpacity 
                        style={styles.requestTripButton} 
                        onPress={() => this._onPressRequestButton(autoCompleteValue)} //TODO need to test this
                    >
                        <Text style={styles.requestTripText}>
                            Request Trip
                        </Text>
                    </TouchableOpacity>
                </View>}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
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
    },
    searchBarContainer: {
        position: 'absolute',
        top: width / 10,
        left: width / 10,
        width: width / 5 * 4,
        height: width / 10
    },
    searchBar: {
        position: 'absolute',
        width: width / 5 * 4,
        height: width / 10,
        backgroundColor: 'white'
    },
    requestTripContainer: {
        width: width / 3,
        height: width /8,
        position: 'absolute',
        top: height / 10 * 8,
        left: width / 3,
        justifyContent: 'center',
        alignItems: 'center',
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
