/**
 * This file is used to initialize the Firebase Admin SDK.
 *
 * It is used to interact with Firebase services from the server side.
 *
 * @module firebaseAdmin
 *
 * @packageDocumentation
 */

import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

/**
 * The Firestore instance.
 *
 * This is used to interact with the Firestore database.
 *
 * @example
 * ```typescript
 * import { db } from "@/firebaseAdmin";
 *
 * const docRef = db.collection("users").doc("alex");
 * ```
 */
export const db = admin.firestore();

/**
 * The Firebase Admin SDK instance.
 *
 * This is used to interact with Firebase services from the server side.
 * 
 * @example
 * ```typescript
 * import { admin } from "@/firebaseAdmin";
 * ```
 */
export const adminAuth = getAuth();

export { admin };
