import { todoReducer } from '@lib/slices/todo';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '@lib/rootSaga';
import { authReducer } from '@lib/slices/auth';
import { checklistReducer } from '@lib/slices/checklist';
import { planesReducer } from '@lib/slices/planes';
import { salesReducer } from '@lib/slices/sales';
import { salesmanReducer } from '@lib/slices/salesman';
import { usersReducer, oneUserReducer } from '@lib/slices/users';
import { shopReducer } from '@lib/slices/shop';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
  reducer: {
    users: usersReducer,
    oneUser: oneUserReducer,
    checklist: checklistReducer,
    auth: authReducer,
    planes: planesReducer,
    salesman: salesmanReducer,
    sales: salesReducer,
    shops: shopReducer,
    todo: todoReducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
