import React from 'react';
import {
    View,
    ScrollView,
    AsyncStorage,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Alert,
    Image,
    Text
} from 'react-native';
import uuidv1 from 'uuid/v1';

import LinkObject from '../component/LinkObject';

/* global variables for width and height of device */
const { width, height } = Dimensions.get('window');

export default class LinkScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            journeyList: []
        }
    }

    /**
     * This method will refresh and re-render the LinkScreen component to delete the completed journey from the list.
     */
    refreshToDeleteCompletedJourney = () => {
        //TODO clean the stack navigator history

        this.getJourneyList_Async();
    }

    /**
     * The aim of this method is to load the journey list from the local storage.
     */
    getJourneyList_Async = async () => {
        try {
            const journeyListStr = await AsyncStorage.getItem('cs3301Uber@journey', (err, res) => {
                if (err) {
                    alert('Failed to get journey list!');
                } else {
                    console.log('res', res);
                }
            });

            let journeyList = JSON.parse(journeyListStr);

            this.setState({journeyList: journeyList});
        } catch {

            Alert.alert(
                'Err: getJourneyList_Async() failed',
                'failed to get the list of journey..',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            console.log('getJourenyList_Async() failed');
                        }
                    }
                ]
            );

        }
    }


    /**
     * This method helps the user to cancel the requested journey.
     */
    cancelJourney = async (journey) => {
        //TODO need to test
        let {journeyList} = this.state;

        for (var i = 0; i < journeyList.length - 1; i++) {

            if (journeyList[i].pickUpLocation == journey.pickUpLocation) {
                if (journeyList[i].destination == journey.destination) {
                    if (journeyList[i].time == journey.time) {
                        journeyList.splice(i, 1);
                        break;
                    }
                }
            }

        }

        await AsyncStorage.setItem('cs3301Uber@journey', JSON.stringify(journeyList));

        this.setState({journeyList: journeyList}); //TODO need to test
    }


    makeNewJourney = () => {
        // navigate to MainScreen to make a new journey request
        this.props.navigation.navigate('Main');
    }


    /**
     * The aim of this method is to navigate the screen to the summary page.
     *
     * @param {object} journey The object that contains the information of a requested journey.
     */
    goToSummaryPage = (journey) => {
        this.props.navigation.navigate('Summary', {
            journey: journey,
            refresh: this.refreshToDeleteCompletedJourney
        });
    }

    componentDidMount = () => {
        this.getJourneyList_Async(); //load the journey list from the local storage
    }


    render() {
        let { journeyList } = this.state;

        let journeyComponent;

        if (journeyList) {
            journeyComponent = journeyList.map(j => {
                return (
                    <LinkObject 
                        journey={j} 
                        navigateTo={this.props.navigation.navigate} 
                        cancel={() => this.cancelJourney(j)} 
                        key={uuidv1()}
                    />
                );
            });
        } else {
            journeyComponent = (
                <View style={styles.containerForEmptyJourneyList}>
                    <Text style={styles.textForEmptyJourney}>No journey request</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Image style={styles.logoImage} source={require('../../assets/logo.png')} />
                <ScrollView 
                    style={styles.scrollContainer}
                >
                    {journeyComponent}
                </ScrollView>
                <TouchableOpacity onPress={this.makeNewJourney}>
                    <Text>Add New Journey</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a3f95',
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImage: {
        width: height / 6,
        height: height / 6,
        marginBottom: width / 10,
        marginTop: width / 15
    },
    scrollContainer: {
        flex: 1,
        width: width / 5 * 4,
        height: height / 5 * 3
    },
    containerForEmptyJourneyList: {
        width: width / 5 * 4,
        height: width / 5 * 3 //TODO
    },
    textForEmptyJourney: {
        fontSize: width / 20,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: width / 20
    },
    addJourneyButton: {
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
        color: "#ffffff",
        textAlign: 'center'
    }
});
