import {
  registerUserApi,
  loginUserApi,
  requestPasswordRecoveryCodeApi,
  verifyPasswordRecoveryCodeApi,
  resetPasswordApi
} from "../../../infrastructure/api/users/usersApi";

export const usersDatasource = {
  registerUser: async (userData) => {
    const response = await registerUserApi(userData);

    // Retornamos directamente el objeto plano, sin modelos
    return {
      message: response.message,
      token: response.token,
      user: {
        id: response.user.idUser,
        name: response.user.names,
        phone: response.user.phone,
        email: response.user.email,
        birthDate: response.user.birthDay,
        roleId: response.user.idRole,
        genderId: response.user.idGender,
      },
    };
  },

  loginUser: async (credentials) => {
    const response = await loginUserApi(credentials);

    return {
      message: response.message,
      token: response.token,
      user: {
        id: response.user.idUser,
        name: response.user.names,
        phone: response.user.phone,
        email: response.user.email,
        birthDate: response.user.birthDay,
        roleId: response.user.idRole,
        genderId: response.user.idGender,
      },
    };
  },

  async requestPasswordRecoveryCode(email) {
    try {
      // Usar la función de API importada en lugar de httpClient directamente
      return await requestPasswordRecoveryCodeApi(email);
    } catch (error) {
      console.error("Error al solicitar código de recuperación:", error);
      throw error;
    }
  },

  async verifyPasswordRecoveryCode(email, code) {
    try {
      // No hay necesidad de acceder a .data aquí
      return await verifyPasswordRecoveryCodeApi(email, code);
    } catch (error) {
      console.error("Error al verificar código de recuperación:", error);
      throw error;
    }
  },

  async resetPassword(email, code, password) {
    try {
      // No hay necesidad de acceder a .data aquí
      return await resetPasswordApi(email, code, password);
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      throw error;
    }
  },
};
