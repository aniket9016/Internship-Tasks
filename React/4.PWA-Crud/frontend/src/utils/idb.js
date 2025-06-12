import { openDB } from 'idb';

const DB_NAME = 'employee-manager-db';
const STORE_NAME = 'offline-employees';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, { keyPath: 'localId', autoIncrement: true });
    }
  },
});

export const saveEmployeeOffline = async (employeeData, action = 'add') => {
  const db = await dbPromise;
  await db.add(STORE_NAME, { ...employeeData, offlineAction: action });
};

export const getOfflineEmployees = async () => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

export const deleteOfflineEmployee = async (localId) => {
  const db = await dbPromise;
  await db.delete(STORE_NAME, localId);
};

export const clearOfflineEmployees = async () => {
  const db = await dbPromise;
  await db.clear(STORE_NAME);
};
