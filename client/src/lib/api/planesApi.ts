import { TT } from '../globalTypes';
import { updatePlanes } from '../slices/planes/planes.slice';
import { Planes } from '../slices/planes/planes.type';
import { axiosInstance } from './axiosInstance';

export const planesApi = {
  async getPlanes(tt: TT): Promise<{ data: Planes }> {
    return await axiosInstance.get(`/planes?tt=${tt}`);
  },
  async updatePlanes(planes: Planes) {
    return await axiosInstance.post(`/planes`, planes);
  },
};
