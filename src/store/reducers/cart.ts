import { ICartActions } from './../../interface';


let initialState: { cartItems: any, total: 0 } = {
  cartItems: [],
  total: 0,
};


function load(state: any = initialState, items: any) {
  // localStorage.setItem('cartToken', token);
  console.log('LOADING CART');
  let cartItems = [...items];

  return { ...state, cartItems }; // cartItems - добавляем тот ключ в state, который хотим обновить
}

function add(state: any = initialState, id: any) {
  console.log('ADDING');
  {/*задублируем существующую корзину и запушим в нее добавленный товар*/
    let cartItems = [...state.cartItems];
    cartItems.push({ [id]: 1 });
    return { ...state, cartItems }; // cartItems - добавляем тот ключ в state, который хотим обновить
  }
}

function remove(state: any, id: any) {
  console.log('REMOVING');
  /*получим все элементы массива, кроме того, у которого ключ совпадает с id пиццы*/

  let cartItems = state.cartItems.filter(
    (el: any) => {
      return !(id in el);
    });
  /*state.cartItems = cartItems - так писать нельзя, в этом случае будет мутация ключа state */
  return { ...state, cartItems }; // cartItems - добавляем тот ключ в state, который хотим обновить

}

function change(state: any, id: any, cnt: any) {
  console.log('CHANGING');
  /*получаем новый массив всех продуктов, не мутируя текущий стейт*/
  let cartItems = state.cartItems.map(
    (el: any) => {
      if (id in el) {
        el[id] = cnt;
      }
      return el;
    });
  return { ...state, cartItems };
}

const reducer = function (state: any = initialState, action: ICartActions) {

  switch (action.type) {
    case 'CART_FETCH_DATA_SUCCESS':
      return load(state, action.cartItems);
    case 'CART_ADD_ITEM':
      return add(state, action.id);
    case 'CART_REMOVE_ITEM':
      return remove(state, action.id);
    case 'CART_CHANGE_CNT':
      return change(state, action.id, action.cnt);
    default:
      return state;
  }
};

export default reducer;

