import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import 'firebase/auth';

// const app = initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });

const app = initializeApp({
  apiKey: 'AIzaSyCOGd1rVASV2CSC9BpMVxD7n1DaqxymSL4',
  authDomain: 'ttoneapp.firebaseapp.com',
  databaseURL: 'https://ttoneapp.firebaseio.com',
  projectId: 'ttoneapp',
  storageBucket: 'gs://ttoneapp.appspot.com',
  messagingSenderId: '44365320271',
  appId: '1:44365320271:web:b3d1d0bcef81334ce79a3a',
});

// export const auth = app.auth();

const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };

export default app;
