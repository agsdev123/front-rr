// utils/crypto.js
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'your-default-secret-key';

export const encrypt = (value) => {
  return CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
};

export const decrypt = (encryptedValue) => {
  const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};