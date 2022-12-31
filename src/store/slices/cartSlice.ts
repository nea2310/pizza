import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';

import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  query,
  where,
  getDoc,
  updateDoc,
  DocumentData
} from "firebase/firestore";

import capitalize from '../../shared/helpers/capitalize';
import db from './../../firebase';
import { ICartItem, ICartItemRaw, ICartState, ICartAddItemArgs, IСartChangeItemArgs } from './../../interface';

const initialState: ICartState = {
  cartItems: [],
  total: 0,
  status: null,
  error: null
};

const NAMESPACE = 'cart';


const getCart = async (user: string) => {
  const cartRef = collection(db, "cart");// cartRef - ссылка на коллекцию по названию коллекции (метод collection)
  const q = query(cartRef,
    where("user", "==", user));  // q -  набор ссылок на документ коллекции, получаемый фильтром по объекту документа (метод query)
  return getDocs(q)
    .then((cart) => {
      let arr: Array<ICartItemRaw> = [];
      cart.forEach((doc) => {
        let a = { ...doc.data(), id: doc.id } as ICartItemRaw;
        arr.push(a);
      });
      return arr;
    });
};

// Загрузить корзину пользователя
export const fetchCart = createAsyncThunk<Array<ICartItem>, string>(
  `${NAMESPACE}/fetch${capitalize(NAMESPACE)}`,

  async function (user) {
    const cart = await getCart(user);
    const cartItems: ICartItem[] = [];
    if (cart.length) {
      const itemsObj = cart[0].items;
      for (let key in itemsObj) {
        cartItems.push({ [key]: itemsObj[key] });
      }
    }
    return cartItems;
  })

//Добавить товар в корзину
export const addCartItem = createAsyncThunk<Array<ICartItem>, ICartAddItemArgs, { state: { cart: ICartState } }>(
  `${NAMESPACE}/add${capitalize(NAMESPACE)}Item`,

  async function (data, { getState }) {
    const { user, pizzaItem } = data;
    const cart = await getCart(user);
    if (!cart.length) {//корзина НЕ существует
      // создать документ корзины и добавить туда пиццу
      console.log('Корзина НЕ существует>>>>');
      await addDoc(collection(db, "cart"), {
        user,
        items: { [pizzaItem]: 1 }
      });
    } else {
      console.log('Корзина существует>>>>', cart);
      //  добавить пиццу в существующую корзину
      await setDoc(doc(db, 'cart', cart[0].id),
        {
          items: { [pizzaItem]: 1 }
        },
        { merge: true }
      );
    }
    const newCart = Array.from(getState().cart.cartItems);
    newCart.push({ [pizzaItem]: 1 });
    return newCart;
  })


// изменить количество товара в корзине
export const changeCartItem = createAsyncThunk<Array<ICartItem>, IСartChangeItemArgs, { state: { cart: ICartState } }>(
  `${NAMESPACE}/change${capitalize(NAMESPACE)}Item`,

  async function (data, { getState }) {

    const { user, pizzaItem, cnt } = data;
    const cart = await getCart(user);
    const docRef = doc(db, "cart", cart[0].id);
    await getDoc(docRef);
    await setDoc(docRef,
      {
        items: { [pizzaItem]: cnt }
      },
      { merge: true }
    )

    const currentCart = Array.from(getState().cart.cartItems);

    const newCart = currentCart.map(
      (el: ICartItem) => {
        if (pizzaItem in el) {
          el = { [pizzaItem]: cnt }
        }
        return el;
      });

    return newCart;
  })


export const removeCartItem = createAsyncThunk<Array<ICartItem>, ICartAddItemArgs, { state: { cart: ICartState } }>(
  `${NAMESPACE}/remove${capitalize(NAMESPACE)}Item`,
  async function (data, { getState }) {
    const { user, pizzaItem } = data;
    const cart = await getCart(user);
    const docRef = doc(db, "cart", cart[0].id);
    const document = await getDoc(docRef)
    //получить текущие элементы корзины
    const documentData = document.data() as DocumentData;
    const obj = documentData.items;
    // убрать удаляемый элемент
    delete obj[pizzaItem];
    //обновить корзину
    await updateDoc(docRef,
      {
        items: obj
      }
    );

    const currentCart = Array.from(getState().cart.cartItems);
    const newCart = currentCart.filter(
      (el: ICartItem) => {
        return !(pizzaItem in el);
      });
    return newCart;
  })


export const clearCart = createAsyncThunk<Array<ICartItem>, string>(
  `${NAMESPACE}/clear${capitalize(NAMESPACE)}`,

  async function (user) {
    const cart = await getCart(user);
    const docRef = doc(db, "cart", cart[0].id);
    await getDoc(docRef);
    await updateDoc(docRef, { items: {} });

    return [];

  })



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