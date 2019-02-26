import React from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { Rating } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';


/* global variables for width and height of device */
const { width, height } = Dimensions.get('window');

export default class SummaryScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 3,
            journey: undefined
        }
    }

    /* Make the navigation header invisible. */
    static navigationOptions = {
        header: null
    };

    componentDidMount = () => {
        const journey = this.props.navigation.getParam('journey');

        this.setState({journey: journey});
    }


    /**
     * The aim of this method is updating the list of available drivers that is stored in the local storage.
     */
    makeDriverAvailable_Async = async () => {
        let {journey, rating} = this.state;

        if (journey) {
            let driver = journey.driver;

            driver.ratings.push(rating); //add the new rating to the driver

            try {
                let driverList = await AsyncStorage.getItem('cs3301Uber@drivers');

                // add the driver to the list of drivers, and store the updated list to the local storage.
                if (driverList) {
                    let drivers = JSON.parse(driverList);

                    drivers.push(driver);

                    await AsyncStorage.setItem('cs3301Uber@drivers', JSON.stringify(drivers));
                }

            } catch {
                alert('failed to store rating');
            }
        }
    }


    /**
     * This method will be called only when the journey is finished, and client finish the payment.
     * It will update the journey list, and store the updated list in the local storage.
     * Then, the app screen will be navigated to the LinkScreen component.
     */
    completeJourney = async () => {
        let {journey} = this.state;

        let refresh = this.props.navigation.getParam('refresh');

        await refresh(journey);

        await this.makeDriverAvailable_Async();

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'LoadingScreen' })],
        });

        this.props.navigation.dispatch(resetAction);
    }


    render() {
        let {journey} = this.state;

        if (journey) {

            let fare = journey.fare;

            return (
                <View style={styles.container}>
                    <View>
                        <Text>How was your driver?</Text>
                        <Rating
                            showRating
                            onFinishRating={(val)=>console.log(val)}
                            fractions={1} 
                            style={{ paddingVertical: 10 }}
                        />
                    </View>
                    <View>
                        <Text style={styles.fareText}>{'Total price: ' + fare}</Text>
                        <TouchableOpacity onPress={this.completeJourney} style={styles.button}>
                            <Text style={styles.buttonText}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return (
                <View></View>
            );
        }

    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: width * 4 / 5,
        height: height / 15,
        backgroundColor: '#a8a9ad',
        borderRadius: 25,
        marginVertical: width / 15,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: width / 25,
        fontWeight: '500',
        color: "white",
        textAlign: 'center'
    },
    fareText: {
        fontSize: width / 25,
        fontWeight: '500',
        color: "black",
        textAlign: 'center',
        marginVertical: width / 30
    }
});
