import { Injectable, computed, signal } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { AuthDetails } from '../models/user-profile';
import { getFirebaseApp } from './firebase-app';

function toAuthDetails(user: User, provider?: 'google' | 'password'): AuthDetails {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    provider,
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth: Auth;
  private readonly _user = signal<AuthDetails | null>(null);

  readonly user = this._user.asReadonly();
  readonly isSignedIn = computed(() => this._user() !== null);

  constructor() {
    this.auth = getAuth(getFirebaseApp());
    onAuthStateChanged(this.auth, (user) => {
      this._user.set(user ? toAuthDetails(user) : null);
    });
  }

  async signInWithGoogle(): Promise<AuthDetails> {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(this.auth, provider);
    const details = toAuthDetails(cred.user, 'google');
    this._user.set(details);
    return details;
  }

  async signUpWithEmail(email: string, password: string): Promise<AuthDetails> {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    const details = toAuthDetails(cred.user, 'password');
    this._user.set(details);
    return details;
  }

  async signInWithEmail(email: string, password: string): Promise<AuthDetails> {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    const details = toAuthDetails(cred.user, 'password');
    this._user.set(details);
    return details;
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
    this._user.set(null);
  }
}
