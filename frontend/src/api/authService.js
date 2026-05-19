import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  getIdToken,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { attachAuthHeader } from './axiosInstance';

async function setAuthPersistence() {
  await setPersistence(auth, browserLocalPersistence);
}

export function subscribeAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function signInWithGoogle() {
  await setAuthPersistence();

  const credentials = await signInWithPopup(auth, googleProvider);
  return credentials.user;
}

export async function signUpWithEmail({ email, password }) {
  await setAuthPersistence();
  const credentials = await createUserWithEmailAndPassword(auth, email, password);
  return credentials.user;
}

export async function signInWithEmail({ email, password }) {
  await setAuthPersistence();
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return credentials.user;
}

export async function logoutUser() {
  await firebaseSignOut(auth);
  try {
    attachAuthHeader(null);
  } catch (e) {
    localStorage.removeItem('intern_kovai_auth_token');
  }
}

export async function fetchIdToken(forceRefresh = false) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return null;
  }

  return getIdToken(currentUser, forceRefresh);
}
