export const mockedStore = {
  preloadedState: {

  pizzaItems: {
    data: {
      pizzaItemsAll: [{
        available: true,
        price: 400,
        meat: true,
        image: 'https://firebasestorage.googleapis.com/v0/',
        ingredients: ['моцарелла', 'пармезан', 'горгонзола', 'орегано'],
        name: 'Четыре сыра',
        lent: false,
        spicy: false,
        id: '5zx7hXAm9qiJUkBTyJBT',
      }],
      pizzaItemsFiltered: [],
      ingredientsSelected: [],
      ingredientsAll: [],
      currentQuery: '',
      spicySelected: '',
      lentSelected: '',
    },
    status: null,
    error: null,
  },

  user: {
    email: 'test@mail.com',
    token: '123456',
    id: '654321',
    name: 'Name',
    surname: 'Surname',
    userDocID: '123',
    favorites: [],
    status: 'fulfilled',
    error: null,
  },
  
  cart: {
    cartItems: [],
    total: 0,
    status: null,
    error: null,
  },

  order: {
    formValid: false,
    orderItemsDetailed: [],
    lastOrderCache: {
      name: '',
      phone: '',
      email: '',
    },
    formData: {
      name: {
        value: '',
        label: 'Имя',
        validator: '^[a-zA-ZА-Яа-яёЁ ]{2,}$',
        errorText: 'Русские или латинские символы, не менее двух',
        valid: null,
      },
      phone: {
        value: '',
        label: 'Телефон',
        validator: '^[0-9]{7,15}$',
        errorText: 'От 7 до 15 цифр',
        valid: null,
      },
      email: {
        value: '',
        label: 'Email',
        validator: '^.+@.+$',
        errorText: 'Собака',
        valid: null,
      },
    },
    status: null,
    error: null,
  },
}
};

const fourCheesePizza = {
  available: true,
  price: 400,
  meat: true,
  image: 'https://firebasestorage.googleapis.com/fourCheesePizza/',
  ingredients: ['моцарелла', 'пармезан', 'горгонзола', 'бри'],
  name: 'Четыре сыра',
  lent: false,
  spicy: false,
  id: 'fourCheesePizzaID',
}

const margaritaPizza = {
  available: false,
  price: 300,
  meat: false,
  image: 'https://firebasestorage.googleapis.com/margaritaPizza/',
  ingredients: ['моцарелла', 'томат', 'орегано'],
  name: 'Маргарита',
  lent: false,
  spicy: false,
  id: 'margaritaPizzaID',
}


export const initialStore = {
  pizzaItems: {
    data: {
      pizzaItemsAll: [{...fourCheesePizza }, { ...margaritaPizza }],
      pizzaItemsFiltered: [{...fourCheesePizza }],
      ingredientsSelected: [],
      ingredientsAll: ['моцарелла', 'пармезан', 'горгонзола', 'орегано', 'томат'],
      currentQuery: '',
      spicySelected: '',
      lentSelected: '',
    },
    status: null,
    error: null,
  },
  user: {
    email: 'test@mail.com',
    token: '123456',
    id: '654321',
    name: 'TestName',
    surname: 'TestSurname',
    userDocID: '123',
    favorites: ['margaritaPizzaID'],
    status: 'fulfilled',
    error: null,
  },
  cart: {
    cartItems: [],
    total: 0,
    status: null,
    error: null,
  },
  order: {
    formValid: false,
    orderItemsDetailed: [],
    lastOrderCache: {
      name: '',
      phone: '',
      email: '',
    },
    formData: {
      name: {
        value: '',
        label: 'Имя',
        validator: '^[a-zA-ZА-Яа-яёЁ ]{2,}$',
        errorText: 'Русские или латинские символы, не менее двух',
        valid: null,
      },
      phone: {
        value: '',
        label: 'Телефон',
        validator: '^[0-9]{7,15}$',
        errorText: 'От 7 до 15 цифр',
        valid: null,
      },
      email: {
        value: '',
        label: 'Email',
        validator: '^.+@.+$',
        errorText: 'Собака',
        valid: null,
      },
    },
    status: null,
    error: null,
  },
};

