import { Checklist } from '@lib/slices/checklist';
import { axiosInstance } from '@lib/axiosInstance';
import { ENDPOINTS } from '@lib/apiEndpoints';

export const checklistsApi = {
  async getChecklists(): Promise<Checklist[]> {
    const query = 'passedOnly=false';
    return await axiosInstance.get(ENDPOINTS.CHECKLIST.BASE() + '?' + query);
  },
  async postNewChecklist(payload: Checklist): Promise<{ data: Checklist }> {
    return await axiosInstance.post(ENDPOINTS.CHECKLIST.BASE(), payload);
  },
  async getChecklistById(id: string): Promise<Checklist> {
    return await axiosInstance.get(ENDPOINTS.CHECKLIST.BY_ID({ id }));
  },
  async deleteChecklist(id: number): Promise<string> {
    return await axiosInstance.delete(ENDPOINTS.CHECKLIST.BY_ID({ id }));
  },
};
