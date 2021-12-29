import { ENDPOINTS } from '@lib/apiEndpoints';
import { axiosInstance } from '@lib/axiosInstance';
import { Checklist } from '@lib/slices/checklist';
import { User } from '@lib/slices/users';

export const usersApi = {
  async getUsers(shopId: number): Promise<{ data: User[] }> {
    const query = `tt=${shopId}`;
    return await axiosInstance.get(ENDPOINTS.USER.BASE() + '?' + query);
  },
  async postNewUser(dto: User): Promise<{ data: User }> {
    return await axiosInstance.post(ENDPOINTS.USER.BASE(), dto);
  },
  async deleteUser(id: number): Promise<{ data: string }> {
    return await axiosInstance.delete(ENDPOINTS.USER.BY_ID({ id }));
  },
  async updateUser(payload: User): Promise<{ data: User }> {
    return await axiosInstance.put(ENDPOINTS.USER.BY_ID({ id: payload.id }), payload);
  },
  async getUserById(id: number): Promise<{ data: User }> {
    return await axiosInstance.get(ENDPOINTS.USER.BY_ID({ id }));
  },
  async getUserChecklists(userId: number): Promise<{ data: Checklist[] }> {
    const query = `passerId=${userId}&passedOnly=true`;
    return await axiosInstance.get(ENDPOINTS.CHECKLIST.BASE() + '?' + query);
  },
};
