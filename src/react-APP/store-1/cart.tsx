import { makeObservable, observable, computed, action } from 'mobx';
import { IRootstore, ICartData, IProduct } from '~/interface.d';

export default class {
  rootStore: IRootstore;
  api: any;
  token: string;
  storage: Storage;
  //products: IProduct[];
  constructor(rootStore: IRootstore) {
    this.rootStore = rootStore;
    this.storage = this.rootStore.storage;
    this.api = this.rootStore.api.cart;
    this.token = this.storage.getItem('cartToken');
    makeObservable(this);
  }


  @observable products: { [id: string]: number }[] = []

  @computed get productsDetailed() {
    return this.products.map((pr) => {
      let product = this.rootStore.products.getById(pr.id);
      return { ...product, cnt: pr.cnt };
    });
  }

  @computed get inCart() {
    return (id: number) => this.products.some((product) => product.id === id);
  }

  @computed get total() {
    return this.productsDetailed.reduce((t, pr) => {
      return t + pr.price * pr.cnt;
    }, 0);
  }

  @computed get totalItems() {
    return this.productsDetailed.reduce((t, pr) => {
      return t + pr.cnt;
    }, 0);
  }

  // @action add(id: number) {
  //   this.products.push({ id, cnt: 1 });
  // }


  @action add(id: number) {
    return new Promise((resolve) => {
      this.api.add(this.token, id).then((res: any) => {
        if (res) {
          this.products.push({ id, cnt: 1 });
        }
      });
      resolve(true);
    });
  }

  @action change(id: number, cnt: number) {
    return new Promise((resolve) => {
      let index = this.products.findIndex((pr) => pr.id === id);
      if (index !== -1) {
        this.api.change(this.token, id, cnt).then((res: boolean) => {
          if (res) {
            this.products[index].cnt = cnt;
          }
        });
      }
      resolve(true);
    });
  }

  @action remove(id: number) {
    return new Promise((resolve) => {
      let index = this.products.findIndex((pr) => pr.id === id);

      if (index !== -1) {
        this.api.remove(this.token, id).then((res: boolean) => {
          if (res) {
            this.products.splice(index, 1);
          }
        });
      }
      resolve(true);
    });
  }


  @action load() {

    return new Promise((resolve) => {
      this.api.load(this.token).then((data: ICartData) => {

        this.products = data.cart;

        if (data.needUpdate) {
          this.token = data.token;
          this.storage.setItem('cartToken', this.token);
        }
      });
      resolve(true);
    });
  }


  @action clean() {
    return new Promise((resolve) => {
      this.api.clean(this.token).then((res: boolean) => {
        if (res) {
          this.products.splice(0, this.products.length);// очистка корзины
        }
      });
      resolve(true);
    });
  }

}













