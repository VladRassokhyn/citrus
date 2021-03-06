import {
  getTodos,
  setTodos,
  setError,
  postTodo,
  deleteTodo,
  todoPosted,
  updateTodo,
  todoUpdated,
  postComment,
  todoDeleted,
  commentPosted,
  deleteComment,
  commentDeleted,
  updateComment,
  commentUpdated,
} from './todo.slice';
import { todos, status, commentsByTodoId } from './todo.selector';

export const todoSelectors = { todos, status, commentsByTodoId };
export const todoActions = {
  getTodos,
  setTodos,
  setError,
  postTodo,
  deleteTodo,
  todoPosted,
  updateTodo,
  todoUpdated,
  postComment,
  todoDeleted,
  commentPosted,
  deleteComment,
  commentDeleted,
  updateComment,
  commentUpdated,
};
export { todoApi } from './todo.api';
export { todoReducer } from './todo.slice';
export { todoWatcher } from './todo.saga';
export type { Todo, TodoPayload, CommentPayload, TodoComment, TodoState } from './todo.type';
