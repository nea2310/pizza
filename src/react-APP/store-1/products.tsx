import { makeObservable, observable, computed, action } from 'mobx';
import { IRootstore } from '../interface';
import { IProduct } from '~/interface.d';

export default class {
  rootStore: IRootstore;
  api: any;

  constructor(rootStore: IRootstore) {

    this.rootStore = rootStore;
    this.api = this.rootStore.api.products;
    makeObservable(this);


  }

  @observable items: IProduct[] = [];


  @computed get productsMap() {
    let map: { [id: string]: number } = {};
    this.items.forEach((pr, i) => {
      map[pr.id.toString()] = i;
    });
    return map;
  }

  getById(id: number) {
    let index = this.productsMap[id];
    if (index === undefined) {
      return null;
    }

    return this.items[index];
  }


  @action load() {

    return new Promise((resolve) => {
      this.api.all().then((data: IProduct[]) => {

        this.items = data;
        resolve(true);
      });
    });
  }
}





