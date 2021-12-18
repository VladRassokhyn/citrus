import { LoadingStatuses } from './../../globalTypes';
import { RootState } from './../../store';
import { Todo, TodoComment, TodoPayload } from './todo.type';

export const todos = (state: RootState): Todo[] | null => state.todo.todos;

export const status = (state: RootState): LoadingStatuses => state.todo.status;

export const commentsByTodoId = (todoId: number) => (state: RootState): TodoComment[] => {
  const todo = state.todo.todos?.find((todo) => todo.id === todoId);

  return todo?.comments || [];
};
