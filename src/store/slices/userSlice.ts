import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged
} from "firebase/auth";
import db, { firebaseApp } from './../../firebase';

import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  query,
  where,
  getDoc,
  DocumentData,
} from "firebase/firestore";

import { fetchCart, clearCart } from './cartSlice';
import { orderSetUser } from './orderSlice';
import {
  IUserState,
  IUserDataToUpdate,
  IUserData,
  IUserRegArgs,
  IUserRegReturn,
  IUserSetArgs,
  IUserUpdateFavItemsArgs
} from './../../interface';
import capitalize from '../../shared/helpers/capitalize';

firebaseApp;
const authdata = getAuth();

const initialState: IUserState = {
  email: null,
  token: null,
  id: null,
  name: null,
  surname: null,
  userDocID: null,
  favorites: [],
  status: null,
  error: null
};

const NAMESPACE = 'user';


/*обновить данные пользователя в стейте*/
export const updateUser = createAsyncThunk<IUserRegReturn, IUserDataToUpdate>(
  `${NAMESPACE}/update${capitalize(NAMESPACE)}`,

  /*обновить данные пользователя в стейте*/
  async function (userDataToUpdate, { dispatch }) {
    const { email, token, id } = userDataToUpdate;
    const q =
      query(collection(db, "users"), where("id", "==", id));
    const user = await getDocs(q);
    /*получаем пользователя по ключу uid, поэтому запись может быть только одна*/
    const doc = user.docs[0];
    const userRec = { ...doc.data(), userDocID: doc.id } as IUserData;

    dispatch(fetchCart(userRec.userDocID));
    dispatch(orderSetUser({ name: userRec.name, email: userRec.email }));

    const { name, surname, userDocID, favorites } = userRec;
    return {
      name,
      surname,
      email,
      token,
      id,
      userDocID,
      favorites
    };
  }
)

/*Зарегистрироваться новому пользователю*/
export const registerUser = createAsyncThunk<IUserRegReturn, IUserRegArgs>(
  `${NAMESPACE}/register${capitalize(NAMESPACE)}`,

  async function (data) {
    // вызываем API Firebase - вносим запись в Authentication
    const { user } = await createUserWithEmailAndPassword(authdata, data.email, data.password) // регистрируем пользователя

    const { name, surname, email } = data;
    const { refreshToken, uid } = user;

    const userRec = {
      name,
      surname,
      email,
      token: refreshToken,
      id: uid,
      favorites: [],
    };

    const doc = await addDoc(collection(db, "users"), userRec);
    return {
      ...userRec,
      userDocID: doc.id
    }
  }
)

/*залогиниться существующему пользователю*/
export const setUser = createAsyncThunk<undefined, IUserSetArgs>(
  `${NAMESPACE}/set${capitalize(NAMESPACE)}`,

  async function (data, { dispatch }) {
    // вызываем API Firebase - вносим запись в Authentication
    const { user } = await signInWithEmailAndPassword(authdata, data.email, data.password) // регистрируем пользователя
    const emailFromDB = user.email ? user.email : '';

    const { refreshToken, uid } = user;

    dispatch(updateUser({
      email: emailFromDB,
      token: refreshToken,
      id: uid,
    }))
    return undefined;
  }
)


/*Получить залогиненного пользователя*/
export const fetchUser = createAsyncThunk<void, undefined, { rejectValue: string }>(
  `${NAMESPACE}/fetch${capitalize(NAMESPACE)}`,

  async function (_, { dispatch }) {

    onAuthStateChanged(authdata, (user) => {
      if (user) {
        const emailFromDB = user.email ? user.email : '';

        dispatch(updateUser({
          email: emailFromDB,
          token: user.refreshToken,
          id: user.uid,
        }))
      }
    })
  })

/*обновить избранное*/
export const updateUserFavItems = createAsyncThunk<{ favorites: string[] }, IUserUpdateFavItemsArgs>(
  `${NAMESPACE}/update${capitalize(NAMESPACE)}FavItems`,

  async function (data) {

    const { user, pizzaItem, isAdding } = data;
    const userRef = doc(db, 'users', user);

    const res = await getDoc(userRef);
    const data1 = res.data() as DocumentData;
    let favorites: string[] = data1.favorites;
    /*Если добавляем в  избранное*/

    if (isAdding) {
      favorites.push(pizzaItem);
    }
    /*Если удаляем из избранного*/
    else {
      favorites = favorites.filter((item) => item !== String(pizzaItem))
    }

    await setDoc(userRef,
      { favorites: favorites }, { merge: true })
    return { favorites };
  }
)

/*разлогиниться существующему пользователю*/
export const userUnset = createAsyncThunk<undefined, undefined, { state: { user: IUserState } }>(
  `${NAMESPACE}/unset${capitalize(NAMESPACE)}`,
  async function (_, { getState, dispatch }) {
    const user = getState().user.userDocID;
    await signOut(authdata);

    if (user) {
      dispatch(clearCart(user))
    }
    return undefined;
  }
)

function isRejected(action: AnyAction) {
  if (action.type.match(NAMESPACE))  return action.type.endsWith('rejected');
}

function isPending(action: AnyAction) {
  if (action.type.match(NAMESPACE))  return action.type.endsWith('pending');
}

const userSlice = createSlice({
  name: NAMESPACE,
  initialState,

  extraReducers:
    builder => {
      builder
        .addCase(registerUser.fulfilled, (state, action) => {
          const {
            name,
            surname,
            email,
            token,
            id,
            favorites,
            userDocID,
          } = action.payload;

          state.status = 'resolved';
          state.name = name;
          state.surname = surname;
          state.email = email;
          state.token = token;
          state.id = id;
          state.favorites = favorites;
          state.userDocID = userDocID;
        })

        .addCase(updateUser.fulfilled, (state, action) => {
          const {
            name,
            surname,
            email,
            token,
            id,
            favorites,
            userDocID,
          } = action.payload;

          state.status = 'resolved';
          state.name = name;
          state.surname = surname;
          state.email = email;
          state.token = token;
          state.id = id;
          state.favorites = favorites;
          state.userDocID = userDocID;
        })

        .addCase(userUnset.fulfilled, (state) => {
          state.status = 'resolved';
          state.name = null;
          state.surname = null;
          state.email = null;
          state.token = null;
          state.id = null;
          state.favorites = [];
          state.userDocID = null;
        })

        .addCase(updateUserFavItems.fulfilled, (state, action) => {
          state.status = 'resolved';
          state.favorites = action.payload.favorites;
        })

        .addMatcher(isRejected, (state, action: PayloadAction<string>) => {
          state.status = 'rejected';
          state.error = action.payload;
        })
        .addMatcher(isPending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
    },

  reducers: {},
});

export default userSlice.reducer;