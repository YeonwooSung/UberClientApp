import React from 'react';
import { 
    StyleSheet, 
    View, 
    Dimensions,
    AsyncStorage,
    Image,
    TextInput
} from 'react-native';
import { Location, Permissions } from 'expo';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';


const { width, height } = Dimensions.get('window');

const LATITUDE_DELTA = 0.0112; //0.0922;
const LONGITUDE_DELTA = 0.0031;

const TAXI_IMG = require('../../assets/taxi.png');

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
            }]
        }
    }

    removeInfo = async () => {
        await AsyncStorage.removeItem('cs3301Uber@id', (err) => { if (err) console.log(err); });
        await AsyncStorage.removeItem('cs3301Uber@pw', (err) => { if (err) console.log(err); });
    }

    getCurrentLocationAsync = () => {
        console.log('test1')

        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position); //TODO set the current position
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

        console.log('test3')
    }

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
                >
                    <View style={styles.searchBar}>
                        <TextInput 
                            placeholder=" Search here" //TODO need to test this
                            selectionColor={'black'} //TODO need to test this
                            fontSize={(window.width) * 0.05}
                        ></TextInput>
                    </View>
                    {drivers.map(driver => (
                        <Marker
                            coordinate={driver.latlng}
                            title={driver.name}
                            key={driver.name}
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
        flex: 1,
        width: width,
        height: height,
    },
    carImage: {
        width: width / 15,
        height: width / 15
    },
    searchBar: {
        position: 'absolute',
        top: width / 10, //TODO need to test this
        width: width / 5 * 4,
        height: 40, //TODO should avoid hard coding..
    }
});
