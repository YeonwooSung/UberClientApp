import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';


let phoneCall = require('../component/phoneCallLinker');

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
        cancel: PropTypes.func.isRequired, //TODO
        navigateTo: PropTypes.func.isRequired //TODO
    }

    /**
     * The aim of this method is to open the phone call component to have a phone call with driver.
     */
    callToDriver = () => {
        let {journey} = this.state;
        if (journey) {
            console.log('journey: ', journey);
            console.log('driver: ', journey.driver);
            let phoneNumber = journey.driver.phoneNum;

            if (phoneNumber) {
                // link to the phone call component
                phoneCall.callNumber(phoneNumber); //TODO need to test
            } else {
                alert('Driver phone number is not registered!');
            }
        }
    }

    trackJourney = () => {
        const {journey} = this.state;

        this.props.navigateTo('Journey', {
            journey: journey
        });
    }

    // initialise the attributes of LinkObject component
    componentDidMount = () => {
        let { journey } = this.props;
        let journeyTime = journey.time;

        this.setState({journey: journey, journeyTime: journeyTime});
    }

    render() {
        let { journey, journeyTime, started, finished } = this.state;

        if (journeyTime) {
            let timeString = journeyTime.toString().split(' GMT')[0];
            let destinationString = journey.destination;

            // check if the journey is started
            if (started) {

                // check if the journey is finished
                if (finished) {
                    //TODO
                    return (
                        <View style={styles.finishedContainer}>
                            <TouchableOpacity>
                                <Text>Finish the journey</Text>
                            </TouchableOpacity>
                        </View>
                    );

                } else {
                    //TODO
                    return (
                        <View style={styles.startedContainer}>
                            <TouchableOpacity onPress={this.trackJourney}>
                                <Text>Track the journey</Text>
                            </TouchableOpacity>
                        </View>
                    );

                }

            } else {

                return (
                    <View style={styles.container}>
                        <View>
                            <Text>{timeString}</Text>
                            <Text>{destinationString}</Text>
                        </View>
                        <View style={styles.actionButtonContainer}>
                            <TouchableOpacity onPress={this.callToDriver} style={styles.actionButton}>
                                <Text style={styles.actionText}>call</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Text style={styles.actionText}>start</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.cancel} style={styles.actionButton}>
                                <Text style={styles.actionText}>cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );

            }
        
        } else {
            return (
                <View></View>
            )
        }
    }
}

//TODO need to check style
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1a3f95",
        width: width / 5 * 4,
        height: width / 5 * 3,
        borderBottomColor: "#bbbbbb",
        borderBottomWidth: 0.5,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    startedContainer: {
        flex: 1,
        backgroundColor: "#1a3f95",
        width: width / 5 * 4,
        height: width / 5 * 3,
        borderBottomColor: "#bbbbbb",
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    finishedContainer: {
        flex: 1,
        backgroundColor: "#1a3f95",
        width: width / 5 * 4,
        height: width / 5 * 3,
        borderBottomColor: "#bbbbbb",
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionButton: {
        width: width / 7,
        height: width / 13,
        backgroundColor: '#a8a9ad',
        borderColor: '#1a3f95',
        borderWidth: 0.7,
        borderRadius: 13,
        alignItems: 'center'
    },
    actionText: {
        color: "#1a3f95",
        fontSize: width / 25
    },
    actionButtonContainer: {
        backgroundColor: "#1a3f95",
        flex: 1
    }
});
