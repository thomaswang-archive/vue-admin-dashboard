import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBZcqLLNNKG-Gpcdr-2he4QAX8q1yvgEww",
    authDomain: "vue-hq.firebaseapp.com",
    databaseURL: "https://vue-hq.firebaseio.com",
    projectId: "vue-hq",
    storageBucket: "vue-hq.appspot.com",
    messagingSenderId: "857669172723"
});

export const db = firebaseApp.firestore();