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
  updateDoc,
} from "firebase/firestore";

import {
  ICartItemRaw,
  ICartAddItemArgs,
  IСartChangeItemArgs,
  ICartItem
} from '../../interface';

import db from '../../firebase';


export const cartAPI = {
  fetchCart: async function (user: string) {
    {
      const cart = await this.getCart(user);
      const cartItems: ICartItem[] = [];
      if (cart.length) {
        const itemsObj = cart[0].items;
        for (let key in itemsObj) {
          cartItems.push({ [key]: itemsObj[key] });
        }
      }
      return cartItems;
    }
  },

  getCart: async (user: string) => {
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
  },

  addCartItem: async function (data: ICartAddItemArgs, getState: Function) {
    const { user, pizzaItem } = data;
    const cart = await this.getCart(user);
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
    const newCart: Array<ICartItem> = Array.from(getState().cart.cartItems);
    newCart.push({ [pizzaItem]: 1 });
    return newCart;
  },

  changeCartItem: async function (data: IСartChangeItemArgs, getState: Function ) {
    const { user, pizzaItem, cnt } = data;
    const cart = await this.getCart(user);
    const docRef = doc(db, "cart", cart[0].id);
    await getDoc(docRef);
    await setDoc(docRef,
      {
        items: { [pizzaItem]: cnt }
      },
      { merge: true }
    )

    const currentCart: Array<ICartItem> = Array.from(getState().cart.cartItems);

    const newCart = currentCart.map(
      (element: ICartItem) => {
        if (pizzaItem in element) {
          element = { [pizzaItem]: cnt }
        }
        return element;
      });

    return newCart;
  },

  removeCartItem: async function (data: ICartAddItemArgs, getState: Function) {
    const { user, pizzaItem } = data;
    const cart = await this.getCart(user);
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

    const currentCart: Array<ICartItem> = Array.from(getState().cart.cartItems);
    const newCart = currentCart.filter(
      (el: ICartItem) => {
        return !(pizzaItem in el);
      });
    return newCart;
  },

  clearCart: async function (user: string) {
    const cart = await this.getCart(user);
    const docRef = doc(db, "cart", cart[0].id);
    await getDoc(docRef);
    await updateDoc(docRef, { items: {} });

    return [];

  }
}

export default cartAPI;


