import {initializeApp} from '@react-native-firebase/app';
import { firestore } from '@react-native-firebase/firestore';
import {auth} from '@react-native-firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDzERRja_6junARmWsnz0NWDNeZe32XwRo',
  authDomain: 'gotrip-f217a.firebaseapp.com',
  projectId: 'gotrip-f217a',
  storageBucket: 'gotrip-f217a.appspot.com',
  messagingSenderId: '932989180814',
  appId: '1:932989180814:android:0fd5b91af22333a5d6e2df',
};

const firebaseApp=initializeApp(firebaseConfig);




export  {firebaseApp,firestore,auth};




