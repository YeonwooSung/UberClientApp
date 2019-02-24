import React from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';


/* global variables for width and height of device */
const { width, height } = Dimensions.get('window');

// This function helps the developer to log the events that are occurred
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
        pickUpLocation: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE + SPACE,
        },
        destinationGeolocation: {
            latitude: LATITUDE - SPACE,
            longitude: LONGITUDE - SPACE,
        },
    }


    render() {
        let { pickUpLocation, destinationGeolocation } = this.state;

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
                    <Marker
                        coordinate={pickUpLocation}
                        onSelect={(e) => log('onSelect', e)}
                        onDrag={(e) => log('onDrag', e)}
                        onDragStart={(e) => log('onDragStart', e)}
                        onDragEnd={(e) => log('onDragEnd', e)}
                        onPress={(e) => log('onPress', e)}
                        draggable
                    />
                    <Marker
                        coordinate={destinationGeolocation}
                        onSelect={(e) => log('onSelect', e)}
                        onDrag={(e) => log('onDrag', e)}
                        onDragStart={(e) => log('onDragStart', e)}
                        onDragEnd={(e) => log('onDragEnd', e)}
                        onPress={(e) => log('onPress', e)}
                        draggable
                    />
                </MapView>
            </View>
        );
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
