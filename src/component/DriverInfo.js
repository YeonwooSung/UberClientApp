import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';


const { width, height } = Dimensions.get('window');

export default class DriverInfo extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        driver: PropTypes.object.isRequired
    }

    handlePress = async () => {
        //TODO
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.driverInfoButton} onPress={() => this.handlePress}>
                    <Text>
                        {this.props.description}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    driverInfoButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
