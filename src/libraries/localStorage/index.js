// utils/localStorage.js
import { encrypt, decrypt } from '../crypto/crypto';

export const getItem = (key) => {
  if (typeof window !== 'undefined') {
    const encryptedValue = window.localStorage.getItem(key);
    return encryptedValue ? decrypt(encryptedValue) : null;
  }
  return null;
};

export const setItem = (key, value) => {
  if (typeof window !== 'undefined') {
    const encryptedValue = encrypt(value);
    window.localStorage.setItem(key, encryptedValue);
  }
};

export const removeItem = (key) => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(key);
  }
};

export const clearStorage = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.clear();
  }
};