import firebase from "firebase/app";
import "firebase/firestore";

const app = firebase.initializeApp({
    apiKey: "AIzaSyC-DyrEUKg4o2ywIwpzhw-nMMUDqtVZu_k",
    authDomain: "hardsolo-shop.firebaseapp.com",
    projectId: "hardsolo-shop",
    storageBucket: "hardsolo-shop.appspot.com",
    messagingSenderId: "345969666056",
    appId: "1:345969666056:web:fd795e17a0a3e84566c9bd"
});

export const getFirebase = () => {
    return app;
}

export const getFirestore = () => {
    return firebase.firestore();
}