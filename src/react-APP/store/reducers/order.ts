
let initialState: {
  formData: any,
  lastOrderCache: any,
  formValid: boolean,
  cartItemsDetailed: any
} = {
  formValid: false,
  cartItemsDetailed: [],
  lastOrderCache: {
    name: '',
    phone: '',
    email: ''
  },
  formData: {
    name: {
      value: '',
      label: 'Name',
      validator: (val: any) => /^[aA-zZ ]{2,}$/.test(val),
      errorText: 'Латинские символы, не менее двух',
      valid: null
    },
    phone: {
      value: '',
      label: 'Phone',
      validator: (val: any) => /^[0-9]{7,15}$/.test(val),
      errorText: 'От 7 до 15 цифр',
      valid: null
    },
    email: {
      value: '',
      label: 'Email',
      validator: (val: any) => /^.+@.+$/.test(val),
      errorText: 'Собака',
      valid: null
    }
  }
};


function change(state: any, name: any, value: any) {
  const formData = { ...state.formData };
  const field = formData[name];
  field.value = value;
  field.valid = field.validator(field.value);
  const formValid = Object.values(formData).every((field: any) => field.valid);
  return { ...state, formData, formValid };
}


function setLastOrderCache(state: any) {
  console.log('setLastOrderCache');

  let lastOrderCache = { ...state.lastOrderCache };

  lastOrderCache.name = state.formData.name.value;
  lastOrderCache.phone = state.formData.phone.value;
  lastOrderCache.email = state.formData.email.value;
  return { ...state, lastOrderCache };
}


function setDetailed(state: any = initialState, cartItemsDetailed: any) {
  console.log('SET DETAILED');
  return { ...state, cartItemsDetailed };
}



const reducer = function (state: any = initialState, action: any) {
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

