import { LoadingStatuses } from '@lib/globalTypes';
import { RootState } from '@lib/store';
import { Todo, TodoComment } from '@lib/slices/todo';

export const todos = (state: RootState): Todo[] | null => state.todo.todos;

export const status = (state: RootState): LoadingStatuses => state.todo.status;

export const commentsByTodoId = (todoId: number) => (state: RootState): TodoComment[] => {
  const todo = state.todo.todos?.find((todo) => todo.id === todoId);

  return todo?.comments || [];
};
