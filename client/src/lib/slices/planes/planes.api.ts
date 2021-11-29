import { TT } from '../../globalTypes';
import { GetPlanesPayload, Planes } from './planes.type';
import { axiosInstance } from '../../axiosInstance';

export const planesApi = {
  async getPlanes(dto: GetPlanesPayload): Promise<{ data: Planes }> {
    return await axiosInstance.get(`/planes?tt=${dto.tt}&mounth=${dto.mounth}&year=${dto.year}`);
  },
  async updatePlanes(planes: Planes): Promise<string> {
    return await axiosInstance.post(`/planes`, planes);
  },
};
