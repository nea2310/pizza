import { ICartActions, ICartItem } from './../../interface';

let initialState: { cartItems: Array<ICartItem>, total: 0 } = {
  cartItems: [],
  total: 0,
};


function load(state = initialState, items: Array<ICartItem>) {
  console.log('LOADING CART');
  let cartItems = [...items];

  return { ...state, cartItems }; // cartItems - добавляем тот ключ в state, который хотим обновить
}

function add(state = initialState, id: string) {
  console.log('ADDING');
  {/*задублируем существующую корзину и запушим в нее добавленный товар*/
    let cartItems = [...state.cartItems];
    cartItems.push({ [id]: 1 });
    return { ...state, cartItems }; // cartItems - добавляем тот ключ в state, который хотим обновить
  }
}

function remove(state = initialState, id: string) {
  console.log('REMOVING');
  /*получим все элементы массива, кроме того, у которого ключ совпадает с id пиццы*/

  let cartItems = state.cartItems.filter(
    (el: ICartItem) => {
      return !(id in el);
    });
  /*state.cartItems = cartItems - так писать нельзя, в этом случае будет мутация ключа state */
  return { ...state, cartItems }; // cartItems - добавляем тот ключ в state, который хотим обновить

}


function change(state = initialState, id: string, cnt: number) {

  console.log('CHANGING');
  /*получаем новый массив всех продуктов, не мутируя текущий стейт*/
  let cartItems = state.cartItems.map(
    (el: ICartItem) => {
      if (id in el) {
        el = { [id]: cnt }
      }
      return el;
    });

  return { ...state, cartItems };
}

function unset(state = initialState) {

  console.log('UNSET');
  /*Обнуляем массив продуктов в корзине*/

  const cartItems: Array<ICartItem> = []
  return { ...state, cartItems };
}


const reducer = function (state = initialState, action: ICartActions) {
  switch (action.type) {
    case 'CART_FETCH_DATA_SUCCESS':
      return load(state, action.cartItems);
    case 'CART_ADD_ITEM':
      return add(state, action.id);
    case 'CART_REMOVE_ITEM':
      return remove(state, action.id);
    case 'CART_CHANGE_CNT':
      return change(state, action.id, action.cnt);
    case 'CART_UNSET':
      return unset(state);
    // case 'CART_CLEAR':
    //   return clear(state);
    default:
      return state;
  }
};

export default reducer;

