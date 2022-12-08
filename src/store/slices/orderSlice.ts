import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IField,
  IPizzaDetailsPartial,
  IOrderState
} from '../../interface';

const initialState: IOrderState = {
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

const orderSlice = createSlice({
  name: 'order',
  initialState,

  reducers: {
    orderSetUser(state, action: PayloadAction<{ name: string, email: string }>) {
      state.formData.name.value = action.payload.name;
      state.formData.name.valid = true;
      state.formData.email.value = action.payload.email;
      state.formData.email.valid = true;
    },

    orderChangeField(state, action: PayloadAction<{ name: string, value: string }>) {
      const { name, value } = action.payload;

      const validator = new RegExp(state.formData[name].validator);
      const checkValue = (value: string) => validator.test(value);
      const valid = checkValue(value);
      const newField = { ...state.formData[name], value, valid };
      const formData = { ...state.formData, [name]: newField };
      const formValid = Object.values(formData).every((field: IField) => {
        return field.valid
      });

      state.formData = formData;
      state.formValid = formValid;
    },

    orderSetLastOrderCache(state) {
      const lastOrderCache = { ...state.lastOrderCache };
      lastOrderCache.name = state.formData.name.value;
      lastOrderCache.phone = state.formData.phone.value;
      lastOrderCache.email = state.formData.email.value;
      state.lastOrderCache = lastOrderCache
    },

    orderItemsDetailed(state, action: PayloadAction<Array<IPizzaDetailsPartial>>) {
      state.orderItemsDetailed = action.payload
    }
  },
});

export const { orderSetUser, orderChangeField, orderSetLastOrderCache, orderItemsDetailed } = orderSlice.actions;
export default orderSlice.reducer;