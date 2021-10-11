import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import { checklistReducer } from './slices/checklist';
import { salesmansReducer } from './slices/salesmans';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
  reducer: {
    salesmans: salesmansReducer,
    checklist: checklistReducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
