import {
  registerUserApi,
  loginUserApi,
  requestPasswordRecoveryCodeApi,
  verifyPasswordRecoveryCodeApi,
  resetPasswordApi, usersApi
} from "../../../infrastructure/api/users/usersApi";

export const usersDataSource = {
  updateUser: async ({ id, name, email, phone }) => {
      const raw = await usersApi.updateUser({
      idUser: id,
      names: name,
      email,
      phone
    });

    if (!raw) {
      throw new Error("La respuesta de la API al actualizar usuario es indefinida");
    }

    // 2) Mapea a tu propio modelo:
    return {
      id:       raw.idUser,
      name:     raw.names,
      email:    raw.email,
      phone:    raw.phone,
      message:  raw.message,    // opcional si quieres mostrar el texto
    };
  },



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

  async resetPassword(email, newPassword) {
    try {
      return await resetPasswordApi(email, newPassword);
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      throw error;
    }
  },
};
