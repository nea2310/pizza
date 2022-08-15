

import './ingredient-list.scss';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';


const IngredientList = ({ onClick }: any) => {
  const props: any = useSelector(state => {
    return state;
  });

  const mapTemp: any = [];
  const ingredientsAll = props.pizzaItems.ingredientsAll;
  const pizzaItemsFiltered = props.pizzaItems.pizzaItemsFiltered;
  const currentQuery = props.pizzaItems.currentQuery;
  const [map, setMap] = useState(ingredientsAll);

  const ingredientsAvl: any = [];

  pizzaItemsFiltered.forEach((item: any) => {
    item.ingredients.forEach((ingr: any) => {
      /*проверяем, нет ли дублей*/
      const res = pizzaItemsFiltered.findIndex((uniqueItem: any) => {
        return uniqueItem == ingr;
      });
      if (res == -1) { ingredientsAvl.push(ingr); }
    });
  });

  const inList = (ingredient: boolean) => {
    if (currentQuery) {
      if (currentQuery != 'ingredients') {
        return ingredientsAvl.includes(ingredient);
      }
      else {
        return map.includes(ingredient);
      }
    }
    else return true;
  };


  useEffect(() => {
    let list = refList.current as HTMLElement;
    let inputs = list.querySelectorAll('input');
    inputs.forEach((input: any) => {
      input.disabled = !inList(input.name);
      /*создаем список доступных ингредиентов*/
      if (!input.disabled) {
        mapTemp.push(input.name);
      }
    });
    if (mapTemp.length !== map.length) {
      setMap(mapTemp);
    }
  });

  const refList = useRef();
  const ingredientsList = ingredientsAll.map(

    (ingredient: any, id: number) => {
      return (
        <li
          className='ingredients-list__item'
          key={id}>
          <label className='ingredients-list__item-label'>
            <input
              className='ingredients-list__item-checkbox'
              type="checkbox"
              name={ingredient}
              onChange={(e) => {
                const isChecked = e.target.checked;
                onClick(ingredient, isChecked);
              }}
            />
            <span
              className='ingredients-list__item-checkmark'>
            </span>
            {ingredient}
          </label>
        </li>
      );
    }
  );

  return (
    <ul className='ingredients-list'
      ref={refList}
    > Ингредиент
      {ingredientsList}
    </ul>
  );
};

export { IngredientList };

