import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const firebaseConfig = {
  apiKey: "AIzaSyAkQhidqyOss2y9sghaAfVHXsugpmRXHQY",
  authDomain: "week7-naif.firebaseapp.com",
  projectId: "week7-naif",
  storageBucket: "week7-naif.firebasestorage.app",
  messagingSenderId: "17722039016",
  appId: "1:17722039016:web:f1bd7cf064c63ed757c75d"
};
initializeApp(firebaseConfig);


const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.mount('#app')
