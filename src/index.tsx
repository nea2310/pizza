import './assets/styles/styles.ts';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from '../src/store/'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);



