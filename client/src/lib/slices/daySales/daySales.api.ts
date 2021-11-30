import { DaySales } from './daySales.type';
import { axiosInstance } from '../../axiosInstance';

export const daySalesApi = {
  async getDaySales(tt: string): Promise<{ data: DaySales[] }> {
    return await axiosInstance.get(`/daySales?tt=${tt}`);
  },
  async postDaySales(payload: DaySales): Promise<string> {
    return await axiosInstance.post('/daySales', payload);
  },
  async putDaySales(payload: DaySales): Promise<string> {
    return await axiosInstance.put('/daySales', payload);
  },
  async deleteDaySales(id: number): Promise<string> {
    return await axiosInstance.delete(`/daySales/${id}`);
  },
};
