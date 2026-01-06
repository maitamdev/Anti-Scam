/**
 * Firebase Admin SDK Configuration
 * Handles server-side Firebase operations and token verification
 */

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let adminApp: App;

// Initialize Firebase Admin
if (!getApps().length) {
    // Check if service account credentials are provided
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        try {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
            adminApp = initializeApp({
                credential: cert(serviceAccount)
            });
        } catch (error) {
            console.error('Error parsing Firebase service account:', error);
            // Fallback to project ID only (limited functionality)
            adminApp = initializeApp({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'antiscam-a6586'
            });
        }
    } else {
        // Initialize with project ID only (for development)
        adminApp = initializeApp({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'antiscam-a6586'
        });
    }
} else {
    adminApp = getApps()[0];
}

const adminAuth = getAuth(adminApp);

export { adminAuth, adminApp };
