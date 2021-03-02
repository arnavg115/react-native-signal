import * as firebase from 'firebase';
import "firebase/auth"
import "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyB_chUsJnPM7wxXj0XVUWzDXrc9JlgnWfE",
    authDomain: "signalclone-388a7.firebaseapp.com",
    projectId: "signalclone-388a7",
    storageBucket: "signalclone-388a7.appspot.com",
    messagingSenderId: "362822733334",
    appId: "1:362822733334:web:ea36d9c73910b6ce93af37"
  };

let app;
if(firebase.apps.length === 0){
  app=firebase.initializeApp(firebaseConfig);

}else{
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db,auth};