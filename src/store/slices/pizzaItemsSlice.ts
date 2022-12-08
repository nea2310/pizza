
import { collection, getDocs, query, where, DocumentData, QuerySnapshot, WhereFilterOp } from "firebase/firestore";
import { Exception } from 'sass/types/exception';
import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import db from './../../firebase';
import {
  IPizzaItem,
  IPizzaItemsState,
  IFetchPizzaItemsReturn,
  IFilterPizzaItemsArgs,
  IFilterPizzaItemsReturn,
  IFilterData
} from './../../interface';
import capitalize from '../../shared/helpers/capitalize';

const initialState: IPizzaItemsState = {
  data: {
    pizzaItemsAll: [],
    pizzaItemsFiltered: [],
    ingredientsSelected: [],
    ingredientsAll: [],
    currentQuery: '',
    spicySelected: '',
    lentSelected: '',
  },
  status: null,
  error: null
};

const NAMESPACE = 'pizzaItems';

export const fetchPizzaItems = createAsyncThunk<IFetchPizzaItemsReturn, undefined, { rejectValue: string }>(
  `${NAMESPACE}/fetch${capitalize(NAMESPACE)}`,
  async function (_, { rejectWithValue }) {

    const pizzaItems = await getDocs(collection(db, "pizza"));
    if (pizzaItems.metadata.fromCache) {
      return rejectWithValue('Server error')
    }

    const pizzaItemsAll: Array<IPizzaItem> = [];
    pizzaItems.forEach((doc) => {
      let a = { ...doc.data(), id: doc.id } as IPizzaItem;
      pizzaItemsAll.push(a);
    });

    //список всех ингредиентов (с дублями)
    const ingredientsRaw: Array<string> = [];
    pizzaItemsAll.forEach((item: IPizzaItem) =>
      item.ingredients.forEach((item: string) => ingredientsRaw.push(item))
    );
    //список всех ингредиентов (убираем дубли)
    const ingredientsAll =
      ingredientsRaw.filter((item: string, pos: number) =>
        ingredientsRaw.indexOf(item) === pos
      );
    return { pizzaItemsAll, pizzaItemsFiltered: pizzaItemsAll, ingredientsAll }
  }
)

