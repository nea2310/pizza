import { useNavigate } from 'react-router-dom';
import MinMax from '../../components/inputs/min-max/MinMax';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IPizzaDetailsPartial, IPizzaDetailsExtended } from '../../interface';
import { routesMap } from '../../routes/routes';
import { changeCartItem, removeCartItem } from '../../store/slices/cartSlice';
import { orderItemsDetailed } from '../../store/slices/orderSlice';
import './cart.scss';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pizzaItemsAll } = useAppSelector((state) => state.pizzaItems.data);
  const { userDocID } = useAppSelector((state) => state.user);
  const { cartItems } = useAppSelector((state) => state.cart);

  if (pizzaItemsAll.length && userDocID) {
    const getProductsDetailed = (): Array<IPizzaDetailsExtended> => {
      const items = cartItems.map((cartItem) => {
        const product = pizzaItemsAll.find((product) => product.id in cartItem);
        const item = product
          ? { ...product, cnt: cartItem[product.id] }
          : {
              available: false,
              id: '',
              image: '',
              ingredients: [''],
              lent: false,
              meat: false,
              name: '',
              price: 0,
              spicy: false,
              cnt: 0,
            };
        return item;
      });
      return items;
    };

    const products = getProductsDetailed();

    const getTotal = () => {
      return products.reduce((t: number, pr: IPizzaDetailsPartial) => {
        if (!pr.price || !pr.cnt) return 0;
        return t + pr.price * pr.cnt;
      }, 0);
    };

    const total = getTotal();
    const productsRows = products.map((product) => {
      if (!product.price || !product.cnt) return 0;
      return (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td className="cart__min-max">
            <MinMax
              min={1}
              max={50}
              cnt={product.cnt}
              onChange={(cnt) =>
                dispatch(
                  changeCartItem({
                    user: userDocID,
                    pizzaItem: product.id,
                    cnt,
                  })
                )
              }
            />
          </td>
          <td>{product.price * product.cnt}</td>
          <td className="cart__delete-item">
            <button
              aria-label="удалить из корзины"
              className="cart__delete-item-button"
              onClick={() =>
                dispatch(
                  removeCartItem({ user: userDocID, pizzaItem: product.id })
                )
              }
            ></button>
          </td>
        </tr>
      );
    });

    return (
      <div className="cart">
        <h1>Корзина</h1>
        <table className="cart__table">
          <thead>
            <tr>
              <td>Название</td>
              <td>Цена</td>
              <td>Количество</td>
              <td>Итого</td>
              <td>Удалить</td>
            </tr>
          </thead>
          <tbody>{productsRows}</tbody>
        </table>
        <span>Сумма заказа: {total}р.</span>
        <hr />
        <div className="cart__buttons">
          <button
            className="cart__button cart__button_type_cancel"
            onClick={() => {
              navigate(routesMap.pizzaItems);
            }}
          >
            На главную
          </button>
          <button
            className="cart__button cart__button_type_order"
            onClick={() => {
              dispatch(orderItemsDetailed(getProductsDetailed()));
              navigate(routesMap.order, { state: { total } });
            }}
          >
            Заказать
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default Cart;
