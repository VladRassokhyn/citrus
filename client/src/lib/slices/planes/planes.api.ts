import { TT } from '../../globalTypes';
import { Planes } from './planes.type';
import { axiosInstance } from '../../axiosInstance';

export const planesApi = {
  async getPlanes(tt: TT): Promise<{ data: Planes }> {
    return await axiosInstance.get(`/planes?tt=${tt}`);
  },
  async updatePlanes(planes: Planes): Promise<string> {
    return await axiosInstance.post(`/planes`, planes);
  },
};
