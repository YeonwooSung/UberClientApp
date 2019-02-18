import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native';

export default class RequestTripScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        destination: undefined,
        availableDrivers: [],
        driver: undefined
    }

    componentDidMount = () => {
        const region = this.props.navigation.getParam('region', {latitude: 56.34026, longitude: -2.808796});
        const availableDrivers = this.props.navigation.getParam('drivers',[]);
        //TODO any more parameters?

        this.setState({destination: region, availableDrivers: availableDrivers});
    }

    render() {
        let { destination } = this.state;

        return (
            <View style={styles.container}>
                {/**/}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
