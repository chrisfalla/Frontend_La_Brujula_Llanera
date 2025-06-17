import {
  loginUserApi,
  registerUserApi,
  requestPasswordRecoveryCodeApi,
  verifyPasswordRecoveryCodeApi,
  resetPasswordApi
} from "../../../infrastructure/api/users/usersApi";
import { usersDataSource } from '../../datasources/users/usersDataSource';

export const usersRepository = {
  updateUser: async (userPayload) => {
    return usersDataSource.updateUser(userPayload);
  },
  registerUser: async (userData) => await usersDataSource.registerUser(userData),
  loginUser: async (credentials) => await usersDataSource.loginUser(credentials),
  requestPasswordRecoveryCode: async (email) => {
    const response = await requestPasswordRecoveryCodeApi(email);
    return response;
  },
  verifyPasswordRecoveryCode: async (email, code) => {
    const response = await verifyPasswordRecoveryCodeApi(email, code);
    return response;
  },
  resetPassword: async (email, newPassword) => {
    const response = await resetPasswordApi(email, newPassword);
    return response;
  }
};