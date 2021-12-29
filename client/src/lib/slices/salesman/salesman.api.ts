import { ENDPOINTS } from '@lib/apiEndpoints';
import { axiosInstance } from '@lib/axiosInstance';
import { Salesman, SalesmanPostPayload } from '@lib/slices/salesman';

export const salesmanApi = {
  async getSalesmans(tt: string): Promise<{ data: Salesman[] }> {
    const query = `tt=${tt}`;
    return await axiosInstance.get(ENDPOINTS.SALESMANS.BASE() + '?' + query);
  },
  async postSalesmans(dto: SalesmanPostPayload): Promise<string> {
    return await axiosInstance.post(ENDPOINTS.SALESMANS.BASE(), dto);
  },
  async deleteSalesmans(id: number): Promise<string> {
    return await axiosInstance.delete(ENDPOINTS.SALESMANS.BY_ID({ id }));
  },
};
