import { ENDPOINTS } from '@lib/apiEndpoints';
import { axiosInstance } from '@lib/axiosInstance';
import { Shop, PostShopPayload } from '@lib/slices/shop';

export const shopApi = {
  async getShops(): Promise<{ data: Shop[] }> {
    return await axiosInstance.get(ENDPOINTS.SHOP.BASE());
  },
  async postShops(dto: PostShopPayload): Promise<{ data: string }> {
    return await axiosInstance.post(ENDPOINTS.SHOP.BASE(), dto);
  },
  async updateShops(dto: Shop): Promise<{ data: string }> {
    return await axiosInstance.put(ENDPOINTS.SHOP.BASE(), dto);
  },
  async deleteShops(id: number): Promise<{ data: string }> {
    return await axiosInstance.get(ENDPOINTS.SHOP.BY_ID({ id }));
  },
};
