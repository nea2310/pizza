import React, { PropsWithChildren, Reducer } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupStore, AppStore, RootState } from './setupStore';
import { createStore } from 'redux';
import { rootReducer } from '../../../store/index';
import { AppState } from '../../../interface';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

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

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
    
    <Provider store={store}>
    
      {children}
     
      </Provider>
     
      );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

interface WrapperProps {
  children?: React.ReactNode;
}

// export function renderWithProviders(ui: any, { route = '/', initialState = {} } = {}) {
//   window.history.pushState({}, 'Test page', route);

//   const store = configureStore({ reducer: rootReducer, preloadedState: initialState });

//   const Wrapper = ({ children }: WrapperProps) => {
//       return (
//           <Provider store={store}>
//               <BrowserRouter>{children}</BrowserRouter>
//           </Provider>
//       );
//   };

//   return render(ui, { wrapper: Wrapper });
// }



// export function renderWithProvidersAndRouter(
//   ui: React.ReactElement,
//   {
//     preloadedState = {},
//     store = setupStore(preloadedState),
//     ...renderOptions
//   }: ExtendedRenderOptions = {}
// ) {
//   // eslint-disable-next-line no-undef
//   function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
//     return (
//       <Provider store={store}>
//         <BrowserRouter>{children}</BrowserRouter>
//       </Provider>
//     );
//   }
//   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
// }
