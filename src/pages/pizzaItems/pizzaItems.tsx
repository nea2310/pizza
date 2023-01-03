import { useState } from 'react';
import IngredientList from '../../components/ingredient-list/IngredientList';
import ProductCard from '../../components/cards/product-card/ProductCard';
import RadioButtons from '../../components/radio-buttons/RadioButtons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IPizzaDetails, ICartItem } from '../../interface';
import { filterPizzaItems } from '../../store/slices/pizzaItemsSlice';
import './pizzaItems.scss';

const PizzaItems: React.FC = () => {
  const dispatch = useAppDispatch();

  const { status, error, data } = useAppSelector((state) => state.pizzaItems);
  const { userDocID, favorites } = useAppSelector((state) => state.user);
  const { cartItems } = useAppSelector((state) => state.cart);

  const userDocIDString = userDocID;
  const { pizzaItemsFiltered, ingredientsAll, pizzaItemsAll } = data;

  const [ingredientsSelected, setIngredientsSelected] = useState<Array<string>>(
    []
  );
  const [spicySelected, setspicySelected] = useState('');
  const [lentSelected, setlentSelected] = useState('');
  const [open, setOpen] = useState<boolean>(false);

  const filterClassName = open ? 'pizza-items__filter_active' : '';
  const filterClasses = ['pizza-items__filter', filterClassName];

  /*создаем карточки товаров*/
  let pizzaItemsCards = null;
  if (pizzaItemsFiltered.length) {
    pizzaItemsCards = pizzaItemsFiltered.map((pizzaItem: IPizzaDetails) => {
      let inFav = false;
      /*проверить, находится ли эта пицца в избранном*/
      if (favorites) {
        inFav = favorites.some((favItemID: string) => {
          return pizzaItem.id === favItemID;
        });
      }

      let inCart = false;
      /*проверить, находится ли эта пицца в корзине*/

      if (cartItems) {
        inCart = cartItems.some((cartItem: ICartItem) => {
          return pizzaItem.id in cartItem;
        });
      }

      return (
        <li className="pizza-items__product-card" key={pizzaItem.id}>
          <ProductCard
            pizzaid={pizzaItem.id}
            isavl={pizzaItem.available}
            name={pizzaItem.name}
            image={pizzaItem.image}
            price={pizzaItem.price}
            incart={inCart}
            userdocid={userDocIDString}
            infav={inFav}
          />
        </li>
      );
    });
  }

  const filterByIngredient = (ingredient: string, isChecked: boolean) => {
    let arr: Array<string> = [...ingredientsSelected];
    if (isChecked) {
      arr.push(ingredient);
    } else {
      arr.splice(arr.indexOf(ingredient), 1);
    }
    setIngredientsSelected(arr);

    dispatch(
      filterPizzaItems({
        lentSelected: lentSelected,
        spicySelected: spicySelected,
        ingredientsSelected: arr,
        ingredientsAll,
        pizzaItemsAll,
        currentQuery: 'ingredients',
      })
    );
  };

  const filterBySpicy = (value: string) => {
    setspicySelected(value);
    dispatch(
      filterPizzaItems({
        lentSelected: lentSelected,
        spicySelected: value,
        ingredientsSelected: ingredientsSelected,
        ingredientsAll,
        pizzaItemsAll,
        currentQuery: 'spicy',
      })
    );
  };

  const filterByLent = (value: string) => {
    setlentSelected(value);
    dispatch(
      filterPizzaItems({
        lentSelected: value,
        spicySelected: spicySelected,
        ingredientsSelected: ingredientsSelected,
        ingredientsAll,
        pizzaItemsAll,
        currentQuery: 'lent',
      })
    );
  };

  const onResize = () => {
    if (window.innerWidth > 767) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const canFocus =
    document.body.offsetWidth > 767 ||
    (open && document.body.offsetWidth < 767);

  window.addEventListener('resize', onResize);

  return (
    <>
      {error && <h1>Произошла ошибка: {error}</h1>}
      <section className="pizza-items">
        {!error && <h1 className="pizza-items__main-header">Заказать пиццу</h1>}
        <div className={filterClasses.join(' ')}>
          <button
            aria-label="фильтр поиска"
            className="pizza-items__filter-button"
            onClick={() => setOpen(!open)}
          ></button>
          <div className="pizza-items__filter-ingredients">
            <IngredientList
              canFocus={canFocus}
              onClick={(ingredient: string, isChecked: boolean) =>
                filterByIngredient(ingredient, isChecked)
              }
            />
          </div>
          <div className="pizza-items__filter-spicy">
            <RadioButtons
              canFocus={canFocus}
              radioName="spicy"
              catName="Острая"
              onClick={(value: string) => filterBySpicy(value)}
            />
          </div>
          <div className="pizza-items__filter-lent">
            <RadioButtons
              canFocus={canFocus}
              radioName="lent"
              catName="Можно в пост"
              onClick={(value: string) => filterByLent(value)}
            />
          </div>
        </div>

        <ul className="pizza-items__product-cards">
          {status === 'loading' && (
            <span className="pizza-items__loader"></span>
          )}
          {pizzaItemsCards}
        </ul>
      </section>
    </>
  );
};

export default PizzaItems;
