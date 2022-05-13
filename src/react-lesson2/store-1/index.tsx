import cartStore from './cart';
import productsStore from './products';
import orderStore from './order';

import * as products from '~/api/products';
import * as cart from '~/api/cart';

class RootStore {
  api: {
    products: Object;
    cart: Object;
  }

  cart: cartStore;
  products: productsStore;
  order: orderStore;
  storage: Storage;
  constructor() {

    this.api = {
      products,
      cart
    };
    this.storage = localStorage;

    this.cart = new cartStore(this);
    this.products = new productsStore(this);
    this.order = new orderStore(this);
  }
}

export default new RootStore();