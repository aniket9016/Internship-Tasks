import { openDB } from 'idb';
import { addEmployee, updateEmployee, deleteEmployee } from '../api';

const DB_NAME = 'employee-manager-db';
const STORE_NAME = 'offline-employees';
const DB_VERSION = 2;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db, oldVersion) {
    if (db.objectStoreNames.contains(STORE_NAME)) {
      db.deleteObjectStore(STORE_NAME);
    }

    const store = db.createObjectStore(STORE_NAME, {
      keyPath: 'localId',
      autoIncrement: true,
    });

    store.createIndex('offlineAction', 'offlineAction', { unique: false });
    store.createIndex('first_name', 'first_name', { unique: false });
    store.createIndex('last_name', 'last_name', { unique: false });
  },
});

export const saveEmployeeOffline = async (employeeData, action = 'add') => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const dataToStore = {
      ...employeeData,
      offlineAction: action,
      timestamp: new Date().toISOString(),
    };

    await store.add(dataToStore);
    await tx.done;

    console.log('Employee saved offline:', dataToStore);
    return true;
  } catch (error) {
    console.error('Error saving employee offline:', error);
    throw error;
  }
};

export const getOfflineEmployees = async () => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    const employees = await store.getAll();
    await tx.done;

    return employees;
  } catch (error) {
    console.error('Error getting offline employees:', error);
    return [];
  }
};

export const deleteOfflineEmployee = async (localId) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    await store.delete(localId);
    await tx.done;

    console.log('Deleted offline employee:', localId);
    return true;
  } catch (error) {
    console.error('Error deleting offline employee:', error);
    throw error;
  }
};

export const clearOfflineEmployees = async () => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    await store.clear();
    await tx.done;

    console.log('Cleared all offline employees');
    return true;
  } catch (error) {
    console.error('Error clearing offline employees:', error);
    throw error;
  }
};

export const updateOfflineEmployee = async (localId, updatedData) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const existing = await store.get(localId);
    if (!existing) throw new Error('Employee not found');

    const updated = {
      ...existing,
      ...updatedData,
      localId,
      timestamp: new Date().toISOString(),
    };

    await store.put(updated);
    await tx.done;

    console.log('Updated offline employee:', updated);
    return updated;
  } catch (error) {
    console.error('Error updating offline employee:', error);
    throw error;
  }
};

export const getOfflineEmployeeById = async (localId) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    const employee = await store.get(localId);
    await tx.done;

    return employee;
  } catch (error) {
    console.error('Error getting offline employee by ID:', error);
    return null;
  }
};

export const isIndexedDBAvailable = () => {
  return 'indexedDB' in window;
};

export const getDatabaseInfo = async () => {
  try {
    const db = await dbPromise;
    const employees = await getOfflineEmployees();

    return {
      name: DB_NAME,
      version: DB_VERSION,
      storeName: STORE_NAME,
      employeeCount: employees.length,
      isAvailable: isIndexedDBAvailable(),
    };
  } catch (error) {
    console.error('Error getting database info:', error);
    return {
      name: DB_NAME,
      version: DB_VERSION,
      storeName: STORE_NAME,
      employeeCount: 0,
      isAvailable: false,
      error: error.message,
    };
  }
};

// ✅ Add syncOfflineEmployees function
export const syncOfflineEmployees = async () => {
  const offlineEmployees = await getOfflineEmployees();

  for (const employee of offlineEmployees) {
    const { offlineAction, localId, id, ...data } = employee;

    try {
      if (offlineAction === 'add') {
        await addEmployee(data);
      } else if (offlineAction === 'edit' && id) {
        await updateEmployee(id, data);
      } else if (offlineAction === 'delete' && id) {
        await deleteEmployee(id);
      }

      // Remove after successful sync
      await deleteOfflineEmployee(localId);
      console.log(`Synced offline employee: localId ${localId}`);
    } catch (error) {
      console.error(`Error syncing employee localId ${localId}:`, error);
    }
  }
};

export const deleteIDB = async () => {
  try {
    const dbName = DB_NAME;
    await indexedDB.deleteDatabase(dbName);
    console.warn(`IndexedDB "${dbName}" deleted`);
  } catch (error) {
    console.error("Error deleting IndexedDB:", error);
  }
};
