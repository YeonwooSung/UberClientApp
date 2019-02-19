import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
    Image
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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
    }

    /**
     * Change the state of the MainScreen component when the region is changed.
     * @param {*} newRegion 
     */
    onRegionChange(newRegion) {
        this.setState({ region: newRegion });
    }

    render() {
        const { region } = this.region;

        return (
            <View style={styles.container}>
                <MapView
                    region={region}
                    style={styles.mapContainer}
                    onRegionChange={() => { this.onRegionChange() }}
                ></MapView>
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
