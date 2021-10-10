import { postNewSalesman } from '../slices/salesmans/salesmans.slice';
import { Salesman } from '../types';
import { axiosInstance } from './axiosInstance';

export const salesmansApi = {
  async getSalesmans(): Promise<{ data: Salesman[] }> {
    return await axiosInstance.get('/salesmans');
  },
  async postNewSalesman(dto: Salesman): Promise<{ data: Salesman }> {
    return await axiosInstance.post('/salesmans', dto);
  },
};
