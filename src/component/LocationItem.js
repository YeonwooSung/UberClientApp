import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';


const { width, height } = Dimensions.get('window');

export default class LocationItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        selected: false
    }

    static propTypes = {
        fetchDetails: PropTypes.func.isRequired,
        onAutoCompleteInput: PropTypes.func.isRequired,
        setDestinationLatLng: PropTypes.func.isRequired,
        description: PropTypes.string
    }

    handlePress = async () => {
        this.setState({selected: true});

        this.props.onAutoCompleteInput(this.props.description);
        const res = await this.props.fetchDetails(this.props.place_id);

        if (res) {
            const lat = res['geometry']['location']['lat'];
            const lng = res['geometry']['location']['lng'];

            console.log('latitude', lat)
            console.log('longitude', lng)

            this.props.setDestinationLatLng(lat, lng);
        } else {
            alert('Failed to get location info');
        }
    };

    render() {
        let {selected} = this.state;

        return (
            <TouchableOpacity 
                style={selected ? styles.selected : styles.unselected} 
                onPress={() => this.handlePress()}
            >
                <Text>{this.props.description}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    unselected: {
        height: width / 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    selected: {
        height: width / 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        backgroundColor: '#0bef81'
    }
});
