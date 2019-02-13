import React from 'react';
import { 
    StyleSheet, 
    View, 
    Dimensions,
    AsyncStorage
} from 'react-native';
import { Location, Permissions } from 'expo';
import PropTypes from 'prop-types';

import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const { width, height } = Dimensions.get('window');

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 56.335054,
                longitude: -2.8063431,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            drivers: [{
                latitude: 56.335054,
                longitude: -2.8063431
            }],
            location: undefined
        }
    }

    removeInfo = async () => {
        await AsyncStorage.removeItem('cs3301Uber@id', (err) => { if (err) console.log(err); });
        await AsyncStorage.removeItem('cs3301Uber@pw', (err) => { if (err) console.log(err); });
    }

    getCurrentLocationAsync = async () => {
        console.log('test1')
        //TODO Location.getCurrentPositionAsync not working...
        //TODO maybe need to use other library...
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false });

        console.log('test2')

        console.log(JSON.stringify(location));
        console.log('test3')
    }

    getPermissionForLocationAsync = async () => {
        const isEnabled = (await Location.getProviderStatusAsync()).locationServicesEnabled;

        if (!isEnabled) {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);

            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            } else {
                let location = await this.getCurrentLocationAsync();
            }
        } else {
            let location = await this.getCurrentLocationAsync();
        }
    }

    componentDidMount() {
        //TODO this.removeInfo();
        this.getPermissionForLocationAsync();
    }

    static propTypes = {
        /* the navigateTo() function will be used for implementing the log out function */
        navigateTo: PropTypes.func.isRequired
    }

    onRegionChange(newRegion) {
        this.setState({ region: newRegion });
    }

    render() {
        let { region, drivers, location } = this.state;
        
        return (
            <View style={styles.container}>
                <MapView
                    region={region}
                    style={styles.mapContainer}
                    onRegionChange={() => {this.onRegionChange()}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    mapContainer: {
        flex: 1,
        width: width,
        height: height,
    }
});
