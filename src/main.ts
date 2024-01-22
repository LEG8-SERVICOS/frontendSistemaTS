/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import './styles/index.css'
//firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_DXBcxQTJecN1ILVgJegbVe1bZ6ZExys",
  authDomain: "leg8-backend-firebase.firebaseapp.com",
  projectId: "leg8-backend-firebase",
  storageBucket: "leg8-backend-firebase.appspot.com",
  messagingSenderId: "702739405375",
  appId: "1:702739405375:web:42c6f54c6f41bdbf07f68a",
  measurementId: "G-8PQLQFZVTH"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);


//VueJS

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
