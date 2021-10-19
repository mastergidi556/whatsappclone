import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBxzF75e6G6ilHM3LIgJx0WoOFgPuKdS7U",
  authDomain: "whatsapp-39dde.firebaseapp.com",
  databaseURL: "https://whatsapp-39dde.firebaseio.com",
  projectId: "whatsapp-39dde",
  storageBucket: "whatsapp-39dde.appspot.com",
  messagingSenderId: "754740365012",
  appId: "1:754740365012:web:648cc41b91779420205d41"
};

export const createUserProileFromFirebaseToMongo = async (userAuth, additionalData) => {
  if (!userAuth) return;

  
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const firestore = firebase.firestore()


const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
