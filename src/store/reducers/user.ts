import { IUserActions, IUserDataInitial } from './../../interface';

let initialState: { user: IUserDataInitial } =
{
  user: {
    email: null,
    token: null,
    id: null,
    name: null,
    surname: null,
    userDocID: null,
    favourites: null
  }
};

function set(state = initialState,
  payload: any) {
  console.log('SETTING USER');

  const user = {
    ...state.user,
    ...payload
  };
  return { ...state, user };
}

function unset(state: typeof initialState) {
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
  return { ...state, user };
}

function addFav(state: typeof initialState, favourites: Array<string>) {

  console.log('USER_ADD_FAV');
  const user = { ...state.user, favourites };
  return { ...state, user };
}

const reducer = function (state = initialState, action: IUserActions) {


  switch (action.type) {
    case 'USER_SET':
      return set(state,
        action.payload);
    case 'USER_UNSET':
      return unset(state);
    case 'USER_ADD_FAV':
      return addFav(state, action.payload.favourites);
    default:
      return state;
  }
};

export default reducer;

