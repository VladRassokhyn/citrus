import { ENDPOINTS } from '@lib/apiEndpoints';
import { Todo, TodoPayload, CommentPayload, TodoComment } from '@lib/slices/todo';
import { axiosInstance } from '@lib/axiosInstance';

export const todoApi = {
  async getTodos(): Promise<{ data: Todo[] }> {
    return await axiosInstance.get(ENDPOINTS.TODO.BASE());
  },
  async postTodo(payload: TodoPayload): Promise<{ data: string }> {
    return await axiosInstance.post(ENDPOINTS.TODO.BASE(), payload);
  },
  async updateTodo(payload: Todo): Promise<{ data: string }> {
    return await axiosInstance.put(ENDPOINTS.TODO.BASE(), payload);
  },
  async deleteTodo(id: number): Promise<{ data: string }> {
    return await axiosInstance.delete(ENDPOINTS.TODO.BY_ID({ id }));
  },
  async postComment(payload: CommentPayload): Promise<{ data: string }> {
    return await axiosInstance.post(ENDPOINTS.TODO.COMMENTS.BASE(), payload);
  },
  async updateComment(payload: TodoComment): Promise<{ data: string }> {
    return await axiosInstance.put(ENDPOINTS.TODO.COMMENTS.BASE(), payload);
  },
  async deleteComment(id: number): Promise<{ data: string }> {
    return await axiosInstance.delete(ENDPOINTS.TODO.COMMENTS.BY_ID({ id }));
  },
};
