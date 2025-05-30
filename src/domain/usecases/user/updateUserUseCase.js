// src/domain/usecases/user/updateUserUseCase.js
import { usersRepository } from "../../../data/repositories/users/usersRepository";

export const updateUserUseCase = async ({ id, name, email, phone }) => {
  // validaciones…
  const updatedUser = await usersRepository.updateUser({ id, name, email, phone });
  return updatedUser;
};
