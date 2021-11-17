import { Sales } from '../slices/daySales';
import { axiosInstance } from './axiosInstance';

export const daySalesApi = {
  async getDaySales(tt: string): Promise<{ data: Sales[] }> {
    return await axiosInstance.get(`/daySales?tt=${tt}`);
  },
  async postDaySales(payload: Sales) {
    return await axiosInstance.post('/daySales', payload);
  },
  async putDaySales(payload: Sales) {
    return await axiosInstance.put('/daySales', payload);
  },
};
