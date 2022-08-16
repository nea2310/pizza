import {
  ICartFetchDataSuccess,
  ICartAddDataSuccess,
  ICartChangeItemSuccess,
  ICartRemoveItemSuccess,
  ICartItemRaw,
  ICartItem
} from '~/interface';

import { Dispatch } from 'react';
import { getAuth } from "firebase/auth";
import { firebaseApp } from './../../firebase';
import {
  collection, addDoc, getDocs, setDoc, doc,
  query, where, getDoc, updateDoc
} from "firebase/firestore";
import db from './../../firebase';
firebaseApp;

export function cartFetchDataSuccess(cartItems: Array<ICartItem>):
  ICartFetchDataSuccess {
  return {
    type: 'CART_FETCH_DATA_SUCCESS',
    cartItems
  };
}

export function cartAddItemSuccess(id: string):
  ICartAddDataSuccess {
  return {
    type: 'CART_ADD_ITEM',
    id
  };
}

export function cartChangeItemSuccess(id: string, cnt: number):
  ICartChangeItemSuccess {
  return {
    type: 'CART_CHANGE_CNT',
    id,
    cnt
  };
}

export function cartRemoveItemSuccess(id: string):
  ICartRemoveItemSuccess {
  return {
    type: 'CART_REMOVE_ITEM',
    id
  };
}

export function cartFetchData(user: string) {
  console.log(`Загружаем корзину пользователя ${user}`);
  return (dispatch: Dispatch<ICartFetchDataSuccess>): void => {
    getCart(user)
      .then(cart => {
        if (cart.length) {
          const cartItems = [];
          const itemsObj = cart[0].items;
          for (let key in itemsObj) {
            cartItems.push({ [key]: itemsObj[key] });
          }
          dispatch(cartFetchDataSuccess(cartItems));
        }
      });
  };
}


export function cartAddItem(user: string, pizzaItem: string) {
  // getState - второй параметр, который принимает thunk
  return (dispatch: Dispatch<ICartAddDataSuccess>): void => {
    console.log(`Пользователь ${user} 
    добавляет в корзину пиццу ID ${pizzaItem}`);
    getCart(user)
      .then(cart => {
        if (!cart.length) {//корзина НЕ существует
          // создать документ корзины и добавить туда пиццу
          console.log('Корзина НЕ существует>>>>');
          addDoc(collection(db, "cart"), {
            user,
            items: { [pizzaItem]: 1 }
          });
        } else {
          console.log('Корзина существует>>>>', cart);
          //  добавить пиццу в существующую корзину
          setDoc(doc(db, 'cart', cart[0].id),
            {
              items: { [pizzaItem]: 1 }
            },
            { merge: true }
          );
        }
        dispatch(cartAddItemSuccess(pizzaItem));
      });
  };
}




export function cartChangeItem(user: string, pizzaItem: string, cnt: number) {
  return (dispatch: Dispatch<ICartChangeItemSuccess>): void => {
    console.log(`Пользователь ${user} 
    изменяет количество пицц ${pizzaItem}`);
    getCart(user)
      .then(cart => {
        const docRef = doc(db, "cart", cart[0].id);
        getDoc(docRef)
          //обновить корзину
          .then(() => setDoc(docRef,
            {
              items: { [pizzaItem]: cnt }
            },
            { merge: true }
          ))
          //обновить стейт
          .then(() => dispatch(cartChangeItemSuccess(pizzaItem, cnt)))
          ;
      });
  };
}



export function cartRemoveItem(user: string, pizzaItem: string) {
  return (dispatch: Dispatch<ICartRemoveItemSuccess>): void => {
    console.log(`Пользователь ${user} 
    удаляет из корзины пиццу ID ${pizzaItem}`);
    getCart(user)
      .then(cart => {
        //  удалить пиццу из корзины
        const docRef = doc(db, "cart", cart[0].id);
        getDoc(docRef)
          .then((document) => {
            //получить текущие элементы корзины
            const obj = document.data().items;
            // убрать удаляемый элемент
            delete obj[pizzaItem];
            //обновить корзину
            updateDoc(docRef,
              {
                items: obj
              }
            );
          })
          //обновить стейт
          .then(() => dispatch(cartRemoveItemSuccess(pizzaItem)))
          ;
      });
  };
}





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





