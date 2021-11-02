import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseApp = initializeApp({
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    databaseURL: Constants.manifest.extra.databaseURL,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId
});

export const auth = getAuth(firebaseApp);

export default firebaseApp;