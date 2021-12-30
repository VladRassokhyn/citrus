import { ENDPOINTS } from '@lib/apiEndpoints';
import { axiosInstance } from '@lib/axiosInstance';

export const raitingApi = {
  async getSales({ month, year }: { month: number; year: number }): Promise<{ data: any[] }> {
    const query = `?month=${month}&year=${year}`;
    return await axiosInstance.get(ENDPOINTS.RAITING.BASE() + query);
  },
};