export const filterPizzaItems = createAsyncThunk<IFilterPizzaItemsReturn, IFilterPizzaItemsArgs, { rejectValue: string }>(
  `${NAMESPACE}/filter${capitalize(NAMESPACE)}`,
  async function (filterData, { rejectWithValue }) {

    try {
      const queryGlobal: {
        filterIngredients: boolean,
        filterSpicy: boolean,
        filterLent: boolean,
        ingredientsSelected: string[]
      } = {
        filterIngredients: false,
        filterSpicy: false,
        filterLent: false,
        ingredientsSelected: []
      };

      // если выбраны ингредиенты
      if (filterData.ingredientsSelected.length) {
        queryGlobal.filterIngredients = true;
        queryGlobal.ingredientsSelected = filterData.ingredientsSelected
      }


      const filterHelper = (category: 'spicySelected' | 'lentSelected', type: 'filterSpicy' | 'filterLent') => {
        if (filterData[category] && filterData[category] !== 'не важно') {
          queryGlobal[type] = true;
          return filterData[category] === 'да' ? true : false;
        }
        return false;
      }

      // если выбрано spicy ("да" или "нет")
      const filterSpicy = filterHelper('spicySelected', 'filterSpicy');

      // если выбрано lent ("да" или "нет")
      const filterLent = filterHelper('lentSelected', 'filterLent');



      /* Из-за ограничений Cloud Firestore на выполнение составных запросов (например,
          "Вы можете выполнить ряд ( < , <= , > , >= ) или не равны ( != )Сравнения только 
          на одном поле, и вы можете включать более одного array-contains или 
          array-contains-any пункт в составном запросе ") и т.п., (см. документацию
            https://firebase.google.com/docs/firestore/query-data/queries),
            пришлось сделать отдельные выборки для каждой категории фильтрации 
            (по ингредиентам, по spicy, по lent) и затем объединить их результаты.
      
            Этот подход крайне неудобен в случае расширения приложения
      */
      const results: (IPizzaItem[])[] = [];


      const filter = async (filterData: IFilterData) => {
        const { key, operator, value, errorMessage } = filterData;
        const collectionRaw = query(collection(db, "pizza"),
          where(key, operator, value));
        const collectionData = await getDocs(collectionRaw);

        const prepareArray = (data: QuerySnapshot<DocumentData>): Array<IPizzaItem> => {
          const array: Array<IPizzaItem> = [];
          data.forEach((doc) => {
            let element = { ...doc.data(), id: doc.id } as IPizzaItem;
            array.push(element);
          });
          return array;
        };

        const result: Array<IPizzaItem> = prepareArray(collectionData);

        results.push(result);

        if (collectionData.metadata.fromCache) {
          throw new Error(errorMessage);
        }
      }


      //фильтруем по ингредиентам
      if (queryGlobal.filterIngredients) {
        await filter({
          key: 'ingredients',
          operator: 'array-contains-any',
          value: filterData.ingredientsSelected,
          errorMessage: 'Server error: cannot filter by ingredient'
        });
      }

      //фильтруем по spicy
      if (queryGlobal.filterSpicy) {
        await filter({
          key: 'spicy',
          operator: '==',
          value: filterSpicy,
          errorMessage: 'Server error: cannot filter by spicy'
        });
      }

      //фильтруем по lent
      if (queryGlobal.filterLent) {
        await filter({
          key: 'lent',
          operator: '==',
          value: filterLent,
          errorMessage: 'Server error: cannot filter by lent'
        });
      }

      let intersection: Array<IPizzaItem> = [];
      /* если фильтровали хотя бы по какому-нибудь критерию*/
      if (results.length) {

        /*если в какой-то категории нет выбранных элементов, добавляем pizzaItemsAll в pizzaItemsArray*/
        // проверяем, во всех ли категориях есть выбранные элементы
        if (Object.values(queryGlobal).includes(false)) {
          results.push(filterData.pizzaItemsAll);
        }

        const compareLength = (a: unknown[], b: unknown[]) => {
          if (a.length > b.length) return 1;
          if (a.length < b.length) return -1;
          return 0;
        }

        results.sort(compareLength)

        // получаем массив наименьшей длины
        const listToCheck = [...results[0]];

        intersection = listToCheck.filter(listToCheckElement => {
          const filterResult = results.filter((element) => {
            return element.find((item) => item.id === listToCheckElement.id);
          })

          return filterResult.length === results.length;
        }
        );
      }
      /* если не фильтровали ни по какому критерию*/
      else intersection = filterData.pizzaItemsAll;




      const { currentQuery, ingredientsSelected } = filterData;
      return {
        currentQuery,
        pizzaItemsFiltered: intersection,
        ingredientsSelected,
        filterSpicy,
        filterLent,
      }
    }

    catch (error) {
      const e = error as Exception;
      return rejectWithValue(e.message)
    }
  }
)



function isRejected(action: AnyAction) {
  return action.type.endsWith('rejected');
}

function isPending(action: AnyAction) {
  return action.type.endsWith('pending');
}


const pizzaItemsSlice = createSlice({
  name: NAMESPACE,
  initialState,

  extraReducers:
    builder => {
      builder
        .addCase(fetchPizzaItems.fulfilled, (state, action) => {
          const {
            pizzaItemsAll,
            ingredientsAll
          } = action.payload;

          const { data } = state;

          state.status = 'resolved';
          data.pizzaItemsAll = pizzaItemsAll;
          data.pizzaItemsFiltered = pizzaItemsAll;
          data.ingredientsAll = ingredientsAll;
        })

        .addCase(filterPizzaItems.fulfilled, (state, action) => {
          const {
            ingredientsSelected,
            pizzaItemsFiltered,
          } = action.payload;

          const { data } = state;

          state.status = 'resolved';
          data.ingredientsSelected = ingredientsSelected;
          data.pizzaItemsFiltered = pizzaItemsFiltered;
        })

        .addMatcher(isRejected, (state, action: PayloadAction<string>) => {
          state.status = 'rejected';
          state.error = action.payload;
        })
        .addMatcher(isPending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
    },

  reducers: {},
});

export default pizzaItemsSlice.reducer;