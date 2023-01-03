import ProductCard from '../../components/cards/product-card/ProductCard';
import { useAppSelector } from '../../hooks';
import { ICartItem, IPizzaDetails } from '../../interface';
import './favorites.scss';

const Favorites: React.FC = () => {
  const { userDocID, favorites } = useAppSelector((state) => state.user);
  const { pizzaItemsAll } = useAppSelector((state) => state.pizzaItems.data);
  const cart = useAppSelector((state) => state.cart.cartItems);

  /*создаем карточки купонов*/
  let pizzaItemsCards = null;
  pizzaItemsCards = pizzaItemsAll.map((pizzaItem: IPizzaDetails) => {
    let inFav = false;
    /*проверить, находится ли эта пицца в избранном*/
    if (favorites) {
      inFav = favorites.some((favItemID: string) => {
        return pizzaItem.id === favItemID;
      });
    }

    let inCart = false;
    /*проверить, находится ли эта пицца в корзине*/

    if (cart) {
      inCart = cart.some((cartItem: ICartItem) => {
        return pizzaItem.id in cartItem;
      });
    }

    if (inFav && userDocID)
      return (
        <li className="favorites__product-card" key={pizzaItem.id}>
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
        </li>
      );
  });

  return (
    <>
      <h1 className="favorites__main-header">Заказать пиццу</h1>
      <ul className="favorites__product-cards">{pizzaItemsCards}</ul>
    </>
  );
};

export default Favorites;
