import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
