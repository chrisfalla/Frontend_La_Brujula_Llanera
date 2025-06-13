import {
  registerUserApi,
  loginUserApi,
  requestPasswordRecoveryCodeApi,
  verifyPasswordRecoveryCodeApi,
  resetPasswordApi,
  usersApi
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

    return {
      id: raw.idUser,
      name: raw.names,
      email: raw.email,
      phone: raw.phone,
      message: raw.message,
    };
  },

  registerUser: async (userData) => {
    const response = await registerUserApi(userData);

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
    return await requestPasswordRecoveryCodeApi(email);
  },

  async verifyPasswordRecoveryCode(email, code) {
    return await verifyPasswordRecoveryCodeApi(email, code);
  },

  async resetPassword(email, newPassword) {
    return await resetPasswordApi(email, newPassword);
  },
};