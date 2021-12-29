import { ENDPOINTS } from '@lib/apiEndpoints';
import { GetPlanesPayload, Planes } from '@lib/slices/planes';
import { axiosInstance } from '@lib/axiosInstance';

export const planesApi = {
  async getPlanes(dto: GetPlanesPayload): Promise<{ data: Planes }> {
    const query = `tt=${dto.tt}&month=${dto.month}&year=${dto.year}`;
    return await axiosInstance.get(ENDPOINTS.PLANES.BASE() + '?' + query);
  },
  async updatePlanes(planes: Planes): Promise<string> {
    return await axiosInstance.put(ENDPOINTS.PLANES.BY_ID({ id: planes.id! }), planes);
  },
  async postPlanes(planes: Planes): Promise<string> {
    return await axiosInstance.post(ENDPOINTS.PLANES.BASE(), planes);
  },
};
