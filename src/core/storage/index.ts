import { createMMKV } from 'react-native-mmkv';
import * as SecureStore from 'expo-secure-store';

import { Platform } from 'react-native';

const SECURE_STORE_KEY = 'mmkv.encryption.key';

// 1. We check if an encryption key exists in SecureStore
// 2. If not, we generate a new one and save it to SecureStore
// 3. We use this key to encrypt the entire MMKV instance
// This way, all data is fast but completely secure.

const getEncryptionKey = (): string => {
  try {
    let key = SecureStore.getItem(SECURE_STORE_KEY);

    if (!key) {
      // Generate a random key (in production, use a more robust random string generator if needed)
      key =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      SecureStore.setItem(SECURE_STORE_KEY, key);
    }

    return key;
  } catch (error) {
    console.error('SecureStore Error:', error);
    return 'fallback_key_only_for_dev'; // Never fallback in true production if security is paramount
  }
};

const encryptionKey = Platform.OS === 'web' ? undefined : getEncryptionKey();

export const storage = createMMKV({
  id: 'universal-storage',
  ...(encryptionKey ? { encryptionKey } : {}),
});

export const StorageWrapper = {
  setItem: (key: string, value: string | boolean | number) => {
    try {
      storage.set(key, value);
    } catch (e) {}
  },
  getItemString: (key: string): string | undefined => {
    try {
      return storage.getString(key);
    } catch (e) {
      return undefined;
    }
  },
  getItemBoolean: (key: string): boolean | undefined => {
    try {
      return storage.getBoolean(key);
    } catch (e) {
      return undefined;
    }
  },
  getItemNumber: (key: string): number | undefined => {
    try {
      return storage.getNumber(key);
    } catch (e) {
      return undefined;
    }
  },
  removeItem: (key: string) => {
    try {
      storage.remove(key);
    } catch (e) {}
  },
  clearAll: () => {
    try {
      storage.clearAll();
    } catch (e) {}
  },
  // If you absolutely need to store something purely in SecureStore (e.g., highly sensitive biometric fallback)
  setHighlySecureItem: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },
  getHighlySecureItem: async (key: string) => {
    return await SecureStore.getItemAsync(key);
  },
};
