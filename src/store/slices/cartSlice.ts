import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { cartAPI } from '../API/cartAPI';
import capitalize from '../../shared/helpers/capitalize';
import { ICartItem, ICartState, ICartAddItemArgs, IСartChangeItemArgs } from './../../interface';

const initialState: ICartState = {
  cartItems: [],
  total: 0,
  status: null,
  error: null
};

const NAMESPACE = 'cart';

// Загрузить корзину пользователя
export const fetchCart = createAsyncThunk<Array<ICartItem>, string>(
  `${NAMESPACE}/fetch${capitalize(NAMESPACE)}`,
  (user) => cartAPI.fetchCart(user)
  )

//Добавить товар в корзину
export const addCartItem = createAsyncThunk<Array<ICartItem>, ICartAddItemArgs, { state: { cart: ICartState } }>(
  `${NAMESPACE}/add${capitalize(NAMESPACE)}Item`,
  (data, { getState }) => cartAPI.addCartItem(data, getState)
  )

// Изменить количество товара в корзине
export const changeCartItem = createAsyncThunk<Array<ICartItem>, IСartChangeItemArgs, { state: { cart: ICartState } }>(
  `${NAMESPACE}/change${capitalize(NAMESPACE)}Item`,
  (data, { getState }) => cartAPI.changeCartItem(data, getState)
  )

// Удалить товар из корзины
export const removeCartItem = createAsyncThunk<Array<ICartItem>, ICartAddItemArgs, { state: { cart: ICartState } }>(
  `${NAMESPACE}/remove${capitalize(NAMESPACE)}Item`,
    (data, { getState }) => cartAPI.removeCartItem(data, getState)
  )

// Очистить корзину
export const clearCart = createAsyncThunk<Array<ICartItem>, string>(
  `${NAMESPACE}/clear${capitalize(NAMESPACE)}`,
  (user) => cartAPI.clearCart(user)
  )

function isFulfilled(action: AnyAction) {
  if (action.type.match(NAMESPACE)) return action.type.endsWith('fulfilled');
}

function isRejected(action: AnyAction) {
  if (action.type.match(NAMESPACE)) return action.type.endsWith('rejected');
}

function isPending(action: AnyAction) {
  if (action.type.match(NAMESPACE)) return action.type.endsWith('pending');
}

const cartSlice = createSlice({
  name: NAMESPACE,
  initialState,

  extraReducers:
    builder => {
      builder
        .addMatcher(isPending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addMatcher(isFulfilled, (state, action: PayloadAction<Array<ICartItem>>) => {
          state.status = 'resolved';
          state.error = null;
          state.cartItems = action.payload;
        })
        .addMatcher(isRejected, (state, action: PayloadAction<string>) => {
          state.status = 'rejected';
          state.error = action.payload;
        })
    },

  reducers: {},
});

export default cartSlice.reducer;