import { useNavigate } from 'react-router-dom';
import './cart.scss';
import { routesMap } from '../../routes/routes';
import AppMinMax from '../../components/inputs/minmax/AppMinMax';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IStore, IPizzaDetails, IPizzaDetailsPartial, IPizzaDetailsExtended } from '../../interface';
import { cartChangeItem, cartRemoveItem } from '../../store/actions/cart';
import { orderItemsDetailed } from '../../store/actions/order';
import { JSXElementConstructor, ReactElement, ReactFragment } from 'react';

const Cart = () => {

  const props: IStore = useAppSelector(state => {
    return state;
  });

  const navigate = useNavigate();

  const pizzaItemsAll = props.pizzaItems.pizzaItemsAll;
  const cartItems = props.cart.cartItems;
  const dispatch = useAppDispatch();
  const userDocID = props.user.userDocID;




  if (pizzaItemsAll.length) {
    const getProductsDetailed = (): Array<IPizzaDetailsExtended> => {
      const items = cartItems.map((cartItem) => {
        const product = pizzaItemsAll.find(
          (product) => product.id in cartItem);
        const item = product ? { ...product, cnt: cartItem[product.id] } : {
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
      return products.reduce(
        (t: number, pr: IPizzaDetailsPartial) => {
          if (!pr.price || !pr.cnt) return 0;
          return t + pr.price * pr.cnt
        }, 0
      );
    };

    const total = getTotal();
    const productsRows = products.map(
      (product) => {
        if (!product.price || !product.cnt) return 0;
        return (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <AppMinMax
                min={1}
                max={50}
                cnt={product.cnt}
                onChange={(cnt) => dispatch(cartChangeItem(
                  userDocID, product.id, cnt))}
              />
            </td>
            <td>{product.price * product.cnt}</td>
            <td>
              <button onClick={() => dispatch(cartRemoveItem(
                userDocID, product.id))}>
                X
              </button>
            </td>
          </tr>
        );
      });

    return (
      <div>
        <h2>Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <td>Title</td>
              <td>Price</td>
              <td>Count</td>
              <td>Total</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {productsRows}
          </tbody>
        </table>
        <h3>Сумма заказа: {total} </h3>
        <hr />
        <div className='cart__btns'>
          <button
            className="btn btn-warning"
            onClick={() => {
              navigate(routesMap.pizzaItems)
            }}
          >
            На главную
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(orderItemsDetailed(getProductsDetailed()));
              navigate(routesMap.order, { state: { total } })
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
