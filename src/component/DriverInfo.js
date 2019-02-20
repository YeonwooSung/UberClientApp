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

export default class DriverInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isSelected: false
    }

    static propTypes = {
        driver: PropTypes.object.isRequired,
        selectDriver: PropTypes.func.isRequired
    }

    handlePress = async (driver) => {
        this.props.selectDriver(driver);
    };

    render() {
        let {driver} = this.props;
        let {isSelected} = this.state;

        let { name, phoneNum } = driver;

        return (
            <View style={isSelected ? styles.container_selected :styles.container}>
                <TouchableOpacity 
                    style={styles.driverInfoButton} 
                    onPress={() => {this.handlePress(driver)}}
                >
                    <Text style={styles.driverInfoText}>{'Name: ' + name}</Text>
                    <Text style={styles.driverInfoText}>{'Contact Num: ' + phoneNum}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container_selected: {
        backgroundColor: 'lightgreen',
        flex: 1
    },
    driverInfoButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    driverInfoText: {
        fontSize: width / 28,
        fontWeight: '200',
        textAlign: 'center',
        marginBottom: height / 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
    }
});
