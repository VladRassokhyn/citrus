import { DaySales } from '../slices/daySales';
import { axiosInstance } from './axiosInstance';

export const daySalesApi = {
  async getDaySales(tt: string): Promise<{ data: DaySales[] }> {
    return await axiosInstance.get(`/daySales?tt=${tt}`);
  },
  async postDaySales(payload: DaySales) {
    return await axiosInstance.post('/daySales', payload);
  },
  async putDaySales(payload: DaySales) {
    return await axiosInstance.put('/daySales', payload);
  },
  async deleteDaySales(payload: DaySales) {
    return await axiosInstance.delete(`/daySales/${payload.id}`);
  },
};
