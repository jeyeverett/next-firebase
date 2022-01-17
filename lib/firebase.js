// Import the functions you need from the SDKs you need - note that this code will be bundled for the client
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrQCr0MtnIxuAPGqMeNVxH7Q8Z22eKan0",
  authDomain: "next-firebase-5e76e.firebaseapp.com",
  projectId: "next-firebase-5e76e",
  storageBucket: "next-firebase-5e76e.appspot.com",
  messagingSenderId: "434861951408",
  appId: "1:434861951408:web:7c37c813e3a38ad1586e75",
  measurementId: "G-W6MJBN21CP",
};

// Initialize Firebase - this checks prevents multiple firebase instances from initializing
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED; //this gives us real time updates on the status of a file upload

// Helpers
// Get a users document with username instead of uid
// username: String!

export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

// we need to convert firestore documents to JSON
// and firestore timestamp data needs to be converted to a number or string
// in order to pass them through as JSON on a server rendered next page

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

export const { fromMillis } = firebase.firestore.Timestamp;
export const { serverTimestamp } = firebase.firestore.FieldValue;
export const { increment } = firebase.firestore.FieldValue;
