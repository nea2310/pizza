import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import reducers from '~s/reducers/index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';


let store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);


export function lesson2() {
  ReactDom.render(
    //пробрасываем склад в провайдер
    <Provider store={store}>
      <App />
    </Provider>
    ,
    document.querySelector('.app'));
}







