import { axiosInstance } from '../../axiosInstance';
import { Salesman } from '../../globalTypes';

export const salesmanApi = {
  async getSalesmans(tt: string): Promise<{ data: Salesman[] }> {
    return await axiosInstance.get(`/salesman?tt=${tt}`);
  },
  async postSalesmans(dto: Salesman): Promise<string> {
    return await axiosInstance.post(`/salesman`, dto);
  },
  async deleteSalesmans(id: number): Promise<string> {
    return await axiosInstance.delete(`/salesman/${id}`);
  },
};
