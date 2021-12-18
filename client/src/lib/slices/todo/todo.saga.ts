import { Action } from './../../globalTypes';
import { todoApi } from './todo.api';
import { todoActions } from './index';
import { takeEvery, put, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';
import { CommentPayload, Todo, TodoComment, TodoPayload } from './todo.type';

function* getTodosWorker(): SagaIterator {
  try {
    const res = yield call(todoApi.getTodos);
    yield put(todoActions.setTodos(res.data));
  } catch (err) {
    yield put(todoActions.setError());
  }
}

function* postTodoWorker(action: Action<TodoPayload>): SagaIterator {
  try {
    yield call(todoApi.postTodo, action.payload);
    yield put(todoActions.todoPosted());
  } catch (err) {
    yield put(todoActions.setError());
  }
}

function* updateTodoWorker(action: Action<Todo>): SagaIterator {
  try {
    yield call(todoApi.updateTodo, action.payload);
    yield put(todoActions.todoUpdated());
  } catch (err) {
    yield put(todoActions.setError());
  }
}

function* deleteTodoWorker(action: Action<number>): SagaIterator {
  try {
    yield call(todoApi.deleteTodo, action.payload);
    yield put(todoActions.todoDeleted());
  } catch (err) {
    yield put(todoActions.setError());
  }
}

function* postCommentWorker(action: Action<CommentPayload>): SagaIterator {
  try {
    console.log(action.payload);
    yield call(todoApi.postComment, action.payload);
    yield put(todoActions.commentPosted());
  } catch (err) {
    yield put(todoActions.setError());
  }
}

function* updateCommentWorker(action: Action<TodoComment>): SagaIterator {
  try {
    yield call(todoApi.updateComment, action.payload);
    yield put(todoActions.commentUpdated());
  } catch (err) {
    yield put(todoActions.setError());
  }
}

function* deleteCommentWorker(action: Action<number>): SagaIterator {
  try {
    yield call(todoApi.deleteComment, action.payload);
    yield put(todoActions.commentDeleted());
  } catch (err) {
    yield put(todoActions.setError());
  }
}

export function* todoWatcher(): SagaIterator {
  yield takeEvery(todoActions.getTodos, getTodosWorker);
  yield takeEvery(todoActions.postTodo, postTodoWorker);
  yield takeEvery(todoActions.updateTodo, updateTodoWorker);
  yield takeEvery(todoActions.deleteTodo, deleteTodoWorker);
  yield takeEvery(todoActions.postComment, postCommentWorker);
  yield takeEvery(todoActions.updateComment, updateCommentWorker);
  yield takeEvery(todoActions.deleteComment, deleteCommentWorker);
}
