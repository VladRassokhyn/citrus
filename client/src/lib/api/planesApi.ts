import { TT } from '../globalTypes';
import { axiosInstance } from './axiosInstance';

export const planesApi = {
  async getPlanes(tt: TT) {
    return await axiosInstance.get(`/planes?tt=${tt}`);
  },
};
