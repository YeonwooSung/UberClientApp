import call from 'react-native-phone-call'


// The aim of this function is to check and connect to the phone call component.
module.exports.callNumber = (phone) => {
    const args = {
        number: phone, // String value with the number to call
        prompt: false  // Optional boolean property. Determines if the user should be prompt prior to the call 
    }

    call(args).catch(console.error)
};
