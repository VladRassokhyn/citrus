import { axiosInstance } from './axiosInstance';

export const authApi = {
  getAuth() {
    return axiosInstance.get('/auth');
  },
  login(dto: {
    username: string;
    password: string;
  }): Promise<{ data: string }> {
    return axiosInstance.post('/auth/login', dto);
  },
};
