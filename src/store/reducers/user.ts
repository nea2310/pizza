import { IUserActions, IUserData } from './../../interface';

let initialState = {
  email: null,
  token: null,
  id: null,
  name: null,
  surname: null,
  userDocID: null,
  favourites: null
};

function set(state = initialState,
  payload: IUserData) {
  console.log('SETTING USER');

  return { ...state, ...payload };
}

function unset(state = initialState) {
  console.log('UNSETTING USER');
  const user = {
    email: null,
    token: null,
    id: null,
    name: null,
    surname: null,
    docID: null,
    favourites: null
  };
  return { ...state, ...user };
}

function addFav(state = initialState, favourites: Array<string>) {

  console.log('USER_ADD_FAV');
  const user = { ...state, favourites };
  return { ...state, user };
}

const reducer = function (state = initialState, action: IUserActions) {
  switch (action.type) {
    case 'USER_SET':
      return set(state, action.payload);
    case 'USER_UNSET':
      return unset(state);
    case 'USER_ADD_FAV':
      return addFav(state, action.payload.favourites);
    default:
      return state;
  }
};

export default reducer;

