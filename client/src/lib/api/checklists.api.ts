import { Checklist } from '../slices/checklist';
import { axiosInstance } from './axiosInstance';

export const checklistsApi = {
  async getChecklists(): Promise<Checklist[]> {
    return await axiosInstance.get('/checklist?passedOnly=false');
  },
};
