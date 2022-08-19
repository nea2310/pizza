

import { useEffect, useState, useRef, RefObject } from 'react';
import './ingredient-list.scss';
import { useAppSelector } from '../../hooks';
import { IStore, IPizzaDetails } from '../../interface';

type TProps = {
  onClick: (ingredient: string, isChecked: boolean) => void
}

const IngredientList = ({ onClick }: TProps) => {

  const props: IStore = useAppSelector(state => {
    return state;
  });

  const mapTemp: string[] = [];
  const ingredientsAll = props.pizzaItems.ingredientsAll;
  const pizzaItemsFiltered = props.pizzaItems.pizzaItemsFiltered;
  const currentQuery = props.pizzaItems.currentQuery;
  const [map, setMap] = useState(ingredientsAll);

  const ingredientsAvl: string[] = [];

  pizzaItemsFiltered.forEach((item: IPizzaDetails) => {
    item.ingredients.forEach((ingr: string) => {
      ingredientsAvl.push(ingr);
    });
  });

  const inList = (ingredient: string) => {
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
    let list = refList.current;
    if (!list) return;
    let inputs = list.querySelectorAll('input');
    inputs.forEach((input: HTMLInputElement) => {
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

  const refList = useRef<HTMLUListElement>() as RefObject<HTMLUListElement>;
  const ingredientsList = ingredientsAll.map(

    (ingredient: string, id: number) => {
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

