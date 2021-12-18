import { CommentPayload, Todo, TodoComment, TodoPayload, TodoState } from './todo.type';
import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatuses, Action } from './../../globalTypes';

const initialState: TodoState = {
  status: LoadingStatuses.IDLE,
  todos: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    getTodos(state) {
      state.status = LoadingStatuses.LOADING;
    },
    setTodos(state, action: Action<Todo[]>) {
      const todos = action.payload.sort(
        (a, b) => +b.createdAt.split('.').join('') - +a.createdAt.split('.').join(''),
      );
      state.todos = todos;
      state.status = LoadingStatuses.SUCCESS;
    },
    postTodo(state, action: Action<TodoPayload>) {
      state.status = LoadingStatuses.LOADING;
    },
    todoPosted(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    updateTodo(state, action: Action<Todo>) {
      state.status = LoadingStatuses.LOADING;
    },
    todoUpdated(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    deleteTodo(state, action: Action<number>) {
      state.status = LoadingStatuses.LOADING;
    },
    todoDeleted(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    postComment(state, action: Action<CommentPayload>) {
      state.status = LoadingStatuses.LOADING;
    },
    commentPosted(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    updateComment(state, action: Action<TodoComment>) {
      state.status = LoadingStatuses.LOADING;
    },
    commentUpdated(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    deleteComment(state, action: Action<number>) {
      state.status = LoadingStatuses.LOADING;
    },
    commentDeleted(state) {
      state.status = LoadingStatuses.SUCCESS;
    },
    setError(state) {
      state.status = LoadingStatuses.ERROR;
    },
  },
});

export const {
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
} = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
