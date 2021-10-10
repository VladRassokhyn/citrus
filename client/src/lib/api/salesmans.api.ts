import { Salesman } from '../types';
import { axiosInstance } from './axiosInstance';

export const salesmansApi = {
  async getSalesmans(): Promise<{ body: Salesman[] }> {
    return await axiosInstance.get('/salesmans');
  },
};
