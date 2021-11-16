import { Sales } from '../slices/daySales';
import { axiosInstance } from './axiosInstance';

export const daySalesApi = {
  async getDaySales(tt: string): Promise<{ data: Sales[] }> {
    return await axiosInstance.get(`/day-sales?tt=${tt}`);
  },
};
