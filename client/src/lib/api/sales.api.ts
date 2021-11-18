import { SalesPayload } from '../globalTypes';
import { axiosInstance } from './axiosInstance';

export const salesApi = {
  async getSales(tt: string) {
    return await axiosInstance.get(`/sales?tt=${tt}`);
  },
  async postSales(dto: SalesPayload) {
    return await axiosInstance.post('/sales', dto);
  },
  async putSales(dto: SalesPayload) {
    return await axiosInstance.put('/sales', dto);
  },
  async deleteSales(id: number) {
    return await axiosInstance.delete(`/sales${id}`);
  },
};
