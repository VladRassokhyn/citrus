import { LoadingStatuses } from '@lib/globalTypes';

export type TodoState = {
  status: LoadingStatuses;
  todos: Todo[] | null;
};

export interface TodoPayload {
  title: string;
  description: string;
  importance: string;
  creatorId: number;
  executorId: number;
  finished: boolean;
  deadline: string;
  createdAt: string;
  category: string;
}

export interface Todo extends TodoPayload {
  id: number;
  comments: TodoComment[];
}

export interface CommentPayload {
  title: string;
  comment: string;
  creatorId: number;
  createdAt: string;
  todo: Todo;
}

export interface TodoComment extends CommentPayload {
  id: number;
}
