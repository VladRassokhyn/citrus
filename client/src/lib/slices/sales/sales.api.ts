import { axiosInstance } from '../../axiosInstance';
import { SalesResponse, SalesPayload, GetSalesPayload } from './sales.type';

export const salesApi = {
  async getSales(dto: GetSalesPayload): Promise<{ data: SalesResponse }> {
    return await axiosInstance.get(`/sales?tt=${dto.tt}&month=${dto.month}&year=${dto.year}`);
  },
  async postSales(dto: SalesPayload): Promise<string> {
    return await axiosInstance.post('/sales', dto);
  },
  async putSales(dto: SalesPayload): Promise<string> {
    return await axiosInstance.put(`/sales`, dto);
  },
  async deleteSales(id: number): Promise<string> {
    return await axiosInstance.delete(`/sales/${id}`);
  },
};
