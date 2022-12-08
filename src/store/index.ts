import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import pizzaItemsReducer from './slices/pizzaItemsSlice';
import orderReducer from './slices/orderSlice';
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;