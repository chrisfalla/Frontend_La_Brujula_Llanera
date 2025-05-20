export const loginUserUseCase = (repository) => async (credentials) => {
    return await repository.loginUser(credentials);
};
