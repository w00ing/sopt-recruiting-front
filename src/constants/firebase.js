import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA7WGfzu_svTZe7Li4s8SxN6eNoZUKTjN4',
  authDomain: 'sopt-recruiting.firebaseapp.com',
  projectId: 'sopt-recruiting',
  storageBucket: 'sopt-recruiting.appspot.com',
  messagingSenderId: '1045164286537',
  appId: '1:1045164286537:web:98de2cf6024c8d4dee5598',
  measurementId: 'G-DXXF6KLKB0',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const { STATE_CHANGED } = firebase.storage.TaskEvent;
