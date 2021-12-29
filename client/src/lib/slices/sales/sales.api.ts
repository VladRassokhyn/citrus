import { ENDPOINTS } from '@lib/apiEndpoints';
import { axiosInstance } from '@lib/axiosInstance';
import {
  SalesResponse,
  GetSalesPayload,
  PostSalesPayload,
  PutSalesPayload,
} from '@lib/slices/sales';

export const salesApi = {
  async getSales(dto: GetSalesPayload): Promise<{ data: SalesResponse }> {
    const query = `tt=${dto.tt}&month=${dto.month}&year=${dto.year}`;
    return await axiosInstance.get(ENDPOINTS.SALES.BASE() + '?' + query);
  },
  async postSales(dto: PostSalesPayload): Promise<string> {
    return await axiosInstance.post(ENDPOINTS.SALES.BASE(), dto);
  },
  async putSales(dto: PutSalesPayload): Promise<string> {
    return await axiosInstance.put(ENDPOINTS.SALES.BY_ID({ id: dto.id }), dto);
  },
  async deleteSales(id: number): Promise<string> {
    return await axiosInstance.delete(ENDPOINTS.SALES.BY_ID({ id }));
  },
};
