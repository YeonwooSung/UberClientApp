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
        let {driver} = this.props;

        let { latlng, name, phoneNum } = driver;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.driverInfoButton} onPress={() => this.handlePress}>
                    <Text>{'Name: ' + name}</Text>
                    <Text>{'Contact Num: ' + phoneNum}</Text>
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
