import { Salesman } from '../slices/salesmans/salesmans.types';
import { axiosInstance } from './axiosInstance';

export const salesmansApi = {
  async getSalesmans(): Promise<{ data: Salesman[] }> {
    return await axiosInstance.get('/salesmans');
  },
  async postNewSalesman(payload: {
    dto: Salesman;
    adminPassword: string;
  }): Promise<{ data: Salesman }> {
    return await axiosInstance.post('/salesmans', payload);
  },
};
