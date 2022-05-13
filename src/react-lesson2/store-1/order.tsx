import { makeObservable, observable, computed, action } from 'mobx';
import { IRootstore, IFormData, IData } from '../interface';

export default class {
  rootStore: IRootstore;

  constructor(rootStore: IRootstore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable formData: IFormData = {
    name: {
      value: '',
      label: 'Name',
      validator: val => /^[aA-zZ ]{2,}$/.test(val),
      errorText: 'Латинские символы, не менее двух',
      valid: null
    },
    phone: {
      value: '',
      label: 'Phone',
      validator: val => /^[0-9]{7,15}$/.test(val),
      errorText: 'От 7 до 15 цифр',
      valid: null
    },
    email: {
      value: '',
      label: 'Email',
      validator: val => /^.+@.+$/.test(val),
      errorText: 'Собака',
      valid: null
    }
  }
  lastOrderCache: any = {
    name: '',
    phone: '',
    email: ''
  }

  setLastOrderCache = () => {
    this.lastOrderCache.name = this.formData.name.value;
    this.lastOrderCache.phone = this.formData.phone.value;
    this.lastOrderCache.email = this.formData.email.value;
  }

  @computed get formValid() {
    return Object.values(this.formData).every(field => field.valid);
  }

  @computed get data() {
    let data: IData = {};

    for (let name in this.formData) {
      data[name] = this.formData[name].value;
    }

    return data;
  }

  @action change(key: string, value: string) {
    let field = this.formData[key];
    field.value = value;
    field.valid = field.validator(field.value);
  }

}







