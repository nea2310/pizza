import { useEffect, useState, useRef, RefObject } from 'react';
import { useAppSelector } from '../../hooks';
import { IPizzaDetails } from '../../interface';
import './ingredient-list.scss';

type TProps = {
  onClick: (ingredient: string, isChecked: boolean) => void;
  canFocus: boolean;
};
const IngredientList: React.FC<TProps> = ({ onClick, canFocus }) => {
  const mapTemp: string[] = [];

  const { ingredientsAll, pizzaItemsFiltered, currentQuery } = useAppSelector(
    (state) => state.pizzaItems.data
  );

  const [map, setMap] = useState(ingredientsAll);

  const ingredientsAvl: string[] = [];

  if (pizzaItemsFiltered.length) {
    pizzaItemsFiltered.forEach((item: IPizzaDetails) => {
      item.ingredients.forEach((ingr: string) => {
        ingredientsAvl.push(ingr);
      });
    });
  }

  const inList = (ingredient: string) => {
    if (currentQuery) {
      if (currentQuery != 'ingredients') {
        return ingredientsAvl.includes(ingredient);
      } else {
        return map.includes(ingredient);
      }
    } else return true;
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

  const refList =
    useRef<HTMLFieldSetElement>() as RefObject<HTMLFieldSetElement>;
  const ingredientsList = ingredientsAll.map(
    (ingredient: string, id: number) => {
      return (
        <label className="ingredients-list__item" key={id}>
          <input
            tabIndex={canFocus ? 0 : -1}
            className="ingredients-list__checkbox"
            type="checkbox"
            name={ingredient}
            onChange={(e) => {
              const isChecked = e.target.checked;
              onClick(ingredient, isChecked);
            }}
          />
          <span className="ingredients-list__checkmark"></span>
          {ingredient}
        </label>
      );
    }
  );

  return (
    <fieldset className="ingredients-list" ref={refList}>
      <legend className="ingredients-list__legend">Ингредиент</legend>
      {ingredientsList}
    </fieldset>
  );
};

export default IngredientList;
