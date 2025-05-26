import { 
  loginUserApi, 
  registerUserApi, 
  requestPasswordRecoveryCodeApi, 
  verifyPasswordRecoveryCodeApi, 
  resetPasswordApi 
} from "../../../infrastructure/api/users/usersApi";
import {usersDataSource}   from '../../datasources/users/usersDataSource';
console.log("🛠️ usersDataSource importado:", usersDataSource);
export const usersRepository = {
  updateUser: async (userPayload) => {
    // aquí ya recibes el objeto mapeado de usersDataSource
    return usersDataSource.updateUser(userPayload);
  },
  registerUser: async (userData) => await usersDataSource.registerUser(userData),
  loginUser: async (credentials) => await usersDataSource.loginUser(credentials),
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
