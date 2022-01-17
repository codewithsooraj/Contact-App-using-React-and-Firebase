import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCVFWzISrEc2SqwzNag7acMwbrdsRNc8uw",
  authDomain: "contact-app-67103.firebaseapp.com",
  projectId: "contact-app-67103",
  storageBucket: "contact-app-67103.appspot.com",
  messagingSenderId: "41796450697",
  appId: "1:41796450697:web:1e16cd7918fa80f57ec958",
};

const appDb = firebase.initializeApp(firebaseConfig);
export default appDb.database().ref();
