import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAky1Go1Y38udtusVm7BcC5SN3SiJznwkw",
  authDomain: "typing-ground.firebaseapp.com",
  projectId: "typing-ground",
  storageBucket: "typing-ground.appspot.com",
  messagingSenderId: "203976817287",
  appId: "1:203976817287:web:6165669e7e3c3ab9e89622",
  measurementId: "G-LBQLECSC5Q"
};
// we use here firebase to auth the function of login and signup we have to fill  the firebase make fire store console.
// auth is refer to Authention Response. 
  
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth=firebase.auth();
  const db = firebase.firestore();
  export  {auth,db}
 