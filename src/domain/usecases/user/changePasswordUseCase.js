/**
 * Caso de uso para cambiar la contraseña del usuario desde el perfil
 * Reutiliza el endpoint de resetPassword existente
 */
export const changePasswordUseCase = (repository) => (email, newPassword) => {
  if (!email || !newPassword) {
    throw new Error('Email y nueva contraseña son requeridos');
  }
  
  // Usamos el mismo método del repositorio que se usa para recuperación de contraseña
  return repository.resetPassword(email, newPassword);
};
