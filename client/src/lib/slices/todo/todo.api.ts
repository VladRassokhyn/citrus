import { Todo, TodoPayload, CommentPayload, TodoComment } from './todo.type';
import { axiosInstance } from './../../axiosInstance';

export const todoApi = {
  async getTodos(): Promise<{ data: Todo[] }> {
    return await axiosInstance.get('/todo');
  },
  async postTodo(payload: TodoPayload): Promise<{ data: string }> {
    return await axiosInstance.post('/todo', payload);
  },
  async updateTodo(payload: Todo): Promise<{ data: string }> {
    return await axiosInstance.put('/todo', payload);
  },
  async deleteTodo(id: number): Promise<{ data: string }> {
    return await axiosInstance.delete(`/todo/${id}`);
  },
  async postComment(payload: CommentPayload): Promise<{ data: string }> {
    return await axiosInstance.post('/todo/comments', payload);
  },
  async updateComment(payload: TodoComment): Promise<{ data: string }> {
    return await axiosInstance.put('/todo/comments', payload);
  },
  async deleteComment(id: number): Promise<{ data: string }> {
    return await axiosInstance.delete(`/todo/comments/${id}`);
  },
};
