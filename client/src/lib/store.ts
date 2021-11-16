import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import { authReducer } from './slices/auth';
import { checklistReducer } from './slices/checklist';
import { daySalesReducer } from './slices/daySales';
import { planesReducer } from './slices/planes';
import { usersReducer, oneUserReducer } from './slices/users';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
  reducer: {
    users: usersReducer,
    oneUser: oneUserReducer,
    checklist: checklistReducer,
    auth: authReducer,
    planes: planesReducer,
    daySales: daySalesReducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
