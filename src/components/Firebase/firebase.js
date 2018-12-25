import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ALL_PRODUCTS, CART, WISHLIST, LISTS } from '../../constants/firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.db = app.firestore();
    this.auth = app.auth();
    const settings = { timestampsInSnapshots: true };
    this.db.settings(settings);
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

const firebase = new Firebase();
const db = firebase.db;

export const allProductsRef = db.collection(ALL_PRODUCTS);
export const cartRef = db.collection(CART);
export const wishlistRef = db.collection(WISHLIST);
export const listsRef = db.collection(LISTS);

export default firebase;
