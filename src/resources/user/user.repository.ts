import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from '../../entities';

const getAllUsers = async () => {
  const userRepository = getRepository(User);
  return await userRepository.find({
    select: ['id', 'username', 'role', 'name', 'lastName', 'shop'],
    relations: ['shop'],
  });
};

const getUserById = async (id: number) => {
  const userRepository = getRepository(User);
  return await userRepository.findOneOrFail(id, {
    select: ['id', 'name', 'lastName', 'username', 'role', 'shop'],
    relations: ['shop'],
  });
};

const createNewUser = async (dto: User) => {
  const userRepository = getRepository(User);
  const user = userRepository.create(dto);

  const errors = await validate(user);
  if (errors.length > 0) {
    return errors;
  }

  user.hashPassword();

  return await userRepository.save(user);
};

const updateUser = async (dto: User, id: number) => {
  const userRepository = getRepository(User);
  try {
    return await userRepository.update(id, dto);
  } catch (err) {
    return err;
  }
};

const deleteUser = async (id: number) => {
  const userRepository = getRepository(User);
  return await userRepository.delete(id);
};

export const userRepo = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
};
