import { axiosInstance } from './axiosInstance';
import { User } from '../globalTypes';

export const userApi = {
  getUserById(id: string): Promise<{ data: User }> {
    return axiosInstance(`/users/${id}`);
  },
};
