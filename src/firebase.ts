import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { getStorage } from 'firebase/storage';
const firebaseConfig: FirebaseOptions = {

  apiKey: "AIzaSyDqz-QWG9NXKUDZDumr29ZB4DTHo_TVPkM",

  authDomain: "escola-biblica-6066f.firebaseapp.com",

  projectId: "escola-biblica-6066f",

  storageBucket: "escola-biblica-6066f.firebasestorage.app",

  messagingSenderId: "259159240595",

  appId: "1:259159240595:web:75ff69576b027d9b0d4266"

};



// A SUA LÓGICA DE CORREÇÃO (Singleton Pattern):

// "evita 'Firebase App named '[DEFAULT]' already exists'"

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);



// Exportar os serviços

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);