import { FixLater, User } from '../globalTypes';
import { axiosInstance } from './axiosInstance';

export const usersApi = {
  async getUsers(): Promise<{ data: User[] }> {
    return await axiosInstance.get('/users');
  },
  async postNewUser(dto: User): Promise<{ data: User }> {
    return await axiosInstance.post('/users', dto);
  },
  async deleteUser(userId: string): Promise<{ data: FixLater }> {
    return await axiosInstance.delete(`/users/${userId}`);
  },
  async updateUser(payload: { dto: User }): Promise<{ data: User }> {
    return await axiosInstance.put('/users', payload);
  },
  async getUserById(id: number | string) {
    return await axiosInstance.get(`/users/${id}`);
  },
};
