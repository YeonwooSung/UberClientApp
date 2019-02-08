import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "<YOUR-API-KEY>",               // Your API KEY
  authDomain: "<YOUR-AUTH-DOMAIN>",       // Your authentication domain
  databaseURL: "<YOUR-DATABASE-URL>",     // The URL of your DB
  storageBucket: "<YOUR-STORAGE-BUCKET>"  // The storage bucket
};

firebase.initializeApp(firebaseConfig); //initialize the firebase app
