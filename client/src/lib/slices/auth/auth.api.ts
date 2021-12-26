import { axiosInstance } from '../../axiosInstance';

export const authApi = {
  getAuth(): Promise<{ userId: number }> {
    return axiosInstance.get('/auth', {
      headers: {
        auth: localStorage.getItem('token'),
      },
    });
  },
  login(dto: { username: string; password: string }): Promise<{ data: { token: string } }> {
    return axiosInstance.post('/auth/login', dto);
  },
};
