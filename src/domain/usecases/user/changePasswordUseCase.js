export const changePasswordUseCase = (repository) => (email, newPassword) => {
  if (!email || !newPassword) {
    throw new Error('Email y nueva contraseña son requeridos');
  }
  return repository.resetPassword(email, newPassword);
};
