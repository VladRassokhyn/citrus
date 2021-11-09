import { axiosInstance } from './axiosInstance';

export const planesApi = {
  async getPlanes() {
    return await axiosInstance.get('/planes');
  },
};
