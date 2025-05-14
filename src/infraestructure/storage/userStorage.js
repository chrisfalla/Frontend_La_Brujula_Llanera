import * as SecureStore from 'expo-secure-store';

const USER_KEY = 'loggedUser';

export const userStorage = {
  save: async (user) => {
    try {
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('❌ Error guardando usuario', e);
    }
  },

  get: async () => {
    try {
      const result = await SecureStore.getItemAsync(USER_KEY);
      return result ? JSON.parse(result) : null;
    } catch (e) {
      console.error('❌ Error obteniendo usuario', e);
      return null;
    }
  },

  remove: async () => {
    try {
      await SecureStore.deleteItemAsync(USER_KEY);
    } catch (e) {
      console.error('❌ Error eliminando usuario', e);
    }
  }
};
