import { requestPasswordRecoveryCodeApi } from '../../../infrastructure/api/users/usersApi';
import { usersDatasource } from '../../datasources/users/usersDataSource';

export const usersRepository = {
  registerUser: async (userData) => await usersDatasource.registerUser(userData),
  loginUser: async (credentials) => await usersDatasource.loginUser(credentials),
  requestPasswordRecoveryCode: async (email) => {
    return await requestPasswordRecoveryCodeApi(email);
  },
  verifyPasswordRecoveryCode: async (email, code) => {
    return await verifyPasswordRecoveryCodeApi(email, code);
  },
  resetPassword: async (email, code, password) => {
    return await resetPasswordApi(email, code, password);
  }
};
