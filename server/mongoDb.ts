import { MongoClient, Db } from 'mongodb';
import { CmsDatabaseSchema } from './cmsTypes.js';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let connectionError: string | null = null;
let connectionSuggestion: string | null = null;
let isConnecting = false;
let lastConnectionAttempt = 0;
const CONNECTION_COOLDOWN_MS = 60000; // 60s cooldown after failed attempt to avoid blocking requests

const COLLECTION_NAME = 'cms_store';
const DOCUMENT_ID = 'global_infosoft_cms_data';

export function getMongoUri(): string | null {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL;
  if (uri && (uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://'))) {
    return uri.trim();
  }
  return null;
}

export function isMongoConfigured(): boolean {
  return Boolean(getMongoUri());
}

export function getMongoStatus(): {
  configured: boolean;
  connected: boolean;
  databaseName: string;
  error: string | null;
  suggestion: string | null;
  lastCheckedAt?: string;
} {
  return {
    configured: isMongoConfigured(),
    connected: Boolean(cachedDb),
    databaseName: cachedDb?.databaseName || 'globalinfosoft_cms',
    error: connectionError,
    suggestion: connectionSuggestion,
    lastCheckedAt: lastConnectionAttempt ? new Date(lastConnectionAttempt).toISOString() : undefined
  };
}

export async function getMongoDb(forceRetry: boolean = false): Promise<Db | null> {
  const uri = getMongoUri();
  if (!uri) {
    return null;
  }

  if (cachedDb) {
    return cachedDb;
  }

  // Prevent repeated blocking calls if a recent connection failed, unless forced by admin action
  if (!forceRetry && connectionError && Date.now() - lastConnectionAttempt < CONNECTION_COOLDOWN_MS) {
    return null;
  }

  if (isConnecting) {
    // Wait briefly if connection is already in progress
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (cachedDb) return cachedDb;
  }

  try {
    isConnecting = true;
    lastConnectionAttempt = Date.now();

    const isSrv = uri.startsWith('mongodb+srv://');
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 6000,
      // Resilient TLS options for containerized Node.js runtime
      tls: isSrv ? true : undefined,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true
    });

    await client.connect();
    cachedClient = client;

    // Use database specified in URI or default to 'globalinfosoft_cms'
    const db = client.db();
    cachedDb = db.databaseName ? db : client.db('globalinfosoft_cms');
    connectionError = null;
    connectionSuggestion = null;

    console.log(`[MongoDB] Successfully connected to database: ${cachedDb.databaseName}`);
    return cachedDb;
  } catch (err: any) {
    const rawMsg = err?.message || String(err);
    
    // Provide precise, actionable diagnostics for the user
    if (rawMsg.includes('alert number 80') || rawMsg.includes('tlsv1 alert internal error')) {
      connectionError = 'MongoDB Atlas rejected SSL connection (SSL alert 80 / IP blocked).';
      connectionSuggestion = 'In MongoDB Atlas ➔ Security ➔ Network Access, add IP Address "0.0.0.0/0" (Allow Access from Anywhere) so cloud instances can connect.';
    } else if (rawMsg.includes('bad auth') || rawMsg.includes('Authentication failed')) {
      connectionError = 'MongoDB authentication failed. Invalid database user credentials.';
      connectionSuggestion = 'Verify your username and password in MONGODB_URI. If the password has special characters like @, encode them with URL encoding (e.g. %40).';
    } else if (rawMsg.includes('timed out') || rawMsg.includes('ETIMEDOUT') || rawMsg.includes('ENOTFOUND')) {
      connectionError = 'MongoDB connection timed out.';
      connectionSuggestion = 'Check that your MongoDB cluster is running and your cluster hostname is reachable.';
    } else {
      connectionError = rawMsg;
      connectionSuggestion = 'Check your MONGODB_URI connection string settings.';
    }

    console.warn(`[MongoDB] Cloud sync paused: ${connectionError} Defaulting to local persistent storage.`);
    return null;
  } finally {
    isConnecting = false;
  }
}

/**
 * Loads the latest CMS database schema document from MongoDB.
 */
export async function loadDataFromMongo(forceRetry: boolean = false): Promise<CmsDatabaseSchema | null> {
  try {
    const db = await getMongoDb(forceRetry);
    if (!db) return null;

    const collection = db.collection(COLLECTION_NAME);
    const doc = await collection.findOne({ _id: DOCUMENT_ID as any });

    if (doc && doc.data && (doc.data as CmsDatabaseSchema).users) {
      return doc.data as CmsDatabaseSchema;
    }
    return null;
  } catch (err: any) {
    console.warn('[MongoDB] Notice: Could not read cloud document, using local data:', err?.message || err);
    return null;
  }
}

/**
 * Saves or updates the entire CMS database schema document in MongoDB.
 */
export async function saveDataToMongo(data: CmsDatabaseSchema, forceRetry: boolean = false): Promise<boolean> {
  try {
    const db = await getMongoDb(forceRetry);
    if (!db) return false;

    const collection = db.collection(COLLECTION_NAME);
    await collection.updateOne(
      { _id: DOCUMENT_ID as any },
      {
        $set: {
          _id: DOCUMENT_ID as any,
          data,
          updatedAt: new Date().toISOString()
        }
      },
      { upsert: true }
    );
    return true;
  } catch (err: any) {
    console.warn('[MongoDB] Notice: Could not persist to cloud document:', err?.message || err);
    return false;
  }
}
