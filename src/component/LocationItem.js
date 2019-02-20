import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    Alert
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
        description: PropTypes.string,
        changeInputValue: PropTypes.func.isRequired
    }

    handlePress = async () => {
        this.setState({selected: true});

        let {fetchDetails, onAutoCompleteInput, setDestinationLatLng, description, changeInputValue} = this.props;

        changeInputValue(description);

        onAutoCompleteInput(description);

        const res = await fetchDetails(this.props.place_id);

        if (res) {
            const lat = res['geometry']['location']['lat'];
            const lng = res['geometry']['location']['lng'];

            setDestinationLatLng(lat, lng);
        } else {
            Alert.alert(
                'Error: fetch failed',
                'Failed to get geolocation data dynamically',
                [
                    {
                        text: 'retry', 
                        onPress: async () => { 
                            await this.handlePress() 
                        }
                    },
                    {
                        text: 'ok', 
                        onPress: () => alert('Please try again!')
                    }
                ]
            )
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
        backgroundColor: 'blue'
    }
});
