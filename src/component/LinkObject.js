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
        cancel: PropTypes.func.isRequired,
        navigateTo: PropTypes.func.isRequired,
        goToSummaryPage: PropTypes.func.isRequired
    }


    /**
     * This method will be called when the journey is finished.
     */
    finishTheJourney = () => {
        this.setState({finished: true});
    }


    /**
     * This method will be called when the user starts the journey
     */
    startJourney = () => {
        console.log('start');
        this.setState({started: true});
    }


    /**
     * The aim of this method is to open the phone call component to have a phone call with driver.
     */
    callToDriver = () => {
        let {journey} = this.state;
        if (journey) {
            let phoneNumber = journey.driver.phoneNum;

            if (phoneNumber) {
                // link to the phone call component
                phoneCall.callNumber(phoneNumber);
            } else {
                alert('Driver phone number is not registered!');
            }
        }
    }

    // Track the journey by navigating to the JourneyScreen.
    trackJourney = () => {
        const {journey} = this.state;

        this.props.navigateTo('Journey', {
            journey: journey,
            finishJourney: this.finishTheJourney
        });
    }


    // initialise the attributes of LinkObject component
    componentDidMount = () => {
        let { journey } = this.props;
        let journeyTime = journey.time;

        let cur = new Date();

        if (journeyTime >= cur) {
            this.setState({ journey: journey, journeyTime: journeyTime, started: true });
        } else {
            this.setState({ journey: journey, journeyTime: journeyTime });
        }

    }


    render() {
        let { journey, journeyTime, started, finished } = this.state;
        let { goToSummaryPage } = this.props;

        if (journeyTime) {
            let timeString = journeyTime.toString().split(' GMT')[0];
            let destinationString = journey.destination;

            // check if the journey is started
            if (started) {

                // check if the journey is finished
                if (finished) {

                    return (
                        <View style={styles.finishedContainer}>
                            <TouchableOpacity 
                                onPress={() => goToSummaryPage()} 
                                style={styles.finishedButtonBox}
                            >
                                <Text style={styles.finishedText}>
                                    Finish the journey
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );

                } else {
                    // journey is started, but not finished yet - so go track the journey
                    return (
                        <View style={styles.startedContainer}>
                            <TouchableOpacity 
                                onPress={this.trackJourney} 
                                style={styles.trackButtonBox} 
                            >
                                <Text style={styles.trackButtonText}>
                                    Track journey
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );

                }

            } else {

                // journey is not started
                return (
                    <View style={styles.container}>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoText}>
                                {timeString}
                            </Text>
                            <Text style={styles.infoText}>
                                {destinationString}
                            </Text>
                        </View>
                        <View style={styles.actionButtonContainer}>
                            <TouchableOpacity onPress={this.callToDriver} style={styles.actionButton}>
                                <Text style={styles.actionText}>call</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.startJourney} style={styles.actionButton}>
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


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1a3f95",
        width: width / 5 * 4,
        height: height / 6,
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
        height: height / 6,
        borderBottomColor: "#bbbbbb",
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    finishedContainer: {
        flex: 1,
        backgroundColor: "#1a3f95",
        width: width / 5 * 4,
        height: height / 6,
        borderBottomColor: "#bbbbbb",
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    finishedText: {
        fontSize: width / 25,
        fontWeight: '500',
        color: "#ffffff",
        textAlign: 'center'
    },
    finishedButtonBox: {
        width: width * 2 / 3,
        height: height / 15,
        backgroundColor: '#a8a9ad',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 5,
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
        width: width / 7,
        height: height / 6 - width / 50,
        alignItems: 'center'
    },
    infoTextContainer: {
        width: width / 5 * 2,
        flexDirection: 'column'
    },
    infoText: {
        color: 'white',
        textAlign: 'center',
        marginBottom: width / 35
    },
    trackButtonBox: {
        width: width * 2 / 3,
        height: height / 15,
        backgroundColor: '#a8a9ad',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 5,
        justifyContent: 'center'
    },
    trackButtonText: {
        fontSize: width / 25,
        fontWeight: '500',
        color: "#ffffff",
        textAlign: 'center'
    }
});
