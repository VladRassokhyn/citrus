import { User } from '../../entities';
import { userRepo } from './user.repository';

const getAllUsers = async (isAdmin: boolean, tt: string) => {
  const users = await userRepo.getAllUsers();

  if (!isAdmin) {
    return users.filter((user) => user.tt === tt);
  }

  return users;
};

const getUserById = (id: number) => userRepo.getUserById(id);

const createNewUser = (dto: User) => userRepo.createNewUser(dto);

const updateUser = (dto: User, id: number) => userRepo.updateUser(dto, id);

const deleteUser = (id: number) => userRepo.deleteUser(id);

export const userService = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
};
