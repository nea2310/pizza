import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
  }
});


/*создадим типы для работы с Useselect и UseDispatch*/
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>