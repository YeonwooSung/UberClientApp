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
        const pickUpLocation = this.props.navigation.getParam('destination', { latitude: 56.34026, longitude: -2.808796 });
        const destination = this.props.navigation.getParam('destination', {latitude: 56.34026, longitude: -2.808796});
        const availableDrivers = this.props.navigation.getParam('drivers',[]);
        const destinationGeolocation = this.props.navigation.getParam('destinationGeolocation', { latitude: 56.34026, longitude: -2.808796 });

        this.setState({
            pickUpLocation: pickUpLocation, 
            destination: destination, 
            availableDrivers: availableDrivers, 
            destinationGeolocation: destinationGeolocation 
        });
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


    navigateToCheckRequest = () => {
        let {pickedTime} = this.state;

        this.props.navigation.navigate('CheckRequest', {
            time: pickedTime, //TODO parameters
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
                    <TouchableOpacity 
                        style={styles.timePickerButton}
                        onPress={() => this.showDateTimePicker()}
                    >
                        <Text style={styles.journeyTimeText}>{isDatePicked ? timeString : 'Press to pick the journey time!'}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    contentContainerStyle={{ //TODO need to test this
                        width: width * 4 / 5,
                        height: (availableDrivers.length > 3 ? 
                            (width / 5 * 3) : (width / 5 * availableDrivers.length)
                        ),
                        marginTop: width / 10,
                        marginBottom: width / 10,
                        borderColor: 'black',
                        borderWidth: 1.0,
                    }}
                >
                    {availableDrivers.map(d => (
                        <DriverInfo driver={d} selectDriver={this.selectDriver} key={uuidv1()} />
                    ))}
                </ScrollView>
                {selected &&
                <View>
                    <TouchableOpacity
                        onPress={() => this.navigateToCheckRequest()}
                        style={styles.navigateButton}
                    >
                        <Text>{'request journey to ' + driver.name}</Text>
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
        width: height / 6,
        height: height / 6,
        marginBottom: width / 10,
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
    timePickerButton: {
        marginBottom: width / 15,
        width: width / 5 * 4,
        height: width / 10,
        marginBottom: width / 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 0.6
    },
    navigateButton: {
        width: width * 4 / 5,
        height: height / 15,
        backgroundColor: '#a8a9ad',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 5,
        justifyContent: 'center'
    }
});
