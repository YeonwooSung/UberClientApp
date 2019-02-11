import * as firebase from 'firebase';

/*
const firebaseConfig = {
  apiKey: "<YOUR-API-KEY>",               // Your API KEY
  authDomain: "<YOUR-AUTH-DOMAIN>",       // Your authentication domain
  databaseURL: "<YOUR-DATABASE-URL>",     // The URL of your DB
  storageBucket: "<YOUR-STORAGE-BUCKET>"  // The storage bucket
};
*/


firebase.initializeApp(firebaseConfig); //initialize the firebase app

/**
 * Store the user information in the firebase database.
 * 
 * @param email the email address of the user
 * @param password the password of the user
 * @param forename the forename of the user
 * @param surname the surname of the user
 */
exports.storeUserInformation = function (email, password, forename, surname) {
  firebase.database().ref('signup/email').set({
    forename: forename,
    surname: surname,
    email: email,
    password: password
  });
}
