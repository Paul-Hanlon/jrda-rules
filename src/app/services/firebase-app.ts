import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';

let app: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (app) return app;
  app = getApps().length ? getApp() : initializeApp(environment.firebase);
  return app;
}
