import { ENDPOINTS } from '@lib/apiEndpoints';
import { axiosInstance } from '@lib/axiosInstance';

const TOKEN_VAR = 'token';

export const authApi = {
  getAuth(): Promise<{ userId: number }> {
    return axiosInstance.get(ENDPOINTS.AUTH.BASE(), {
      headers: {
        auth: localStorage.getItem(TOKEN_VAR),
      },
    });
  },
  login(dto: { username: string; password: string }): Promise<{ data: { token: string } }> {
    return axiosInstance.post(ENDPOINTS.AUTH.LOGIN(), dto);
  },
};
