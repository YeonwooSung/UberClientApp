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


    /* the event listener, which will call the selectDriver() method of RequestTripScreen class. */
    handlePress = async (driver) => {
        this.setState({isSelected: true});
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
        flex: 1,
        width: width / 5 * 4,
        height: width / 5,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
        backgroundColor: 'lightgrey'
    },
    container_selected: {
        backgroundColor: 'lightgreen',
        flex: 1,
        width: width / 5 * 4,
        height: width / 5,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
    },
    driverInfoButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    driverInfoText: {
        fontSize: width / 28,
        fontWeight: '200',
        textAlign: 'center',
        marginBottom: width / 20,
    }
});
