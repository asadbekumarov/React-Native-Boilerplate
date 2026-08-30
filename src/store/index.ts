import { configureStore } from '@reduxjs/toolkit';
import { coreApi } from './api';

export const store = configureStore({
  reducer: {
    [coreApi.reducerPath]: coreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coreApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
