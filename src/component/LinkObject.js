import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

import callNumber from '../component/phoneCallLinker';

/* global variables for width and height of device */
const { width, height } = Dimensions.get('window');

export default class LinkObject extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            journey: undefined,
            journeyTime: undefined,
            started: false,
            finished: false
        }
    }

    static propTypes = {
        journey: PropTypes.object.isRequired,
        cancel: PropTypes.func, //TODO
        navigateTo: PropTypes.func.isRequired //TODO
    }

    /**
     * The aim of this method is to open the phone call component to have a phone call with driver.
     */
    callToDriver = () => {
        let phoneNumber;

        if (phoneNumber) {
            // linke to the phone call component
            callNumber(phoneNumber);
        } else {
            alert('Driver phone number is not registered!');
        }
    }

    // initialise the attributes of LinkObject component
    componentDidMount = () => {
        let { journey } = this.props;
        let journeyTime;

        this.setState({journey: journey, journeyTime: journeyTime});
    }

    render() {
        let { journey, journeyTime, started, finished } = this.state;

        let timeString;
        let destinationString;

        // check if the journey is started
        if (started) {

            // check if the journey is finished
            if (finished) {
                return (
                    <View style={styles.container}>
                        <TouchableOpacity>
                            <Text>Finish the journey</Text>
                        </TouchableOpacity>
                    </View>
                );

            } else {

                return (
                    <View style={styles.container}>
                        <TouchableOpacity>
                            <Text>Track the journey</Text>
                        </TouchableOpacity>
                    </View>
                );

            }

        } else {

            return (
                <View style={styles.container}>
                    <View>
                        <Text>timeString</Text>
                        <Text>destinationString</Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text>call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>start</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );

        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width / 5 * 4,
        height: width / 5 * 3 //TODO
    }
});
