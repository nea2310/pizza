import { IUserActions } from './../../interface';

let initialState: { user: any } =
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



function set(state: any = initialState,
  payload: any) {
  console.log('SETTING USER');

  const user = {
    ...state.user,
    ...payload
  };
  return { ...state, user };
}

function unset(state: any) {
  console.log('UNSETTING USER');
  const user: any = {
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

function addFav(state: any, favourites: Array<string>) {

  console.log('USER_ADD_FAV');
  const user = { ...state.user, favourites };
  return { ...state, user };
}



const reducer = function (state: any = initialState, action: IUserActions) {


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

