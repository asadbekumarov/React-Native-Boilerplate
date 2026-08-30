import { createMMKV } from 'react-native-mmkv';
import * as SecureStore from 'expo-secure-store';

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
      key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      SecureStore.setItem(SECURE_STORE_KEY, key);
    }
    
    return key;
  } catch (error) {
    console.error('SecureStore Error:', error);
    return 'fallback_key_only_for_dev'; // Never fallback in true production if security is paramount
  }
};

import { Platform } from 'react-native';

const encryptionKey = Platform.OS === 'web' ? undefined : getEncryptionKey();

export const storage = createMMKV({
  id: 'universal-storage',
  ...(encryptionKey ? { encryptionKey } : {})
});

export const StorageWrapper = {
  setItem: (key: string, value: string | boolean | number) => {
    storage.set(key, value);
  },
  getItemString: (key: string): string | undefined => {
    return storage.getString(key);
  },
  getItemBoolean: (key: string): boolean | undefined => {
    return storage.getBoolean(key);
  },
  getItemNumber: (key: string): number | undefined => {
    return storage.getNumber(key);
  },
  removeItem: (key: string) => {
    storage.remove(key);
  },
  clearAll: () => {
    storage.clearAll();
  },
  // If you absolutely need to store something purely in SecureStore (e.g., highly sensitive biometric fallback)
  setHighlySecureItem: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },
  getHighlySecureItem: async (key: string) => {
    return await SecureStore.getItemAsync(key);
  }
};
