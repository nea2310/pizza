import { useState } from 'react';
import './pizzaItems.scss';
import {
  pizzaItemsFilter,
} from '../../store/actions/pizzaItems';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { IngredientList } from '../../components/ingredient-list/ingredient-list';
import { RadioButtons } from '../../components/radio-buttons/radio-buttons';

import FavouritesButton from '../../components/buttons/favourites-button/favourites-button';
import OrderButton from '../../components/buttons/order-button/order-button';
import ProductCard from '../../components/cards/product-card/product-card';


const PizzaItems = () => {
  const props: any = useAppSelector(state => {
    return state;
  });

  const dispatch = useAppDispatch();
  const userDocID = props.user.user.userDocID;
  const fav = props.user.user.favourites; // проверить, есть ли избранное
  const cart = props.cart.cartItems; // проверить, есть ли избранное
  const ingredientsAll = props.pizzaItems.ingredientsAll;
  const pizzaItemsFiltered = props.pizzaItems.pizzaItemsFiltered;
  const pizzaItemsAll = props.pizzaItems.pizzaItemsAll;

  const [ingredientsChosen, setIngredientsChosen] = useState([]);
  const [spicyChosen, setSpicyChosen] = useState('');
  const [lentChosen, setLentChosen] = useState('');


  /*создаем карточки купонов*/
  let pizzaItemsCards = null;
  if (pizzaItemsFiltered.length) {
    pizzaItemsCards = pizzaItemsFiltered.map(
      (pizzaItem: any) => {
        let inFav = false;
        /*проверить, находится ли эта пицца в избранном*/
        if (fav) {
          inFav =
            fav.some(
              (favItem: any) => {
                return pizzaItem.id === favItem;
              });
        }

        let inCart = false;
        /*проверить, находится ли эта пицца в корзине*/

        if (cart) {
          inCart =
            cart.some(
              (cartItem: any) => {
                return pizzaItem.id in cartItem;
              });
        }


        let isAvl = null;
        if (!pizzaItem.available) {
          isAvl = <span> Нет в наличии</span>;
        }

        return <li
          className='pizza-items__product-card-wrapper'
          key={pizzaItem.id}>
          <div className='pizza-items__product-card product-card'>
            <ProductCard
              pizzaid={pizzaItem.id}
              isavl={isAvl}
              name={pizzaItem.name}
              image={pizzaItem.image}
              price={pizzaItem.price}
            />
          </div>

          <div className='pizza-items__order-button order-button'>
            <OrderButton
              incart={inCart}
              userdocid={userDocID}
              pizzaid={pizzaItem.id}
              isavl={isAvl}
            />
          </div>


          <div className='pizza-items__favourites-button favourites-button'>
            <FavouritesButton
              infav={inFav}
              userdocid={userDocID}
              pizzaid={pizzaItem.id}
            />
          </div>


        </li >;
      });
  }


  const filterByIngredient = (ingredient: never, isChecked: boolean) => {

    let arr = [...ingredientsChosen];
    if (isChecked) {
      arr.push(ingredient);
    } else {
      arr.splice(arr.indexOf(ingredient), 1);
    }
    setIngredientsChosen(arr);

    dispatch(pizzaItemsFilter({
      lentChosen: lentChosen,
      spicyChosen: spicyChosen,
      ingredientsChosen: arr,
      ingredientsAll,
      pizzaItemsAll,
      currentQuery: 'ingredients'
    }));
  };


  const filterBySpicy = (value: string) => {
    setSpicyChosen(value);
    dispatch(pizzaItemsFilter({
      lentChosen: lentChosen,
      spicyChosen: value,
      ingredientsChosen: ingredientsChosen,
      ingredientsAll,
      pizzaItemsAll,
      currentQuery: 'spicy'
    }));
  };

  const filterByLent = (value: string) => {
    setLentChosen(value);
    dispatch(pizzaItemsFilter({
      lentChosen: value,
      spicyChosen: spicyChosen,
      ingredientsChosen: ingredientsChosen,
      ingredientsAll,
      pizzaItemsAll,
      currentQuery: 'lent'
    }));
  };
  return (
    <>
      <section className='pizza-items'>

        <div className='pizza-items__filter'>
          <div className='pizza-items__filter-ingredients'>
            <IngredientList
              onClick={(ingredient: never, isChecked: any) =>
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