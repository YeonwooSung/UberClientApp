import { 
    Linking, 
    Alert, 
    Platform 
} from 'react-native';


// The aim of this function is to check and connect to the phone call component.
export const callNumber = (phone) => {
    console.log('callNumber ----> ', phone);

    let phoneNumber = phone;

    if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${phone}`;
    } else {
        phoneNumber = `tel:${phone}`;
    }

    /*
     * Check if it is able to connect with the phone call component.
     * If so, open the phone call component.
     * Otherwise, it will alert the error message.
     */
    Linking.canOpenURL(phoneNumber)
        .then(supported => {
            if (!supported) {
                Alert.alert('Phone number is not available');
            } else {
                return Linking.openURL(phoneNumber);
            }
        })
        .catch(err => console.log(err));
};
