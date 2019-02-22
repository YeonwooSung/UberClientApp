import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';


const { width, height } = Dimensions.get('window');

export default class DriverInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isSelected: false,
        rating: 0
    }

    static propTypes = {
        driver: PropTypes.object.isRequired,
        selectDriver: PropTypes.func.isRequired
    }


    /* the event listener, which will call the selectDriver() method of RequestTripScreen class. */
    handlePress = async (driver) => {
        this.setState({isSelected: true});
        this.props.selectDriver(driver);
    };


    componentDidMount = () => {
        //Calculate the average value of ratings of the given driver.
        //---------------------------------------------------------------
        let {ratings} = this.props.driver;

        let i;
        let totalRating = 0;

        for (i = 0; i < ratings.length; i++) {
            totalRating += ratings[i];
        }

        let avgRating = totalRating / ratings.length;

        this.setState({ rating: avgRating});
        //---------------------------------------------------------------
    }


    render() {
        let {driver} = this.props;
        let {isSelected, rating} = this.state;

        let { name, phoneNum } = driver;

        let ratingVal;

        if (rating > 0) {
            ratingVal = 'Rating: '+ rating;
        } else {
            ratingVal = 'No ratings';
        }

        return (
            <View style={isSelected ? styles.container_selected :styles.container}>
                <TouchableOpacity 
                    style={styles.driverInfoButton} 
                    onPress={() => {this.handlePress(driver)}}
                >
                    <Text style={styles.driverInfoText}>{'Name: ' + name}</Text>
                    <Text style={styles.driverInfoText}>{'Contact Num: ' + phoneNum}</Text>
                    <Text style={styles.driverInfoText}>{ratingVal}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width: width / 5 * 4,
        height: height / 8,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
        backgroundColor: 'lightgrey'
    },
    container_selected: {
        backgroundColor: 'lightgreen',
        width: width / 5 * 4,
        height: height / 8,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
    },
    driverInfoButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    driverInfoText: {
        fontSize: width / 28,
        fontWeight: '200',
        textAlign: 'center',
        marginBottom: width / 40,
    }
});
