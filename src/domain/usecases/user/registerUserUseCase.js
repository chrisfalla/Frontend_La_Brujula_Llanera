export const registerUserUseCase = (repository) => async (userData) => {
    return await repository.registerUser(userData);
  };
  