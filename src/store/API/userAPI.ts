import { updateUser } from '../../store/slices/userSlice';
import { orderSetUser } from '../../store/slices/orderSlice';
import { fetchCart, clearCart } from '../../store/slices/cartSlice';
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

import {
  IUserDataToUpdate,
  IUserData,
  IUserRegArgs,
  IUserSetArgs,
  IUserUpdateFavItemsArgs,
} from '../../interface';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged
} from "firebase/auth";

const authdata = getAuth();
import db from '../../firebase';

export const userAPI = {
  fetchUser: async function (dispatch: Function) {
    onAuthStateChanged(authdata, async (user) => {
      if (user) {
        const emailFromDB = user.email ? user.email : '';
          dispatch(updateUser({ 
          email: emailFromDB,
          token: user.refreshToken,
          id: user.uid,
        }))
      }
    })
  },

  updateUser: async function (userDataToUpdate: IUserDataToUpdate, dispatch: Function | undefined) {
    const { email, token, id } = userDataToUpdate;
    const q =
      query(collection(db, "users"), where("id", "==", id));
    const user = await getDocs(q);
    /*получаем пользователя по ключу uid, поэтому запись может быть только одна*/
    const doc = user.docs[0];
    const userRec = { ...doc.data(), userDocID: doc.id } as IUserData;
    if(dispatch) {
      dispatch(fetchCart(userRec.userDocID));
      dispatch(orderSetUser({ name: userRec.name, email: userRec.email }));
    }
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
  },

  registerUser: async function (data: IUserRegArgs) {
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
  },

  setUser: async function (data: IUserSetArgs, dispatch: Function | undefined) {
        // вызываем API Firebase - вносим запись в Authentication
        const { user } = await signInWithEmailAndPassword(authdata, data.email, data.password) // регистрируем пользователя
        const emailFromDB = user.email ? user.email : '';
    
        const { refreshToken, uid } = user;
        if(!dispatch) return undefined;
        dispatch(updateUser({
          email: emailFromDB,
          token: refreshToken,
          id: uid,
        }))
        return undefined;
  },

  updateUserFavItems: async function (data: IUserUpdateFavItemsArgs) {
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
  },

  userUnset: async function(getState: Function, dispatch: Function) {
    const user = getState().user.userDocID;
    await signOut(authdata);

    if (user) {
      dispatch(clearCart(user))
    }
    return undefined;
  }
}

export default userAPI;
