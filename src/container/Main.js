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
import MapView, { Marker } from 'react-native-maps';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import uuidv1 from 'uuid/v1';

import LocationItem from '../component/LocationItem';


/* global variables for width and height of device */
const { width, height } = Dimensions.get('window');

/* global variables for geolocational position */
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0112;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

/* constant to load the image */
const TAXI_IMG = require('../../assets/taxi.png');

/* api key for the Google Places API, which will be used for auto completion */
const API_key = require('../component/key').GOOGLE_API_KEYS;


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
            }],
            autoCompleteValue: undefined,
            selectedDestination: {
                latitude: 56.34026,
                longitude: -2.808796,
            },
            selected: false,
            inputTextValue: ''
        }
    }


    /* Make the navigation header invisible. */
    static navigationOptions = {
        header: null
    };


    /**
     * The aim of this method is to get the current location of the user asynchronously.
     */
    getCurrentLocationAsync = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
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
        this.setState({selected: false});

        let {region, drivers, selectedDestination} = this.state;

        this.props.navigation.navigate('Request', {
            pickUpLocation: region, 
            destination: regionValue, 
            drivers: drivers,
            destinationGeolocation: selectedDestination
        });
    }


    /**
     * Gets the list of available drivers from the local storage.
     */
    getListOfAvailableDrivers = async () => {
        try {
            // get the list of available drivers
            let driverList = await AsyncStorage.getItem('cs3301Uber@drivers');

            if (driverList) {
                let drivers = JSON.parse(driverList);
                this.setState({ drivers: drivers });
            } else {
                let { drivers } = this.state;

                let driverListStr = JSON.stringify(drivers);

                console.log('stringify: ', driverListStr);

                // if the AsyncStorage does not have key 'drivers', then store the list of available drivers in the local storage
                await AsyncStorage.setItem('cs3301Uber@drivers', driverListStr);

                console.log('hi');
            }

        } catch {
            console.log('error in MainScreen::getListOfAvailableDrivers()');
        }
    }


    componentDidMount() {
        this.getPermissionForLocationAsync();

        this.getListOfAvailableDrivers();
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


    /* change the input text */
    changeInputValue = (text) => {
        this.setState({inputTextValue: text});
    }


    /**
     * Store the auto completed value.
     */
    onAutoCompleteInput = (autoCompleteValue) => {
        this.setState({ autoCompleteValue: autoCompleteValue });
    }

    render() {
        let { region, drivers, autoCompleteValue, selected, inputTextValue } = this.state;

        return (
            <View style={styles.container}>
                <MapView
                    region={region}
                    style={styles.mapContainer}
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
                    apiKey={API_key.Google_API_KEY} 
                    debounce={500} components="country:uk" 
                    queryTypes='establishment'
                >
                    {({
                        handleTextChange,
                        locationResults,
                        fetchDetails,
                        isSearching
                    }) => (
                            <React.Fragment>
                                <View style={styles.searchBarContainer}>
                                    <TextInput
                                        style={styles.searchBar}
                                        placeholder="Type Here..."
                                        onChangeText={(text) => {
                                            handleTextChange(text);
                                            this.changeInputValue(text);
                                        }}
                                        value={inputTextValue}
                                    />
                                </View>
                                {isSearching && <ActivityIndicator size="large" color="red" />}
                                {!selected && 
                                <ScrollView 
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
                                            changeInputValue={this.changeInputValue} 
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
                        onPress={() => this._onPressRequestButton(autoCompleteValue)}
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
        ...StyleSheet.absoluteFillObject,
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
