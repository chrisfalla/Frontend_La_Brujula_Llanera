export const requestPasswordRecoveryCodeUseCase = (repository) => (email) => {
  return repository.requestPasswordRecoveryCode(email);
};

export const verifyPasswordRecoveryCodeUseCase =
  (repository) => (email, code) => {
    return repository.verifyPasswordRecoveryCode(email, code);
  };

export const resetPasswordUseCase = (repository) => (email, code, password) => {
  return repository.resetPassword(email, code, password);
};
