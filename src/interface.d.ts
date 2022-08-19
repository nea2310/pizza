import React, { Dispatch } from 'react';



/******************PIZZAITEMS ACTIONS******************/

export type IPizzaItemsActions =
  IPizzaItemsFetchDataSuccess | IPizzaItemsFilterSuccess;


export interface IPizzaItemsFetchDataSuccess {
  type: 'PIZZAITEMS_FETCH_DATA_SUCCESS';
  pizzaItems: Array<IPizzaItem>;
}




export interface IPizzaItemsFilterSuccess {
  type: 'PIZZAITEMS_FILTER';
  payload: {
    spicyChosen: string;
    lentChosen: string;
    ingredientsChosen: Array<string>;
    currentQuery: string;
    pizzaItemsFiltered: Array<IPizzaItem>;
  }
}


export interface IPizzaItem {
  available: boolean;
  id: string;
  image: string;
  ingredients: Array<string>;
  lent: boolean;
  meat: boolean;
  name: string;
  price: number;
  spicy: boolean;
}



export interface IFilterData {
  currentQuery: string;
  ingredientsAll: Array<string>;
  ingredientsChosen: Array<string>;
  lentChosen: string;
  pizzaItemsAll: Array<IPizzaItem>;
  spicyChosen: string;
}


/******************PIZZAITEMS REDUCERS******************/
export interface IPizzaItemsState {
  pizzaItemsAll: Array<IPizzaItem>;
  pizzaItemsFiltered: Array<IPizzaItem>;
  ingredientsChosen: Array<string>;
  ingredientsAll: Array<string>;
  currentQuery: string;
  filterSpicy?: boolean;
  filterLent?: boolean;
  spicyChosen?: boolean;
}


/******************CART ACTIONS******************/

export type ICartActions =
  ICartFetchDataSuccess |
  ICartAddDataSuccess |
  ICartChangeItemSuccess |
  ICartRemoveItemSuccess;


export interface ICartFetchDataSuccess {
  type: 'CART_FETCH_DATA_SUCCESS';
  cartItems: Array<ICartItem>;
}

export interface ICartAddDataSuccess {
  type: 'CART_ADD_ITEM';
  id: string;
}


export interface ICartChangeItemSuccess {
  type: 'CART_CHANGE_CNT';
  id: string;
  cnt: number;
}


export interface ICartRemoveItemSuccess {
  type: 'CART_REMOVE_ITEM';
  id: string;
}
export interface ICartItem {
  [key: string]: number
}

export interface ICartItemRaw {
  user: string;
  id: string;
  items: ICartItem
}

export type ICartItemsRaw = ICartItemRaw[] | [];




/******************USER ACTIONS******************/

export type TDispatch = Dispatch<IUserSetSuccess |
  ((dispatch: Dispatch<ICartFetchDataSuccess>) => void)>

export type IUserActions =
  IUserSetSuccess |
  IUserUnsetSuccess |
  IUserAddFavItemSuccess;


export interface IUserSetSuccess {
  type: 'USER_SET';
  payload: IUserData
}

export interface IUserUnsetSuccess {
  type: 'USER_UNSET';
}



export interface IUserAddFavItemSuccess {
  type: 'USER_ADD_FAV';
  payload: {
    favourites: Array<string>;
  }
}

export interface IUserRegData {
  email: string;
  pass: string;
  name: string;
  surname: string
}

export interface IUserData {

  email: string;
  token: string;
  id: string;
  name: string;
  surname: string;
  userDocID: string;
  favourites?: Array<string>;

}


export interface IUserDataToUpdate {
  email: string;
  token: string;
  id: string;
  dispatch: TDispatch;
}






export interface IAppLazyInputRef {
  setValue(val: string): void;
}

export interface IAppLazyInputProps {
  nativeProps: { type: string, name?: string, className: string },
  value: number | string,
  onChange: (e: React.FocusEvent<HTMLInputElement>) => void,
  ref: any
}


export interface IAppMinMaxProps {
  min: number
  max: number
  cnt: number
  onChange: (cnt: number) => Dispatch;
}

interface IField {
  errorText: string;
  label: string;
  valid: boolean | null;
  validator: (val: string) => boolean;
  value: string;
}

export interface IPizzaDetails {
  available: boolean;
  id: string;
  image: string;
  ingredients: Array<string>;
  lent: boolean;
  meat: boolean;
  name: string;
  price: number;
  spicy: boolean;
}

export interface IStore {

  cart: {
    cartItems: Array<{ [name: string]: number }>;
    total: number
  }
  order: {
    formValid: boolean,
    cartItemsDetailed: Array<any>,
    lastOrderCache: {
      email: string;
      name: string;
      phone: string;
    },
    formData: {
      email: IField;
      name: IField;
      phone: IField;
    }
  }
  pizzaItems: {
    pizzaItemsAll: Array<IPizzaDetails>;
    pizzaItemsFiltered: Array<IPizzaDetails>;
    ingredientsChosen: Array<string>;
    ingredientsAll: Array<string>;
    currentQuery: string;
  }
  productItems: any;
  user: {
    user: {
      email: string;
      favourites: Array<string>;
      id: string;
      name: string;
      surname: string;
      token: string;
      userDocID: string;
    }
  }

}




export interface IData {
  [key: string]: {
    value: string;
  } | {}
}

export interface IFormData { // почему это работает???
  [key: string]: {
    label: string;
    value: string;
    validator: (val: string) => boolean; // почему val считается неиспользуемой переменной?
    errorText: string;
    valid: null | boolean;
  }
}

export interface IProps {
  products?: any,
  stores?: {
    cart: ICart,
    order: IOrder,
    products: IProducts,
  }
}

export interface IOrder {
  formData: IFormData;
  change: Function;
  formValid: boolean;
  data: IData;
  setLastOrderCache: Function;
}

export interface IProduct {
  id: number;
  name?: string;
  price: number;
  cnt?: number;
  rest: number;
  title?: string;
}

export interface ICart { // надо ли описывать все поля в cart, products и order?
  productsDetailed: Array;
  change: Function;
  remove: Function;
  total: number;
  totalItems: number;
  inCart: Function;
  add: Function;
  clean: Function;
}

export interface IProducts { // надо ли описывать все поля в cart, products и order?
  getById: Function;
  items: Array;
}

export interface IRootstore {
  cart: ICart;
  products: IProducts;
  order: IOrder;
  api: any;
  storage: Storage;
}

export interface ICartData {
  cart: { [id: string]: number }[];
  needUpdate: boolean;
  token: string;

}

export type TConst = { state: { total: number } };