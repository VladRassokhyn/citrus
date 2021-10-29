import { Checklist } from '../slices/checklist';
import { axiosInstance } from './axiosInstance';

export const checklistsApi = {
  async getChecklists(): Promise<Checklist[]> {
    return await axiosInstance.get('/checklist?passedOnly=true');
  },
  async postNewChecklist(payload: Checklist): Promise<{ data: Checklist }> {
    return await axiosInstance.post('/checklist', payload);
  },
};
