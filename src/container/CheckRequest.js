import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class CheckRequestScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: undefined,
            driver: undefined,
            pickUpLocation: undefined,
            destination: undefined,
            destinationGeolocation: undefined
        }
    }

    /* Make the navigation header invisible. */
    static navigationOptions = {
        header: null
    };


    componentDidMount = () => {
        // gets the navigation parameters, and set the state of CheckRequest component
        //----------------------------------------------------------------------------
        const time = this.props.navigation.getParam('time');
        const driver = this.props.navigation.getParam('driver');
        const pickup = this.props.navigation.getParam('pickUpLocation');
        const dest = this.props.navigation.getParam('destination');
        const destGeo = this.props.navigation.getParam('destinationGeolocation');

        this.setState({
            time: time, 
            driver: driver,
            pickUpLocation: pickup,
            destination: dest,
            destinationGeolocation: destGeo
        });
        //----------------------------------------------------------------------------
    }


    // This method will start the journey when the user press the "confirm" button
    startJourney = () => {
        //
    }


    // This method will cancel the journey when the user press the "cancel" button
    cancelRequest = () => {
        //
    }


    render () {
        let { time, driver, destination } = this.state;

        let driverString = 'The driver that you selected is ' + driver.name;
        let destinationString = 'Your destination: ' + destination;
        let timeString = 'Journey time: ';

        //TODO need to calculate the "estimated time for journey"
        let estimatedTime = 'Estimated time: ';

        return (
            <View style={styles.container}>
                <Image style={styles.logoImage} source={require('../../assets/logo.png')} />
                <Text>Please confirm your journey</Text>
                <Text>{driverString}</Text>
                <Text>{destinationString}</Text>
                <Text>{timeString}</Text>
                <Text>{estimatedTime}</Text>
                <TouchableOpacity onPress={this.startJourney}>
                    <Text>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.cancelRequest}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height
    }
});
