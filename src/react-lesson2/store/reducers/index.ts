import { combineReducers } from 'redux';
import order from './order';
import cart from './cart';
import productItems from './products';
import user from './user';
import pizzaItems from './pizzaItems';

/*это то же самое, что RootStore в mobx*/
export default combineReducers({ cart, productItems, order, user, pizzaItems });