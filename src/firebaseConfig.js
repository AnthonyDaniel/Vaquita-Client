import * as firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyApTDeOV_uQt6ZuxtEEwEzFfbbQoNV4XpQ",
        authDomain: "vaquita-b2139.firebaseapp.com",
        databaseURL: "https://vaquita-b2139.firebaseio.com",
        projectId: "vaquita-b2139",
        storageBucket: "vaquita-b2139.appspot.com",
        messagingSenderId: "537479124228",
        appId: "1:537479124228:web:8437894805393b4d18ac51",
        measurementId: "G-MBM4NXC0HL"
    }
);

export default app;