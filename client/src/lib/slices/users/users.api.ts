import { axiosInstance } from '../../axiosInstance';
import { Checklist } from '../checklist';
import { User } from './users.types';

export const usersApi = {
  async getUsers(shopId: number): Promise<{ data: User[] }> {
    return await axiosInstance.get(`/users?tt=${shopId}`);
  },
  async postNewUser(dto: User): Promise<{ data: User }> {
    return await axiosInstance.post('/users', dto);
  },
  async deleteUser(userId: number): Promise<{ data: string }> {
    return await axiosInstance.delete(`/users/${userId}`);
  },
  async updateUser(payload: User): Promise<{ data: User }> {
    return await axiosInstance.put(`/users/${payload.id}`, payload);
  },
  async getUserById(id: number): Promise<{ data: User }> {
    return await axiosInstance.get(`/users/${id}`);
  },
  async getUserChecklists(userId: number): Promise<{ data: Checklist[] }> {
    return await axiosInstance.get(`/checklist?passerId=${userId}&passedOnly=true`);
  },
};
