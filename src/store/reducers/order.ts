import { IFormData, ILastOrderCache, IPizzaDetails, IField, IPizzaDetailsPartial, IOrderActions } from '../../interface';


let initialState: {
  formData: IFormData,
  lastOrderCache: ILastOrderCache,
  formValid: boolean,
  orderItemsDetailed: Array<IPizzaDetails>
} = {
  formValid: false,
  orderItemsDetailed: [],
  lastOrderCache: {
    name: '',
    phone: '',
    email: ''
  },
  formData: {
    name: {
      value: '',
      label: 'Name',
      validator: '^[aA-zZ ]{2,}$',
      errorText: 'Латинские символы, не менее двух',
      valid: null
    },
    phone: {
      value: '',
      label: 'Phone',
      validator: '^[0-9]{7,15}$',
      errorText: 'От 7 до 15 цифр',
      valid: null
    },
    email: {
      value: '',
      label: 'Email',
      validator: '^.+@.+$',
      errorText: 'Собака',
      valid: null
    }
  }
};

function setUser(state: typeof initialState, name: string, email: string) {
  console.log('!!!setUser!!!');

  const newName = { ...state.formData.name, name };
  const newEmail = { ...state.formData.email, email };
  const formData = { ...state.formData, name: newName, email: newEmail };
  return { ...state, formData };
}


function change(state: typeof initialState, name: string, value: string) {
  /*это не оптимальный способ валидации. Ранее в объекте стейта хранилась функция в поле validator 
  (вида validator: (val) => /^.+@.+$/.test(val)),
  соответственно, не нужно было каждый раз создавать регулярное выражение и функцию.
  Но т.к. функция и рег. выражения являются несереализуемыми, то редакс выбрасывает предупреждение о том, что в стейте хранится 
  несереализуемое значение*/
  const validator = new RegExp(state.formData[name].validator);
  const fun = (val: string) => validator.test(val);
  const valid = fun(value);
  const newField = { ...state.formData[name], value, valid };
  const formData = { ...state.formData, [name]: newField };
  const formValid = Object.values(formData).every((field: IField) => {
    return field.valid
  });
  return { ...state, formData, formValid };
}

function setLastOrderCache(state: typeof initialState) {

  let lastOrderCache = { ...state.lastOrderCache };
  lastOrderCache.name = state.formData.name.value;
  lastOrderCache.phone = state.formData.phone.value;
  lastOrderCache.email = state.formData.email.value;
  return { ...state, lastOrderCache };
}


function setDetailed(state = initialState, orderItemsDetailed: Array<IPizzaDetailsPartial>) {
  return { ...state, orderItemsDetailed };
}



const reducer = function (state = initialState, action: IOrderActions) {
  switch (action.type) {
    case 'ORDER_SET_USER':
      return setUser(state, action.name, action.email);
    case 'ORDER_CHANGE':
      return change(state, action.name, action.value);
    case 'ORDER_SET_CACHE':
      return setLastOrderCache(state);
    case 'ORDER_SET_DETAILED':
      return setDetailed(state, action.items);
    default:
      return state;
  }
};

export default reducer;

