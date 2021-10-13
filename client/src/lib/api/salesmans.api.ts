import { FixLater } from '../globalTypes';
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
    console.log(payload);
    return await axiosInstance.post('/salesmans', payload);
  },
  async deleteSalesman(data: {
    salesmanId: string;
    adminPassword: string;
  }): Promise<{ data: FixLater }> {
    return await axiosInstance.delete('/salesmans', { data });
  },
};
