import { axiosInstance } from '../../axiosInstance';
import { Salesman, SalesmanPostPayload } from './salesman.type';

export const salesmanApi = {
  async getSalesmans(tt: string): Promise<{ data: Salesman[] }> {
    return await axiosInstance.get(`/salesman?tt=${tt}`);
  },
  async postSalesmans(dto: SalesmanPostPayload): Promise<string> {
    return await axiosInstance.post(`/salesman`, dto);
  },
  async deleteSalesmans(id: number): Promise<string> {
    return await axiosInstance.delete(`/salesman/${id}`);
  },
};
