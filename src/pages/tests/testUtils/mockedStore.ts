export const mockedStore = {
  preloadedState: {

  pizzaItems: {
    data: {
      pizzaItemsAll: [{
        available: true,
        price: 400,
        meat: true,
        image: "https://firebasestorage.googleapis.com/v0/",
        ingredients: ["моцарелла", "пармезан", "горгонзола", "орегано"],
        name: "Четыре сыра",
        lent: false,
        spicy: false,
        id: "5zx7hXAm9qiJUkBTyJBT",
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


export const initialStore = {
  pizzaItems: {
    data: {
      pizzaItemsAll: [{
        available: true,
        price: 400,
        meat: true,
        image: "https://firebasestorage.googleapis.com/v0/",
        ingredients: ["моцарелла", "пармезан", "горгонзола", "орегано"],
        name: "Четыре сыра",
        lent: false,
        spicy: false,
        id: "5zx7hXAm9qiJUkBTyJBT",
      }],
      pizzaItemsFiltered: [{
        available: true,
        price: 400,
        meat: true,
        image: "https://firebasestorage.googleapis.com/v0/",
        ingredients: ["моцарелла", "пармезан", "горгонзола", "орегано"],
        name: "Четыре сыра",
        lent: false,
        spicy: false,
        id: "5zx7hXAm9qiJUkBTyJBT",
      }],
      ingredientsSelected: [],
      ingredientsAll: ["моцарелла", "пармезан", "горгонзола", "орегано"],
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
    favorites: ["5zx7hXAm9qiJUkBTyJBT"],
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

