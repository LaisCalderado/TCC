import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDPlHhrai-OYE3YnKdd67CyZb_ula49uKM",
    authDomain: "arcade-question.firebaseapp.com",
    projectId: "arcade-question",
    storageBucket: "arcade-question.appspot.com",
    messagingSenderId: "1058942551687",
    appId: "1:1058942551687:web:6d6ee5bf071f717c111a22",
    measurementId: "G-0BR9V2EZVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);