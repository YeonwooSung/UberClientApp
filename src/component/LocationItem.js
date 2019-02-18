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

    static propTypes = {
        fetchDetails: PropTypes.func.isRequired,
        onAutoCompleteInput: PropTypes.func.isRequired,
        description: PropTypes.string
    }

    handlePress = async () => {
        this.props.onAutoCompleteInput(this.props.description);
        const res = await this.props.fetchDetails(this.props.place_id);
        console.log('result', res);
    };

    render() {
        return (
            <TouchableOpacity style={styles.root} onPress={this.handlePress}>
                <Text>{this.props.description}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: width / 10, //TODO need to avoid hardcoding
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
    },
});
