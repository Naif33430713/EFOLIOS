import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAkQhidqyOss2y9sghaAfVHXsugpmRXHQY',
  authDomain: 'week7-naif.firebaseapp.com',
  projectId: 'week7-naif',
  storageBucket: 'week7-naif.appspot.com', 
  messagingSenderId: '17722039016',
  appId: '1:17722039016:web:f1bd7cf064c63ed757c75d'
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db