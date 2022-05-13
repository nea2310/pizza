import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './pizzaItems.scss';
import { urlBuilder } from '~r/routes';
import { userUpdateFavItems } from '~s/actions/user';
import {
  pizzaItemsFilter,
} from '~s/actions/pizzaItems';
import { useDispatch, useSelector } from 'react-redux';

import { IngredientList } from '~c/ingredient-list/ingredient-list';
import { RadioButtons } from '~c/radio-buttons/radio-buttons';

import FavouritesButton from '~c/buttons/favourites-button/favourites-button';
import OrderButton from '~c/buttons/order-button/order-button';
import ProductCard from '~c/cards/product-card/product-card';


const PizzaItems = () => {
  const props: any = useSelector(state => {
    return state;
  });

  const dispatch = useDispatch();
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


  const filterByIngredient = (ingredient: any, isChecked: boolean) => {

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
              onClick={(ingredient: any, isChecked: any) =>
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