import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import ReduxSagaFirebase from 'redux-saga-firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCC3xqkNAkfSJzUPzGKzgsaTOv2Bbi9k18",
    authDomain: "react-firebase-app-b6c29.firebaseapp.com",
    databaseURL: "https://react-firebase-app-b6c29.firebaseio.com",
    projectId: "react-firebase-app-b6c29",
    storageBucket: "react-firebase-app-b6c29.appspot.com",
    messagingSenderId: "258309562831",
    appId: "1:258309562831:web:2dbe9fea0e83ef0e39f2ba",
    measurementId: "G-2TYBR534FG"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const reduxSagaFirebase = new ReduxSagaFirebase(firebaseApp)

export default reduxSagaFirebase;