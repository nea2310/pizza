import { useState } from 'react';
import './pizzaItems.scss';
import FavouritesButton from '../../components/buttons/favourites-button/FavouritesButton';
import { IngredientList } from '../../components/ingredient-list/IngredientList';
import OrderButton from '../../components/buttons/order-button/OrderButton';
import ProductCard from '../../components/cards/product-card/ProductCard';
import { RadioButtons } from '../../components/radio-buttons/RadioButtons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IStore, IPizzaDetails, ICartItem } from '../../interface';
import { pizzaItemsFilter } from '../../store/actions/pizzaItems';

const PizzaItems = () => {
  const props: IStore = useAppSelector(state => {
    return state;
  });

  const dispatch = useAppDispatch();
  const userDocID = props.user.userDocID;
  const fav = props.user.favourites; // проверить, есть ли избранное
  const cart = props.cart.cartItems; // проверить, есть ли избранное
  const ingredientsAll = props.pizzaItems.ingredientsAll;
  const pizzaItemsFiltered = props.pizzaItems.pizzaItemsFiltered;
  const pizzaItemsAll = props.pizzaItems.pizzaItemsAll;

  const [ingredientsChosen, setIngredientsChosen] = useState<Array<string>>([]);
  const [spicyChosen, setSpicyChosen] = useState('');
  const [lentChosen, setLentChosen] = useState('');


  /*создаем карточки купонов*/
  let pizzaItemsCards = null;
  if (pizzaItemsFiltered.length) {
    pizzaItemsCards = pizzaItemsFiltered.map(
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

        return <li
          className='pizza-items__product-card-wrapper'
          key={pizzaItem.id}>
          <div className='pizza-items__product-card product-card'>
            <ProductCard
              pizzaid={pizzaItem.id}
              isavl={pizzaItem.available}
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
              isavl={pizzaItem.available}
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


  const filterByIngredient = (ingredient: string, isChecked: boolean) => {

    let arr: Array<string> = [...ingredientsChosen];
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