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
            driver: driver
        });
        //----------------------------------------------------------------------------
    }
    


    render () {
        let { time, driver, destination } = this.state;

        //TODO need to calculate the "estimated time for journey"

        return (
            <View style={styles.container}>
                <Image style={styles.logoImage} source={require('../../assets/logo.png')} />
                <Text></Text>
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
