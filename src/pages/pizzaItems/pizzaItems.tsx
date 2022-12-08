import { useState } from 'react';
import './pizzaItems.scss';
import IngredientList from '../../components/ingredient-list/IngredientList';
import ProductCard from '../../components/cards/product-card/ProductCard';
import RadioButtons from '../../components/radio-buttons/RadioButtons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IPizzaDetails, ICartItem } from '../../interface';
import { filterPizzaItems } from '../../store/slices/pizzaItemsSlice';

const PizzaItems: React.FC = () => {

  const dispatch = useAppDispatch();

  const { status, error, data } = useAppSelector(state => state.pizzaItems);
  const { userDocID, favorites } = useAppSelector(state => state.user);
  const { cartItems } = useAppSelector(state => state.cart);

  const userDocIDString = userDocID as string;
  const { pizzaItemsFiltered, ingredientsAll, pizzaItemsAll } = data;


  const [ingredientsSelected, setIngredientsSelected] = useState<Array<string>>([]);
  const [spicySelected, setspicySelected] = useState('');
  const [lentSelected, setlentSelected] = useState('');

  /*создаем карточки товаров*/
  let pizzaItemsCards = null;
  if (pizzaItemsFiltered.length) {
    pizzaItemsCards = pizzaItemsFiltered.map(
      (pizzaItem: IPizzaDetails) => {
        let inFav = false;
        /*проверить, находится ли эта пицца в избранном*/
        if (favorites) {
          inFav =
            favorites.some(
              (favItemID: string) => {
                return pizzaItem.id === favItemID;
              });
        }

        let inCart = false;
        /*проверить, находится ли эта пицца в корзине*/

        if (cartItems) {
          inCart =
            cartItems.some(
              (cartItem: ICartItem) => {
                return pizzaItem.id in cartItem;
              });
        }

        return (
          <li className='pizza-items__product-card-wrapper'
            key={pizzaItem.id}>
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
          </li >)
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

    dispatch(filterPizzaItems({
      lentSelected: lentSelected,
      spicySelected: spicySelected,
      ingredientsSelected: arr,
      ingredientsAll,
      pizzaItemsAll,
      currentQuery: 'ingredients'
    }));
  };

  const filterBySpicy = (value: string) => {
    setspicySelected(value);
    dispatch(filterPizzaItems({
      lentSelected: lentSelected,
      spicySelected: value,
      ingredientsSelected: ingredientsSelected,
      ingredientsAll,
      pizzaItemsAll,
      currentQuery: 'spicy'
    }));
  };

  const filterByLent = (value: string) => {
    setlentSelected(value);
    dispatch(filterPizzaItems({
      lentSelected: value,
      spicySelected: spicySelected,
      ingredientsSelected: ingredientsSelected,
      ingredientsAll,
      pizzaItemsAll,
      currentQuery: 'lent'
    }));
  };
  return (
    <>

      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>Error occured: {error}</h2>}
      <section className='pizza-items'>

        <div className='pizza-items__filter'>
          <div className='pizza-items__filter-ingredients'>
            <IngredientList
              onClick={(ingredient: string, isChecked: boolean) =>
                filterByIngredient(ingredient, isChecked)}
            /></div>
          <div className='pizza-items__filter-spicy'>
            <RadioButtons
              radioName='spicy'
              catName='Острая'
              onClick={(value: string) =>
                filterBySpicy(value)}
            /></div>
          <div className='pizza-items__filter-lent'>
            <RadioButtons
              radioName='lent'
              catName='Можно в пост'
              onClick={(value: string) =>
                filterByLent(value)}
            /></div>
        </div>

        <ul className='pizza-items__product-cards'>
          {pizzaItemsCards}
        </ul>
      </section>
    </>
  );
};


export default PizzaItems;