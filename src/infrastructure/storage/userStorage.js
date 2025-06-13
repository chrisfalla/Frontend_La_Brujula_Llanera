import * as SecureStore from 'expo-secure-store';

const USER_KEY = 'loggedUser';

export const userStorage = {
  save: async (user) => {
    try {
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
      return true;
    } catch (e) {
      return false;
    }
  },

  get: async () => {
    try {
      const result = await SecureStore.getItemAsync(USER_KEY);
      return result ? JSON.parse(result) : null;
    } catch (e) {
      return null;
    }
  },

  remove: async () => {
    try {
      await SecureStore.deleteItemAsync(USER_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }
};

export default userStorage;
