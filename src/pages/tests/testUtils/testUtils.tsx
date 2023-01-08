import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { setupStore, rootReducer } from '../../../store';
import type { AppStore, RootState } from '../../../store';




import { createStore } from 'redux';
import { AppState } from '../../../interface';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';


// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}





export const renderWithReduxAndRouter = (
  component: JSX.Element,
  {
    initialState,
    store = createStore(rootReducer, initialState),
  }: { initialState?: AppState; store?: any } = {}
) => {
  return {
    ...render(
      
        <Provider store={store}><BrowserRouter>{component}</BrowserRouter></Provider>
      
    ),
    store,
  };
};

// function rootReducer(rootReducer: any, initialState: AppState | undefined): any {
//   throw new Error('Function not implemented.');
// }
