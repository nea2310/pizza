
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

export interface ICartItem {
  [key: string]: number
}

export interface ICartItemRaw {
  user: string;
  id: string;
  items: ICartItem
}

export interface IAppLazyInputRef {
  setValue(val: string): void;
}

export interface IAppLazyInputProps {
  nativeProps: { type: string, name?: string, className: string },
  value: number | string;
  onChange: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref: IAppLazyInputRef;
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
  validator: string;
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

export interface IPizzaDetailsExtended extends Omit<IPizzaDetails, 'available'> { cnt: number; available?: boolean | undefined }
export type IPizzaDetailsPartial = Partial<IPizzaDetailsExtended>

export interface IFormData {
  email: IField;
  name: IField;
  phone: IField;
  [index: string]: IField;
}

export interface ILastOrderCache {
  email: string;
  name: string;
  phone: string;
}

export type TConst = { state: { total: number } };


/****************типы для cartSlice***********************/

interface ICartState {
  cartItems: ICartItem[],
  total: number,
  status: string | null,
  error: string | null
}

interface ICartAddItemArgs {
  user: string;
  pizzaItem: string;
}


interface IСartChangeItemArgs {
  user: string;
  pizzaItem: string;
  cnt: number;
}

/****************типы для orderSlice***********************/

interface IOrderState {
  formValid: boolean,
  orderItemsDetailed: Array<IPizzaDetailsPartial>,
  lastOrderCache: ILastOrderCache,
  formData: IFormData,
  status: string | null,
  error: string | null
}

/****************типы для pizzaItemsSlice***********************/

interface IPizzaItemsState {
  data: {
    pizzaItemsAll: IPizzaItem[],
    ingredientsAll: string[],
    pizzaItemsFiltered: IPizzaItem[],
    ingredientsSelected: string[],
    currentQuery: string,
    lentSelected: string,
    spicySelected: string,
  },
  status: string | null,
  error: string | null
}

interface IFetchPizzaItemsReturn {
  pizzaItemsAll: IPizzaItem[],
  pizzaItemsFiltered: IPizzaItem[],
  ingredientsAll: string[]
}

interface IFilterPizzaItemsArgs {
  ingredientsAll: string[],
  pizzaItemsAll: IPizzaItem[],
  ingredientsSelected: string[],
  currentQuery: string
  lentSelected: string,
  spicySelected: string,
}

interface IFilterPizzaItemsReturn {
  pizzaItemsFiltered: IPizzaItem[],
  filterSpicy: boolean,
  filterLent: boolean,
  ingredientsSelected: string[],
  currentQuery: string,
}

interface IFilterData {
  key: string,
  operator: WhereFilterOp,
  value: string[] | boolean,
  errorMessage: string
}

/****************типы для userSlice***********************/

interface IUserDataToUpdate {
  email: string;
  token: string;
  id: string;
}

interface IUserData {
  email: string;
  token: string;
  id: string;
  name: string;
  surname: string;
  userDocID: string;
  favorites: string[] | [];
}

interface IUserRegArgs {
  email: string;
  password: string;
  name: string;
  surname: string;
}

interface IUserRegReturn {
  name: string;
  surname: string;
  email: string;
  token: string;
  id: string;
  favorites: string[] | [];
  userDocID: string
}

interface IUserSetArgs {
  email: string;
  password: string;
}

interface IUserUpdateFavItemsArgs {
  user: string;
  pizzaItem: string;
  isAdding: boolean;
}

interface IUserState {
  email: string | null,
  token: string | null,
  id: string | null,
  name: string | null,
  surname: string | null,
  userDocID: string | null,
  favorites: string[] | [];
  status: string | null,
  error: string | null
}


export interface AppState {
  pizzaItems: IPizzaItemsState,
  user: IUserState,
  cart: ICartState,
  order: IOrderState
}

