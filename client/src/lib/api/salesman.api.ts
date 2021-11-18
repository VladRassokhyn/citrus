import { axiosInstance } from './axiosInstance';
import { Salesman } from '../globalTypes';

export const salesmanApi = {
  async getSalesmans(tt: string) {
    return await axiosInstance.get(`/salesman?tt=${tt}`);
  },
  async postSalesmans(dto: Salesman) {
    return await axiosInstance.post(`/salesman`, dto);
  },
  async deleteSalesmans(id: number) {
    return await axiosInstance.delete(`/salesman/${id}`);
  },
};
