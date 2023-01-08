import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import { rootReducer } from '../../../store/index';

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
