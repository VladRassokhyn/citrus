import { GetPlanesPayload, Planes } from './planes.type';
import { axiosInstance } from '../../axiosInstance';

export const planesApi = {
  async getPlanes(dto: GetPlanesPayload): Promise<{ data: Planes }> {
    return await axiosInstance.get(`/planes?tt=${dto.tt}&month=${dto.month}&year=${dto.year}`);
  },
  async updatePlanes(planes: Planes): Promise<string> {
    return await axiosInstance.put(`/planes/${planes.id}`, planes);
  },
  async postPlanes(planes: Planes): Promise<string> {
    return await axiosInstance.post(`/planes`, planes);
  },
};
