import { Checklist } from '../slices/checklist';
import { axiosInstance } from './axiosInstance';

export const checklistsApi = {
  async getChecklists(): Promise<Checklist[]> {
    return await axiosInstance.get('/checklist?passedOnly=false');
  },
  async postNewChecklist(payload: Checklist): Promise<{ data: Checklist }> {
    return await axiosInstance.post('/checklist', payload);
  },
  async getChecklistById(id: string): Promise<Checklist> {
    return await axiosInstance.get(`/checklist/${id}`);
  },
  async deleteChecklist(id: number) {
    return await axiosInstance.delete(`/checklist/${id}`);
  },
};
