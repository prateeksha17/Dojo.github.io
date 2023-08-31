import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


    const firebaseConfig = {
        apiKey: "AIzaSyA8xJi_tDSK0aA3r-yAjSIvDSDuWw7cERw",
        authDomain: "thepogo-6d24f.firebaseapp.com",
        projectId: "thepogo-6d24f",
        storageBucket: "thepogo-6d24f.appspot.com",
        messagingSenderId: "972637295516",
        appId: "1:972637295516:web:2eb3dc71051d4220a7ee59"
      };


      //init firebase
      firebase.initializeApp(firebaseConfig)

      //init services
      const projectFirestore = firebase.firestore()
      const projectAuth = firebase.auth()
      const projectStorage = firebase.storage()

      //timestamp
      const timestamp =  firebase.firestore.Timestamp
      export { projectFirestore, projectAuth,projectStorage, timestamp }