import React from 'react';
import { 
    StyleSheet, 
    View, 
    Dimensions,
    AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';

import MapView from 'react-native-maps';

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
            drivers: []
        }
    }

    removeInfo = async () => {
        await AsyncStorage.removeItem('cs3301Uber@id', () => {console.log('error while remove id!')});
        await AsyncStorage.removeItem('cs3301Uber@pw', () => { console.log('error while remove pw!') });
    }

    componentDidMount() {
        this.removeInfo();
        // get the current geolocation position
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });
            },
            (error) => console.log(error.message),
            //TODO { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }, //need to test this..
        );
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });
            }
        );
    }

    static propTypes = {
        /* the navigateTo() function will be used for implementing the log out function */
        navigateTo: PropTypes.func.isRequired
    }

    onRegionChange(newRegion) {
        this.setState({ region: newRegion });
    }

    render() {
        let { region } = this.state;
        
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
