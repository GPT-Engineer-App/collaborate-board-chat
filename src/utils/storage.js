import localforage from 'localforage';

localforage.config({
  name: 'projectManagementApp',
  storeName: 'keyvaluepairs',
});

export const setItem = async (key, value) => {
  try {
    await localforage.setItem(key, value);
  } catch (err) {
    console.error('Error setting item in localforage', err);
  }
};

export const getItem = async (key) => {
  try {
    return await localforage.getItem(key);
  } catch (err) {
    console.error('Error getting item from localforage', err);
  }
};

export const removeItem = async (key) => {
  try {
    await localforage.removeItem(key);
  } catch (err) {
    console.error('Error removing item from localforage', err);
  }
};