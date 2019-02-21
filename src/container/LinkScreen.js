import React from 'react';
import {
    View,
    ScrollView,
    AsyncStorage,
    StyleSheet,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert
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
     * The aim of this method is to load the journey list from the local storage.
     */
    getJourneyList_Async = async () => {
        try {
            const journeyListStr = AsyncStorage.getItem('cs3301Uber@journey', (err, res) => {
                if (err) {
                    alert('Failed to get journey list!');
                } else {
                    console.log(res);
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
        //TODO remove the given journey from the journey list, and change update the state and asyncstorage
    }


    makeNewJourney = () => {
        // navigate to MainScreen to make a new journey request
        this.props.navigation.navigate('Main');
    }


    componentDidMount = () => {
        getJourneyList_Async(); //load the journey list from the local storage
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
                        cancel={this.cancelJourney} 
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
                <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        height: height
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
    }
});
