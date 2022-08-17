import db from '../../firebase';

import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

import {
  IPizzaItem,
  IPizzaItemsFetchDataSuccess,
  IPizzaItemsFilterSuccess,
  IFilterData,
} from './../../interface';

import { Dispatch } from 'react';
import { QuerySnapshot, DocumentData } from '@firebase/firestore/dist';

export function pizzaItemsFetchDataSuccess(pizzaItems: Array<IPizzaItem>):
  IPizzaItemsFetchDataSuccess {
  return {
    type: 'PIZZAITEMS_FETCH_DATA_SUCCESS',
    pizzaItems
  };
}

export function pizzaItemsFilterSuccess(pizzaItemsFiltered: Array<IPizzaItem>,
  data: IFilterData): IPizzaItemsFilterSuccess {
  return {
    type: 'PIZZAITEMS_FILTER',
    payload: {
      spicyChosen: data.spicyChosen,
      lentChosen: data.lentChosen,
      ingredientsChosen: data.ingredientsChosen,
      currentQuery: data.currentQuery,
      pizzaItemsFiltered
    }
  };
}

export function pizzaItemsFetchData() {
  return (dispatch: Dispatch<IPizzaItemsFetchDataSuccess>) => {
    return getDocs(collection(db, "pizza"))
      .then(pizzaItems => {
        let items: Array<IPizzaItem> = [];
        pizzaItems.forEach((doc) => {
          let a = { ...doc.data(), id: doc.id } as IPizzaItem;
          items.push(a);
        });
        return items;
      })
      .then(pizzaItems => dispatch(pizzaItemsFetchDataSuccess(pizzaItems)))
      .catch(console.error);
  };
}

export function pizzaItemsFilter(filterData: IFilterData) {

  const queryGlobal = {
    filterIngredients: false,
    filterSpicy: false,
    filterLent: false
  };

  let filterIngredients: Array<string>;
  let filterSpicy: boolean;
  let filterLent: boolean;

  if (filterData.ingredientsChosen.length) {
    queryGlobal.filterIngredients = true;
    filterIngredients = filterData.ingredientsChosen;
  }

  if (filterData.spicyChosen && filterData.spicyChosen != 'не важно') {
    queryGlobal.filterSpicy = true;
    filterSpicy = filterData.spicyChosen == 'да' ? true : false;
  }
  if (filterData.lentChosen && filterData.lentChosen != 'не важно') {
    queryGlobal.filterLent = true;
    filterLent = filterData.lentChosen == 'да' ? true : false;
  }
  const usepizzaItemsAll =
    Object.values(queryGlobal).includes(false) ? true : false;

  /* Из-за ограничений Cloud Firestore на выполнение составных запросов (например,
      "Вы можете выполнить ряд ( < , <= , > , >= ) или не равны ( != )Сравнения только 
      на одном поле, и вы можете включать более одного array-contains или 
      array-contains-any пункт в составном запросе ") и т.п., (см. документацию
        https://firebase.google.com/docs/firestore/query-data/queries),
        пришлось сделать отдельные выборки для каждой категории фильрации 
        (по ингредиентам, по spicy, по lent) и затем объединить их результаты.
  
        Этот подход крайне неудобен в случае расширения приложения
  */
  return (dispatch: Dispatch<IPizzaItemsFilterSuccess>) => {
    const arr: (Promise<void | IPizzaItem[]>)[] = [];

    //фильтруем по ингредиентам
    if (queryGlobal.filterIngredients) {
      const q = query(collection(db, "pizza"),
        where("ingredients", "array-contains-any", filterIngredients));
      const queryQ = getDocs(q)
        .then(res => {
          const arr: Array<IPizzaItem> = prepareArray(res);
          return arr;
        })
        .catch(console.error);
      arr.push(queryQ);
    }

    //фильтруем по spicy
    if (queryGlobal.filterSpicy) {
      const q = query(collection(db, "pizza"),
        where("spicy", "==", filterSpicy),
      );
      const queryQ = getDocs(q)
        .then(res => {
          const arr = prepareArray(res);
          return arr;
        })
        .catch(console.error);
      arr.push(queryQ);
    }

    //фильтруем по lent
    if (queryGlobal.filterLent) {
      const q = query(collection(db, "pizza"),
        where("lent", "==", filterLent),
      );
      const queryQ = getDocs(q)
        .then(res => {
          const arr = prepareArray(res);
          return arr;
        })
        .catch(console.error);
      arr.push(queryQ);
    }

    Promise.all(arr)
      .then((pizzaItemsArray: (void | IPizzaItem[])[]) => {
        /*Проверяем, что фактически тип pizzaItemsArray равен IPizzaItem[][] -
        используем защитник типа (Type Guard)*/
        if (checkType(pizzaItemsArray)) {
          let pizzaItemsFiltered: Array<IPizzaItem> = [];
          /* если фильтровали хотя бы по какому-нибудь критерию*/
          if (pizzaItemsArray.length) {
            /*если в какой-то категории нет выбранных элементов, добавляем pizzaItemsAll в pizzaItemsArray*/
            if (usepizzaItemsAll) {
              pizzaItemsArray.push(filterData.pizzaItemsAll);
            }
            let minItem = { length: 999999999, id: -1 };
            // находим, какой из массивов имеет наименьшую длину
            pizzaItemsArray.forEach((item: Array<IPizzaItem>, id: number) => {
              if (item.length < minItem.length) {
                minItem.length = item.length;
                minItem.id = id;
              }
            });
            // получаем массив наименьшей длины
            const listToCheck = [...pizzaItemsArray[minItem.id]];
            // удаляем массив наименьшей длины из списка полученных массивов
            pizzaItemsArray.splice(minItem.id, 1);
            /*отбираем элементы, которые есть в каждом из массивов*/
            for (let i = 0; i < listToCheck.length; i++) {
              for (let j = 0; j < pizzaItemsArray.length; j++) {
                let couponFiltered =
                  pizzaItemsArray[j].find((item: IPizzaItem) =>
                    item.id === listToCheck[i].id) as IPizzaItem;
                if (!couponFiltered) break;
                else {
                  /*проверяем, нет ли дублей*/
                  const res =
                    pizzaItemsFiltered.findIndex((uniqueItem: IPizzaItem) => {
                      return uniqueItem.id === couponFiltered.id;
                    });
                  if (res === -1) { pizzaItemsFiltered.push(couponFiltered); }
                }
              }
            }
          }
          /* если не фильтровали ни по какому критерию*/
          else pizzaItemsFiltered = filterData.pizzaItemsAll;
          dispatch(pizzaItemsFilterSuccess(pizzaItemsFiltered,
            filterData));
        }
      }
      )
      .catch(console.error);
  };
}

const checkType = (pizzaItemsArray: (void | IPizzaItem[])[]):
  pizzaItemsArray is IPizzaItem[][] => {
  return pizzaItemsArray as IPizzaItem[][] !== undefined;
};

const prepareArray = (data: QuerySnapshot<DocumentData>): Array<IPizzaItem> => {
  let arr: Array<IPizzaItem> = [];
  data.forEach((doc) => {
    let a = { ...doc.data(), id: doc.id } as IPizzaItem;
    arr.push(a);
  });
  return arr;
};




