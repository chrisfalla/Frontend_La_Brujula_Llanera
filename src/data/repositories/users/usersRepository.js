import { 
  loginUserApi, 
  registerUserApi, 
  requestPasswordRecoveryCodeApi, 
  verifyPasswordRecoveryCodeApi, 
  resetPasswordApi 
} from "../../../infrastructure/api/users/usersApi";
import { usersDatasource } from '../../datasources/users/usersDataSource';

export const usersRepository = {
  registerUser: async (userData) => await usersDatasource.registerUser(userData),
  loginUser: async (credentials) => await usersDatasource.loginUser(credentials),
  requestPasswordRecoveryCode: async (email) => {
    try {
      const response = await requestPasswordRecoveryCodeApi(email);
      return response;
    } catch (error) {
      throw error;
    }
  },
  verifyPasswordRecoveryCode: async (email, code) => {
    try {
      const response = await verifyPasswordRecoveryCodeApi(email, code);
      return response;
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async (email, newPassword) => {
    try {
      const response = await resetPasswordApi(email, newPassword);
      return response;
    } catch (error) {
      throw error;
    }
  }
};
