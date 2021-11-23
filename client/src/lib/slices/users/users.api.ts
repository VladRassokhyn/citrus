import { FixLater, User } from '../../globalTypes';
import { axiosInstance } from '../../axiosInstance';

export const usersApi = {
  async getUsers(tt: string): Promise<{ data: User[] }> {
    return await axiosInstance.get(`/users?tt=${tt}`);
  },
  async postNewUser(dto: User): Promise<{ data: User }> {
    return await axiosInstance.post('/users', dto);
  },
  async deleteUser(userId: string): Promise<{ data: FixLater }> {
    return await axiosInstance.delete(`/users/${userId}`);
  },
  async updateUser({ id, dto }: { id: number; dto: User }): Promise<{ data: User }> {
    return await axiosInstance.put(`/users/${id}`, dto);
  },
  async getUserById(id: number | string): Promise<string> {
    return await axiosInstance.get(`/users/${id}`);
  },
  async getUserChecklists(userId: number): Promise<string> {
    return await axiosInstance.get(`/checklist?passerId=${userId}&passedOnly=true`);
  },
};
