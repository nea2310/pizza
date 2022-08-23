import {
  IPizzaItemsPayload,
  IPizzaItem,
  IPizzaItemsActions
} from './../../interface';

let initialState = {
  pizzaItemsAll: [],
  pizzaItemsFiltered: [],
  ingredientsChosen: [],
  ingredientsAll: [],
  currentQuery: ''
};

function fetchPizzaItems(state = initialState, pizzaItemsAll: Array<IPizzaItem>) {

  //список всех ингредиентов (с дублями)
  const ingredientsRaw: Array<string> = [];
  pizzaItemsAll.forEach((item: IPizzaItem) =>
    item.ingredients.forEach((item: string) => ingredientsRaw.push(item))
  );
  //список всех ингредиентов (убираем дубли)
  const ingredientsAll =
    ingredientsRaw.filter((item: string, pos: number) =>
      ingredientsRaw.indexOf(item) == pos
    );

  return {
    ...state,
    pizzaItemsAll,
    pizzaItemsFiltered: pizzaItemsAll,
    ingredientsAll
  };
}

function filterPizzaItems(state = initialState, payload: IPizzaItemsPayload) {
  const { pizzaItemsFiltered,
    ingredientsChosen,
    spicyChosen,
    lentChosen,
    currentQuery,
  } = payload;

  let filterSpicy;
  switch (spicyChosen) {
    case 'да':
      filterSpicy = true;
      break;
    case 'нет':
      filterSpicy = false;
      break;
  }

  let filterLent;
  switch (lentChosen) {
    case 'да':
      filterLent = true;
      break;
    case 'нет':
      filterLent = false;
      break;
  }

  return {
    ...state,
    ingredientsChosen,
    spicyChosen,
    pizzaItemsFiltered,
    currentQuery,
    filterSpicy,
    filterLent
  };
}

const reducer = function (state = initialState,
  action: IPizzaItemsActions) {
  switch (action.type) {

    case 'PIZZAITEMS_FETCH_DATA_SUCCESS': {
      return fetchPizzaItems(state, action.pizzaItems)
    }

    case 'PIZZAITEMS_FILTER': {
      return filterPizzaItems(state, action.payload);
    }

    default:
      return state;
  }

};

export default reducer;

