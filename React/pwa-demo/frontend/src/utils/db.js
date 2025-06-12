import { openDB } from 'idb';

const DB_NAME = 'pwa-file-db';
const STORE_NAME = 'pending-files';

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'name' });
      }
    },
  });
}

export async function addFileToIndexedDB(file) {
  const db = await getDB();
  const buffer = await file.arrayBuffer();
  await db.put(STORE_NAME, {
    name: file.name,
    type: file.type,
    data: buffer,
  });
}

export async function getAllPendingFiles() {
  const db = await getDB();
  return await db.getAll(STORE_NAME);
}

export async function deleteFileFromIndexedDB(name) {
  const db = await getDB();
  await db.delete(STORE_NAME, name);
}
