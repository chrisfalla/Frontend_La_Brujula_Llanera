import { registerUserApi } from '../../../infraestructure/api/users/usersApi';

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
};
