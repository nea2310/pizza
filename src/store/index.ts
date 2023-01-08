import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import pizzaItemsReducer from './slices/pizzaItemsSlice';
import orderReducer from './slices/orderSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  pizzaItems: pizzaItemsReducer,
  order: orderReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    pizzaItems: pizzaItemsReducer,
    order: orderReducer
  }
});

export default store;

/*создадим типы для работы с Useselect и UseDispatch*/

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];