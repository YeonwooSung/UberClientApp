import React from 'react'
import {
    View,
    AsyncStorage,
    StyleSheet,
    Dimensions
} from 'react-native';
import { Rating } from 'react-native-elements';


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

    componentDidMount = () => {
        const journey = this.props.navigation.getParam('journey');

        this.setState({journey: journey});
    }

    /**
     * This method will be called only when the journey is finished, and client finish the payment.
     * It will update the journey list, and store the updated list in the local storage.
     * Then, the app screen will be navigated to the LinkScreen component.
     */
    completeJourney = async () => {
        //TODO update the journey list and store it in the async storage.

        this.props.navigation.state.params.refresh(); //TODO need to test this

        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <Rating
                    showRating
                    onFinishRating={this.ratingCompleted}
                    fractions={1} 
                    style={{ paddingVertical: 10 }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height
    }
});
