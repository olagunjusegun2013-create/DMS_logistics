import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  ShipmentOrder,
  Courier,
  CustomerAccount,
  DeliveryException,
  PaymentRecord,
  NotificationItem,
  AuditLog,
  UserProfile,
  UserRole,
} from '../types/logistics';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// CRITICAL: The app will break without this line
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Standard Firestore Error Handling conforming to Firebase Integration Skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// CRITICAL CONSTRAINT: Validate Connection to Firestore on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore connection verified successfully.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase: client is currently offline. Local cache active.');
    }
  }
}

// Run connection check
testConnection();

// Firebase Authentication Helpers
export const firebaseAuthService = {
  onAuthChange: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },

  signInWithGoogle: async (): Promise<User> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  },

  signInWithEmail: async (email: string, pass: string): Promise<User> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      return result.user;
    } catch (error) {
      console.error('Email Sign-In Error:', error);
      throw error;
    }
  },

  signUpWithEmail: async (
    email: string,
    pass: string,
    displayName: string,
    role: UserRole
  ): Promise<UserProfile> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }

      const userProfile: UserProfile = {
        id: result.user.uid,
        name: displayName || email.split('@')[0],
        email: result.user.email || email,
        role,
        roleTitle:
          role === 'Super Administrator'
            ? 'Super Administrator'
            : role === 'Administrator'
            ? 'Operations Administrator'
            : role === 'Dispatcher'
            ? 'Lead Dispatch Controller'
            : role === 'Driver'
            ? 'Fleet Courier Specialist'
            : 'Corporate Enterprise Consignor',
        phone: '+234 800 000 0000',
        hub: 'Lagos Ops Hub',
      };

      // Persist profile to Firestore users collection
      try {
        await setDoc(doc(db, 'users', result.user.uid), userProfile);
      } catch (err) {
        console.warn('Could not sync user profile to Firestore immediately:', err);
      }

      return userProfile;
    } catch (error) {
      console.error('Sign-Up Error:', error);
      throw error;
    }
  },

  resetPassword: async (email: string) => {
    return sendPasswordResetEmail(auth, email);
  },

  signOut: async () => {
    return signOut(auth);
  },
};

// Real-Time Firestore Sync Helpers
export const firestoreSyncService = {
  subscribeOrders: (
    onOrdersChange: (orders: ShipmentOrder[]) => void,
    fallbackOrders: ShipmentOrder[]
  ) => {
    const path = 'orders';
    try {
      return onSnapshot(
        collection(db, path),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: ShipmentOrder[] = [];
            snapshot.forEach((d) => list.push(d.data() as ShipmentOrder));
            onOrdersChange(list);
          } else {
            onOrdersChange(fallbackOrders);
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, path);
        }
      );
    } catch (err) {
      console.warn('Firestore subscription using offline fallback:', err);
      onOrdersChange(fallbackOrders);
      return () => {};
    }
  },

  saveOrderToCloud: async (order: ShipmentOrder) => {
    const path = `orders/${order.trackingNo.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
    try {
      await setDoc(doc(db, 'orders', order.trackingNo.replace(/[^a-zA-Z0-9_-]/g, '_')), order);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  deleteOrderFromCloud: async (trackingNo: string) => {
    const path = `orders/${trackingNo.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
    try {
      await deleteDoc(doc(db, 'orders', trackingNo.replace(/[^a-zA-Z0-9_-]/g, '_')));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  saveAuditLogToCloud: async (log: AuditLog) => {
    const path = `auditLogs/${log.id}`;
    try {
      await setDoc(doc(db, 'auditLogs', log.id), log);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },
};
