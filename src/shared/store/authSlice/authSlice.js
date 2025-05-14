import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,   // Usuario autenticado real
  isGuest: false,      // Usuario invitado
  user: null,          // Datos del usuario logueado (nombre, avatar, etc.)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.isGuest = false;
      state.user = action.payload; // Aquí irían los datos del usuario
    },
    loginAsGuest: (state) => {
      state.isLoggedIn = false;
      state.isGuest = true;
      state.user = {
        name: 'Invitado',
        avatar: 'default-avatar.png', // o null
      };
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isGuest = false;
      state.user = null;
    },
    updateUserInfo: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    }
  }
});

export const { login, loginAsGuest, logout, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
