import React from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity
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
     * This method will be called only when the journey is finished, and client finish the payment.
     * It will update the journey list, and store the updated list in the local storage.
     * Then, the app screen will be navigated to the LinkScreen component.
     */
    completeJourney = async () => { //TODO need to test this
        let {journey} = this.state;

        let refresh = this.props.navigation.getParam('refresh');

        await refresh(journey);

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
                        <Text>{'Total price: ' + fare}</Text>
                        <TouchableOpacity onPress={this.completeJourney}>
                            <Text>Pay Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return (
                <View></View>
            )
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
    }
});
