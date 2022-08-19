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
      validator: (val) => /^[aA-zZ ]{2,}$/.test(val),
      errorText: 'Латинские символы, не менее двух',
      valid: null
    },
    phone: {
      value: '',
      label: 'Phone',
      validator: (val) => /^[0-9]{7,15}$/.test(val),
      errorText: 'От 7 до 15 цифр',
      valid: null
    },
    email: {
      value: '',
      label: 'Email',
      validator: (val) => /^.+@.+$/.test(val),
      errorText: 'Собака',
      valid: null
    }
  }
};


function change(state: typeof initialState, name: string, value: string) {

  const valid = state.formData[name].validator(value)
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
  console.log('action>>>', action);
  switch (action.type) {
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

