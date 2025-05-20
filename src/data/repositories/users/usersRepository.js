import { usersDatasource } from '../../datasources/users/usersDataSource';

export const usersRepository = {
  registerUser: async (userData) => await usersDatasource.registerUser(userData),
  loginUser: async (credentials) => await usersDatasource.loginUser(credentials),
};
