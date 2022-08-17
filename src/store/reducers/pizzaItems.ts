import {
  IPizzaItemsState,
  IPizzaItem,
  IPizzaItemsActions
} from './../../interface';

let initialState: IPizzaItemsState = {
  pizzaItemsAll: [],
  pizzaItemsFiltered: [],
  ingredientsChosen: [],
  ingredientsAll: [],
  currentQuery: ''
};

const reducer = function (state: IPizzaItemsState = initialState,
  action: IPizzaItemsActions) {
  switch (action.type) {
    case 'PIZZAITEMS_FETCH_DATA_SUCCESS': {
      let newState = { ...state };
      let pizzaItemsAll = action.pizzaItems;
      const ingredientsRaw: Array<string> = [];
      pizzaItemsAll.forEach((item: IPizzaItem) =>
        item.ingredients.forEach((item: string) => ingredientsRaw.push(item))
      );



      //список всех ингредиентов
      const ingredientsAll =
        ingredientsRaw.filter((item: string, pos: number) =>
          ingredientsRaw.indexOf(item) == pos
        );

      const pizzaItemsFiltered = action.pizzaItems;

      return {
        ...newState,
        pizzaItemsAll,
        pizzaItemsFiltered,
        ingredientsAll
      };
    }

    case 'PIZZAITEMS_FILTER': {
      let newState = { ...state };
      const { pizzaItemsFiltered } = action.payload;
      const { ingredientsChosen } = action.payload;
      const { spicyChosen } = action.payload;
      const { lentChosen } = action.payload;
      const { currentQuery } = action.payload;
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
        ...newState,
        ingredientsChosen,
        spicyChosen,
        pizzaItemsFiltered,
        currentQuery,
        filterSpicy,
        filterLent
      };
    }

    default:
      return state;
  }

};

export default reducer;

