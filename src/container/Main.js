import React from 'react';
import { 
    StyleSheet, 
    View, 
    Dimensions 
} from 'react-native';
import PropTypes from 'prop-types';

import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

export default class MainScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 56.335054,
                longitude: -2.8063431,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        }
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
