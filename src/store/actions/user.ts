import { Dispatch } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
// db - авторизационные данные Firebase
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
import { cartFetchData, cartUnsetSuccess } from './cart';
import { orderSetUser } from './order';
import {
  IUserSetSuccess, IUserData,
  IUserUnsetSuccess,
  IUserAddFavItemSuccess,
  IUserDataToUpdate,
  IUserRegData,
  ICartUnsetSuccess,
  TDispatchUnion
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

export function userAddFavItemSuccess(favourites: Array<string>):
  IUserAddFavItemSuccess {
  return {
    type: 'USER_ADD_FAV',
    payload: { favourites },
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
            favourites: [''],
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
  return (dispatch: TDispatchUnion) => {
    return signInWithEmailAndPassword(authdata, email, password)
      .then(({ user }) => {
        const emailFromDB = user.email ? user.email : '';
        updateDocByUserID({
          email: emailFromDB,
          token: user.refreshToken,
          id: user.uid,
          dispatch
        });
      })
      .catch(console.error);
  };
}

/*разлогиниться существующему пользователю*/
export function userUnset() {
  return (dispatch: Dispatch<IUserUnsetSuccess | ICartUnsetSuccess>) => {
    return signOut(authdata).then(() => {
      // вызываем API Firebase
      dispatch(userUnsetSuccess());
    })
      .then(() => dispatch(cartUnsetSuccess()))
      .catch(() => {
        alert('Invalid user');
      });
  };
}


/*Получить залогиненного пользователя*/
export function userFetch() {
  return (dispatch: TDispatchUnion) => {
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


/*обновить данные пользователя в стейте*/
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
      dispatch(orderSetUser(userRec.name, userRec.email));
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

/*обновить избранное*/
export function userUpdateFavItems(
  user: string,
  pizzaItem: string,
  isAdding: boolean) {
  console.log('isAdding>>>', isAdding);

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
          console.log('ДОБАВЛЯЕМ В ИЗБРАННОЕ');
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















