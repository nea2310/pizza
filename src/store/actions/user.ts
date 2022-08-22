import { Dispatch } from 'react';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, onAuthStateChanged
} from "firebase/auth";

import { getAuth } from "firebase/auth";
import { firebaseApp } from './../../firebase';
import {
  collection, addDoc, getDocs, setDoc, doc,
  query, where, getDoc, DocumentData
} from "firebase/firestore";
import db from './../../firebase'; // авторизационные данные Firebase


import { cartFetchData } from './cart';

import { orderSetUser } from './order';

import {
  IUserSetSuccess, IUserData,
  IUserUnsetSuccess,
  IUserAddFavItemSuccess,
  IUserDataToUpdate,
  TDispatch,
  IUserRegData
} from
  './../../interface';

firebaseApp;
const authdata = getAuth();



export function userSetSuccess(data: IUserData): IUserSetSuccess {
  return {
    type: 'USER_SET',
    payload: {
      ...data
    }

  };
}

export function userUnsetSuccess(): IUserUnsetSuccess {
  return {
    type: 'USER_UNSET',
  };
}


function updateDocByUserID(userDataToUpdate: IUserDataToUpdate) {
  const { email, token, id, dispatch } = userDataToUpdate;
  const q =
    query(collection(db, "users"), where("id", "==", id));
  return getDocs(q)
    .then((user) => {
      /*получаем пользователя по ключу uid, поэтому запись может быть только одна*/
      const doc = user.docs[0];
      return { ...doc.data(), userDocID: doc.id } as IUserData;
    })
    .then((userRec) => {
      dispatch(cartFetchData(userRec.userDocID));
      dispatch(orderSetUser('emailFromDB', 'emailFromDB'));
      //вызываем action для обновления стейта
      return dispatch(userSetSuccess({
        name: userRec.name,
        surname: userRec.surname,
        email,
        token,
        id,
        userDocID: userRec.userDocID,
        favourites: userRec.favourites
      }
      ));
    });
}


/*Получить залогиненного пользователя*/
export function userFetch() {
  return (
    // eslint-disable-next-line max-len
    dispatch: TDispatch) => {
    /*проверяем, залогинен ли пользователь*/
    onAuthStateChanged(authdata, (user) => {
      /*если залогинен - получаем его данные из таблицы users c помощью API getDocs*/
      if (user) {
        const emailFromDB = user.email ? user.email : '';
        updateDocByUserID(
          {
            email: emailFromDB,
            token: user.refreshToken,
            id: user.uid,
            dispatch
          }
        );
      } else {
        return;
      }
    });
  };
}


/*зарегистрироваться новому пользователю*/
export function userReg(
  data: IUserRegData,
) {
  return (dispatch: Dispatch<IUserSetSuccess>) => {

    // вызываем API Firebase - вносим запись в Authentication
    createUserWithEmailAndPassword(authdata, data.email, data.pass) // регистрируем пользователя
      .then(
        ({ user }) => {
          const userRec = {
            name: data.name,
            surname: data.surname,
            email: data.email,
            token: user.refreshToken,
            id: user.uid,
          };
          /*добавляем пользователя в таблицу users*/
          addDoc(collection(db, "users"), userRec)
            .then((doc) => {
              dispatch(userSetSuccess({
                ...userRec,
                userDocID: doc.id
              }
              ));
            }
            );
        }
      )
      .catch(console.error);
  };
}


/*залогиниться существующему пользователю*/
export function userSet(email: string, password: string) {
  return (
    // eslint-disable-next-line max-len
    dispatch: TDispatch) => {
    signInWithEmailAndPassword(authdata, email, password)
      .then(({ user }) => {
        const emailFromDB = user.email ? user.email : '';
        updateDocByUserID({
          email: emailFromDB,
          token: user.refreshToken,
          id: user.uid,
          dispatch
        });
      }
      )
      .catch(console.error);
  };
}

/*разлогиниться существующему пользователю*/
export function userUnset() {
  return (dispatch: Dispatch<IUserUnsetSuccess>) => {
    return signOut(authdata).then(() => {
      // вызываем API Firebase
      dispatch(userUnsetSuccess());
    }).catch(() => {
      alert('Invalid user');
    });
  };
}


export function userAddFavItemSuccess(favourites: Array<string>):
  IUserAddFavItemSuccess {
  return {
    type: 'USER_ADD_FAV',
    payload: { favourites },
  };

}




/*обновить избранное*/
export function userUpdateFavItems(
  user: string,
  pizzaItem: string,
  isAdding: boolean) {
  // eslint-disable-next-line max-len
  console.log(`Пользователь ${user} обновляет купон с ID ${pizzaItem}`);
  const userRef = doc(db, 'users', user);
  return (dispatch: Dispatch<IUserAddFavItemSuccess>) => {

    const docRef = doc(db, "users", user);
    getDoc(docRef)
      .then((res) => {
        const data = res.data() as DocumentData;
        let favourites = data.favourites;
        /*Если добавляем в  избранное*/
        if (isAdding) {
          if (favourites) {
            favourites.push(pizzaItem);
          } else {
            favourites = [pizzaItem];
          }
        }
        /*Если удаляем из избранного*/
        else {
          console.log('УДАЛЯЕМ ИЗ ИЗБРАННОГО');


          const id = favourites.indexOf(String(pizzaItem), 0);
          favourites.splice(id, 1);
        }


        return favourites;
      })
      .then((favourites) => setDoc(userRef,
        { favourites: favourites }, { merge: true })
        .then(() => dispatch(userAddFavItemSuccess(favourites)))
        .catch(console.error));
  };
}


/*отобразить данные пользователя*/
export function userGetData() {
  // return (dispatch: Dispatch<IUserGetDataSuccess>) => {

  // };
}















