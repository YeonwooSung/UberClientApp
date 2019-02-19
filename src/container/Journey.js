import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
    Image
} from 'react-native';
import MapView from 'react-native-maps';
import uuidv1 from 'uuid/v1';
import PropTypes from 'prop-types';


const { width, height } = Dimensions.get('window');


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
        isLoaded: false
    }


    /**
     * This method gets the direction of the polyline by using the google directions API.
     */
    getDirections = async (startLoc, destinationLoc) => {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({ coords: coords })
            return coords
        } catch (error) {
            return error
        }
    }


    componentDidMount = (pickUp, destination) => {

        // The parameters should be string that contains latitude and longitude
        // i.e. "40.1884979, 29.061018"
        this.getDirections(pickUp, destination);

        this.setState({isLoaded: true});
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

        return (
            <View style={styles.container}>
                <MapView
                    region={region}
                    style={styles.mapContainer}
                    onRegionChange={() => { this.onRegionChange() }}
                >
                    {isLoaded &&
                    <MapView.Polyline
                        coordinates={coords}
                        strokeWidth={2}
                        strokeColor="blue" 
                    />
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
