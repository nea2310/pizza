import { useEffect, useState } from 'react';
import './favourites.scss';
import FavouritesButton from '../../components/buttons/favourites-button/FavouritesButton';
import { IngredientList } from '../../components/ingredient-list/IngredientList';
import OrderButton from '../../components/buttons/order-button/OrderButton';
import ProductCard from '../../components/cards/product-card/ProductCard';
import { RadioButtons } from '../../components/radio-buttons/RadioButtons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IStore, IPizzaDetails, ICartItem } from '../../interface';
import { pizzaItemsFilter } from '../../store/actions/pizzaItems';

const Favourites = () => {
  const props: IStore = useAppSelector(state => {
    return state;
  });

  const dispatch = useAppDispatch();

  const fav = props.user.favourites;
  const pizzaItemsAll = props.pizzaItems.pizzaItemsAll;
  const userDocID = props.user.userDocID;
  const cart = props.cart.cartItems;


  /*создаем карточки купонов*/
  let pizzaItemsCards = null;
  pizzaItemsCards = pizzaItemsAll.map(
    (pizzaItem: IPizzaDetails) => {
      let inFav = false;
      /*проверить, находится ли эта пицца в избранном*/
      if (fav) {
        inFav =
          fav.some(
            (favItemID: string) => {
              return pizzaItem.id === favItemID;
            });
      }

      let inCart = false;
      /*проверить, находится ли эта пицца в корзине*/

      if (cart) {
        inCart =
          cart.some(
            (cartItem: ICartItem) => {
              return pizzaItem.id in cartItem;
            });
      }

      if (inFav) return (
        <li className='favourites__product-card-wrapper'
          key={pizzaItem.id}>
          <ProductCard
            pizzaid={pizzaItem.id}
            isavl={pizzaItem.available}
            name={pizzaItem.name}
            image={pizzaItem.image}
            price={pizzaItem.price}
            incart={inCart}
            userdocid={userDocID}
            infav={inFav}
          />
        </li >)
    });

  return (
    <ul className='favourites__product-cards'>
      {pizzaItemsCards}
    </ul>
  );
};


export default Favourites;