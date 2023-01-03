import orderReducer, {
  orderSetUser,
  orderChangeField,
  orderSetLastOrderCache,
  orderItemsDetailed
} from "../slices/orderSlice";

const initialState = {
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
      validator: '^[a-zA-ZА-Яа-яёЁ ]{2,}$',
      errorText: 'Русские или латинские символы, не менее двух',
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
  },
  status: null,
  error: null
};

describe('orderSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = orderReducer(undefined, { type: '' });
    expect(result).toEqual(initialState)
  })

  it('should set user by "orderSetUser" action', () => {
    const action = { type: orderSetUser.type, payload: { name: 'Name', email: 'Email' } };
    const result = orderReducer(initialState, action);
    expect(result.formData.name.value).toBe('Name');
    expect(result.formData.email.value).toBe('Email')
    expect(result.formData.name.valid).toBe(true);
    expect(result.formData.email.valid).toBe(true)
  })

  it('should change field by "orderChangeField" action. Incorrect name format', () => {
    const action = { type: orderChangeField.type, payload: { name: 'name', value: '123' } };
    const result = orderReducer(initialState, action);
    expect(result.formData.name.value).toBe('123')
    expect(result.formData.name.valid).toBe(false);
  })

  it('should change field by "orderChangeField" action. Incorrect phone format', () => {
    const action = { type: orderChangeField.type, payload: { name: 'phone', value: '123' } };
    const result = orderReducer(initialState, action);
    expect(result.formData.phone.value).toBe('123')
    expect(result.formData.phone.valid).toBe(false);
  })

  it('should change field by "orderChangeField" action. Incorrect email format', () => {
    const action = { type: orderChangeField.type, payload: { name: 'email', value: '123' } };
    const result = orderReducer(initialState, action);
    expect(result.formData.email.value).toBe('123')
    expect(result.formData.email.valid).toBe(false);
  })

  it('should change field by "orderChangeField" action. Correct name format', () => {
    const action = { type: orderChangeField.type, payload: { name: 'name', value: 'Name' } };
    const result = orderReducer(initialState, action);
    expect(result.formData.name.value).toBe('Name')
    expect(result.formData.name.valid).toBe(true);
  })

  it('should change field by "orderChangeField" action. Correct phone format', () => {
    const action = { type: orderChangeField.type, payload: { name: 'phone', value: '1234567' } };
    const result = orderReducer(initialState, action);
    expect(result.formData.phone.value).toBe('1234567')
    expect(result.formData.phone.valid).toBe(true);
  })

  it('should change field by "orderChangeField" action. Correct email format', () => {
    const action = { type: orderChangeField.type, payload: { name: 'email', value: '6@mail.ru' } };
    const result = orderReducer(initialState, action);
    expect(result.formData.email.value).toBe('6@mail.ru')
    expect(result.formData.email.valid).toBe(true);
  })


  it('should change field by "orderChangeField" action. Correct email format', () => {
    const action = { type: orderChangeField.type, payload: { name: 'email', value: '6@mail.ru' } };
    const result = orderReducer(initialState, action);
    expect(result.formData.email.value).toBe('6@mail.ru')
    expect(result.formData.email.valid).toBe(true);
  })


  it('should set cache by "orderSetLastOrderCache" action', () => {
    const action = { type: orderSetLastOrderCache.type };
    const result = orderReducer({
      ...initialState, formData: {
        name: {
          value: 'Name',
          label: 'Имя',
          validator: '^[a-zA-ZА-Яа-яёЁ ]{2,}$',
          errorText: 'Русские или латинские символы, не менее двух',
          valid: true
        },
        phone: {
          value: '1234567',
          label: 'Телефон',
          validator: '^[0-9]{7,15}$',
          errorText: 'От 7 до 15 цифр',
          valid: true
        },
        email: {
          value: 'email@email.ru',
          label: 'Email',
          validator: '^.+@.+$',
          errorText: 'Собака',
          valid: true
        }
      },
    }, action);
    expect(result.lastOrderCache.name).toBe('Name');
    expect(result.lastOrderCache.phone).toBe('1234567')
    expect(result.lastOrderCache.email).toBe('email@email.ru')
  })

  it('should set order details by "orderItemsDetailed" action', () => {
    const items = ['']
    const action = { type: orderItemsDetailed.type, payload: items };
    const result = orderReducer(initialState, action);
    expect(result.orderItemsDetailed[0]).toBe('')
  })
})
