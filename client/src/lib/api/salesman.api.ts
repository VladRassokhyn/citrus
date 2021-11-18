import { axiosInstance } from './axiosInstance';
import { Salesman } from '../globalTypes';

export const salesmanApi = {
  async getSalesmans(tt: string) {
    return await axiosInstance.get(`/salesmans?tt=${tt}`);
  },
  async postSalesmans(dto: Salesman) {
    return await axiosInstance.post(`/salesmans`, dto);
  },
  async deleteSalesmans(id: number) {
    return await axiosInstance.delete(`/salesmans/${id}`);
  },
};
