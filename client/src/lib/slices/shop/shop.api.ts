import { axiosInstance } from '../../axiosInstance';
import { Shop, PostShopPayload } from './shop.type';

export const shopApi = {
  async getShops(): Promise<{ data: Shop[] }> {
    return await axiosInstance.get('/shops');
  },
  async postShops(dto: PostShopPayload): Promise<{ data: string }> {
    return await axiosInstance.post('/shops', dto);
  },
  async updateShops(dto: Shop): Promise<{ data: string }> {
    return await axiosInstance.put('/shops', dto);
  },
  async deleteShops(id: number): Promise<{ data: string }> {
    return await axiosInstance.get(`/shops/${id}`);
  },
};
