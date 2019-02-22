import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import uuidv1 from 'uuid/v1';
import DateTimePicker from 'react-native-modal-datetime-picker';

import DriverInfo from '../component/DriverInfo';


const { width, height } = Dimensions.get('window');

/**
 * The aim of this class is to display the Request Trip screen, which allows the user to request the trip.
 */
export default class RequestTripScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        pickUpLocation: undefined,
        destination: undefined,
        destinationGeolocation: undefined,
        availableDrivers: [],
        driver: undefined,
        selected: false,
        isDatePickerVisible: false,
        isDatePicked: false,
        pickedTime: '',
        timeString: ''
    }

    /* Make the navigation header invisible. */
    static navigationOptions = {
        header: null
    };

    componentDidMount = () => {
        //initialise the attributes
        //-------------------------
        const pickUpLocation = this.props.navigation.getParam('pickUpLocation', { latitude: 56.34026, longitude: -2.808796 });
        const destination = this.props.navigation.getParam('destination', {latitude: 56.34026, longitude: -2.808796});
        const availableDrivers = this.props.navigation.getParam('drivers',[]);
        const destinationGeolocation = this.props.navigation.getParam('destinationGeolocation', { latitude: 56.34026, longitude: -2.808796 });

        this.setState({
            pickUpLocation: pickUpLocation, 
            destination: destination, 
            availableDrivers: availableDrivers, 
            destinationGeolocation: destinationGeolocation 
        });
        //-------------------------
    }


    // select the driver
    selectDriver = (driver) => {
        this.setState({driver: driver, selected: true});
    }

    // Make the date time picker visible
    showDateTimePicker = () => {
        this.setState({ isDatePickerVisible: true });
    }

    // Make the date time picker invisible
    hideDateTimePicker = () => {
        this.setState({ isDatePickerVisible: false });
    }


    // Check if the picked time is valid,
    handleTimePicked = (time) => {
        let cur = new Date();

        if (time > cur) {
            let timeString = time.toString().split(' GMT')[0];

            this.setState({pickedTime: time, isDatePicked: true, timeString: timeString});
            this.hideDateTimePicker();
        } else {
            //alert the user to re-pick the journey time
            Alert.alert(
                'Error: Invalid time',
                'Please pick the time again!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            this.hideDateTimePicker();
                        }
                    }
                ]
            );

        }
    };


    /**
     * Change the screen to CheckRequest component, which lets the user the confirm or cancel the request.
     */
    navigateToCheckRequest = () => {
        let { pickUpLocation, destination, destinationGeolocation, pickedTime, driver } = this.state;

        this.props.navigation.navigate('CheckRequest', {
            time: pickedTime,
            driver: driver,
            pickUpLocation: pickUpLocation,
            destination: destination,
            destinationGeolocation: destinationGeolocation
        });
    }


    render() {
        let { destination, availableDrivers, driver, selected, isDatePickerVisible, isDatePicked, timeString } = this.state;

        let destinationStr = "Destination: " + destination

        return (
            <View style={styles.container}>
                <Image style={styles.logoImage} source={require('../../assets/logo.png')} />
                <View style={styles.textContainer}>
                    <Text style={styles.pickUpRegionText}>Pick Up: Your current location</Text>
                    <Text style={styles.destinationText}>{destinationStr}</Text>
                    <View style={styles.timePickerButtonContainer}>
                        <TouchableOpacity style={styles.timePickerButton} onPress={this.showDateTimePicker}>
                            <Text style={styles.journeyTimeText}>{isDatePicked ? timeString : 'Press to pick the journey time!'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    style={styles.scrollContainer} 
                    contentContainerStyle={{flexGrow: 1}} 
                >
                    {availableDrivers.map(d => (
                        <DriverInfo driver={d} selectDriver={this.selectDriver} key={uuidv1()} />
                    ))}
                </ScrollView>
                {selected &&
                <View style={styles.navigateButtonContainer}>
                    <TouchableOpacity
                        onPress={() => this.navigateToCheckRequest()}
                        style={styles.navigateButton}
                    >
                        <Text style={styles.navigateText}>{'request journey to ' + driver.name}</Text>
                    </TouchableOpacity>
                </View>
                }
                <DateTimePicker
                    isVisible={isDatePickerVisible}
                    onConfirm={(res) => this.handleTimePicked(res)}
                    onCancel={() => this.hideDateTimePicker()}
                    datePickerModeAndroid='spinner'
                    mode='time'
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImage: {
        width: height / 8,
        height: height / 8,
        marginBottom: width / 15,
        marginTop: width / 15
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        width: width,
        height: height / 4
    },
    pickUpRegionText: {
        fontSize: width / 20,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: width / 20
    },
    destinationText: {
        fontSize: width / 25,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: width / 15
    },
    journeyTimeText: {
        fontSize: width / 25,
        fontWeight: '500',
        textAlign: 'center'
    },
    timePickerButtonContainer: {
        marginBottom: width / 15,
        width: width / 5 * 4,
        height: width / 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 0.6
    },
    timePickerButton: {
        width: width / 5 * 4,
        height: width / 10,
        alignItems: 'center',
    },
    navigateButton: {
        width: width * 3 / 5,
        height: width / 10,
        backgroundColor: '#1a3f95',
        borderRadius: 25,
        justifyContent: 'center'
    },
    navigateButtonContainer: {
        width: width * 4 / 5,
        height: width / 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: height / 6 * 5,
        left: width / 10
    },
    navigateText: {
        fontSize: width / 22,
        fontWeight: '300',
        textAlign: 'center',
        color: 'white'
    },
    scrollContainer: {
        width: width * 4 / 5,
        height: height / 4,
        marginBottom: width / 10,
        borderColor: 'black',
        borderWidth: 1.0,
        position: 'absolute',
        top: height / 2,
        left: width / 10
    }
});
