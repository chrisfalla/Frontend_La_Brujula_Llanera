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
    update: (state, action) => {
      if (state.user) {
        const { name, names, ...rest } = action.payload;
        // Siempre actualiza ambos campos para evitar inconsistencias
        state.user = {
          ...state.user,
          ...rest,
          name: name || names || state.user.name || state.user.names || "Usuario",
          names: names || name || state.user.names || state.user.name || "Usuario"
        };
      }
    }
  }
});

export const { login, loginAsGuest, logout, update } = authSlice.actions;
export default authSlice.reducer;
