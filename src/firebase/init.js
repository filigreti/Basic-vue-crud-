import firebase from 'firebase'
import '@firebase/firestore'
import firestore from 'firebase/firestore'


// Initialize Firebase


var config = {
    apiKey: "AIzaSyAimDrbEiDnI8v0NgnHgw1lV8JG0LIdXDw",
    authDomain: "my-crud-1.firebaseapp.com",
    databaseURL: "https://my-crud-1.firebaseio.com",
    projectId: "my-crud-1",
    storageBucket: "my-crud-1.appspot.com",
    messagingSenderId: "817629824210"
  };
  const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true })

  export default firebaseApp.firestore()