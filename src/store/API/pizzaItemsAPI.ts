import { Exception } from 'sass/types/exception';
import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";

import { IFilterData, IFilterPizzaItemsArgs } from '../../interface';

import db from '../../firebase';
import { IPizzaItem } from '../../interface';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';

export const pizzaItemsAPI = {
  fetchPizzaItems: async (rejectWithValue: any) => {
    const pizzaItems = await getDocs(collection(db, "pizza"));
    if (pizzaItems.metadata.fromCache && rejectWithValue) {
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
  },

  filterPizzaItems:  async (filterData: IFilterPizzaItemsArgs, rejectWithValue: Function | undefined) => {
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
      if (rejectWithValue) return rejectWithValue(e.message)
    }
  },
}

export default pizzaItemsAPI;
