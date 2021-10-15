import { axiosInstance } from './axiosInstance';

export const authApi = {
  login(dto: {
    username: string;
    password: string;
  }): Promise<{ data: string }> {
    return axiosInstance.post('/auth', dto);
  },
};
