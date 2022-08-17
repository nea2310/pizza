import './assets/styles/styles.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reducers from './store/reducers/index';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import reportWebVitals from './reportWebVitals';

const store = configureStore({
  reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


