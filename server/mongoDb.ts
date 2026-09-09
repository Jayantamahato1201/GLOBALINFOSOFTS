import { MongoClient, Db } from 'mongodb';
import { CmsDatabaseSchema } from './cmsTypes.js';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let connectionError: string | null = null;
let isConnecting = false;

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
} {
  return {
    configured: isMongoConfigured(),
    connected: Boolean(cachedDb),
    databaseName: cachedDb?.databaseName || 'globalinfosoft_cms',
    error: connectionError
  };
}

export async function getMongoDb(): Promise<Db | null> {
  const uri = getMongoUri();
  if (!uri) {
    return null;
  }

  if (cachedDb) {
    return cachedDb;
  }

  if (isConnecting) {
    // Wait briefly if connection is already in progress
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (cachedDb) return cachedDb;
  }

  try {
    isConnecting = true;
    connectionError = null;

    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 6000,
      connectTimeoutMS: 10000
    });

    await client.connect();
    cachedClient = client;

    // Use database specified in URI or default to 'globalinfosoft_cms'
    const db = client.db();
    cachedDb = db.databaseName ? db : client.db('globalinfosoft_cms');

    console.log(`[MongoDB] Successfully connected to database: ${cachedDb.databaseName}`);
    return cachedDb;
  } catch (err: any) {
    connectionError = err.message || 'Failed to connect to MongoDB';
    console.error('[MongoDB] Connection error:', connectionError);
    return null;
  } finally {
    isConnecting = false;
  }
}

/**
 * Loads the latest CMS database schema document from MongoDB.
 */
export async function loadDataFromMongo(): Promise<CmsDatabaseSchema | null> {
  try {
    const db = await getMongoDb();
    if (!db) return null;

    const collection = db.collection(COLLECTION_NAME);
    const doc = await collection.findOne({ _id: DOCUMENT_ID as any });

    if (doc && doc.data && (doc.data as CmsDatabaseSchema).users) {
      return doc.data as CmsDatabaseSchema;
    }
    return null;
  } catch (err: any) {
    console.error('[MongoDB] Failed to read from MongoDB:', err);
    return null;
  }
}

/**
 * Saves or updates the entire CMS database schema document in MongoDB.
 */
export async function saveDataToMongo(data: CmsDatabaseSchema): Promise<boolean> {
  try {
    const db = await getMongoDb();
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
    console.error('[MongoDB] Failed to persist data to MongoDB:', err);
    return false;
  }
}
