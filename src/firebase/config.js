import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAX0TsIL0NDv25OZ6yZtQ-dCbNvaVPZ86w',
    authDomain: 'delta-book.firebaseapp.com',
    projectId: 'delta-book',
    storageBucket: 'delta-book.appspot.com',
    messagingSenderId: '635931857499',
    appId: '1:635931857499:web:e9929207e2448bf89ca57e',
};

const app = initializeApp(firebaseConfig);

// init service
const db = getFirestore(app);

const timestamp = new Timestamp(db);
const projectAuth = getAuth(app);

export { db, projectAuth, timestamp };
