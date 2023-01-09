import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { getAuth } from "firebase/auth";
import { firebaseApp } from './../../firebase';
import {
  IUserState,
  IUserDataToUpdate,
  IUserRegArgs,
  IUserRegReturn,
  IUserSetArgs,
  IUserUpdateFavItemsArgs
} from './../../interface';
import capitalize from '../../shared/helpers/capitalize';
import { userAPI } from '../API/userAPI';

firebaseApp;

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

/*Получить залогиненного пользователя*/
export const fetchUser = createAsyncThunk<void, undefined, { rejectValue: string }>(
  `${NAMESPACE}/fetch${capitalize(NAMESPACE)}`,
  (_, { dispatch }) => userAPI.fetchUser( dispatch )
  )

/*Обновить данные пользователя в стейте*/
export const updateUser = createAsyncThunk<IUserRegReturn, IUserDataToUpdate>(
  `${NAMESPACE}/update${capitalize(NAMESPACE)}`,
  (userDataToUpdate, { dispatch }) => userAPI.updateUser( userDataToUpdate, dispatch )
)

/*Зарегистрироваться новому пользователю*/
export const registerUser = createAsyncThunk<IUserRegReturn, IUserRegArgs>(
  `${NAMESPACE}/register${capitalize(NAMESPACE)}`,
  (data) => userAPI.registerUser(data)
)

/*Залогиниться существующему пользователю*/
export const setUser = createAsyncThunk<undefined, IUserSetArgs>(
  `${NAMESPACE}/set${capitalize(NAMESPACE)}`,
  (data, { dispatch }) => userAPI.setUser(data, dispatch)
)

/*обновить избранное*/
export const updateUserFavItems = createAsyncThunk<{ favorites: string[] }, IUserUpdateFavItemsArgs>(
  `${NAMESPACE}/update${capitalize(NAMESPACE)}FavItems`,
  (data) => userAPI.updateUserFavItems(data)
)

/*Разлогиниться существующему пользователю*/
export const userUnset = createAsyncThunk<undefined, undefined, { state: { user: IUserState } }>(
  `${NAMESPACE}/unset${capitalize(NAMESPACE)}`,
  (_, { getState, dispatch }) => userAPI.userUnset(getState, dispatch)
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