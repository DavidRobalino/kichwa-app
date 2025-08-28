import AsyncStorage from '@react-native-async-storage/async-storage';

interface SaveStorage {
  key: string;
  value: any;
}

interface GetStorage {
  key: string;
  defaultValue?: any;
  parseToJson?: boolean;
}

// clase wrapper
// esta clase será la responsable de gestionar la lógica de
// las diferentes operaciones del local-storage
export class Storage {
  static instance = new Storage();

  async store({ key, value }: SaveStorage) {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.log('Storage store error', error);
      return false;
    }
  }

  async get<T>({
    key,
    defaultValue = null,
    parseToJson = false,
  }: GetStorage): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) return defaultValue;
      if (parseToJson) return JSON.parse(value);
      return value as T;
    } catch (error: any) {
      console.log('Storage get error', error);
      throw Error(error.message);
    }
  }

  async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log('Storage remove error', error);
      return false;
    }
  }

  async multiGet(keys: string[]) {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error: any) {
      console.log('Storage multiGet error', error);
      throw Error(error.message);
    }
  }

  async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error: any) {
      console.log('Storage getAllKeys error', error);
      throw Error(error.message);
    }
  }

  async multiRemove(keys: string[]) {
    try {
      return await AsyncStorage.multiRemove(keys);
    } catch (error: any) {
      console.log('Storage multiRemove error', error);
      throw Error(error.message);
    }
  }
}
