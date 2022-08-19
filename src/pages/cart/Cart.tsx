import { useNavigate } from 'react-router-dom';
import './cart.scss';
import { routesMap } from '../../routes/routes';
import AppMinMax from '../../components/inputs/minmax/AppMinMax';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IStore, IPizzaDetails, IPizzaDetailsPartial } from '../../interface';
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
  const userDocID = props.user.user.userDocID;

  const getProductsDetailed = () => {
    if (pizzaItemsAll.length) {
      const items = cartItems.map((cartItem: { [index: string]: number }) => {
        let product = pizzaItemsAll.find(
          (product: IPizzaDetails) => product.id in cartItem);
        const item = { ...product, cnt: cartItem[(product as IPizzaDetails).id] };
        return item;
      });
      return items;

    } else return [];
  };

  const getTotal = () => {
    return getProductsDetailed().reduce(
      (t: number, pr: IPizzaDetailsPartial) => {
        if (!pr.price || !pr.cnt) return 0;
        return t + pr.price * pr.cnt
      }, 0
    );
  };

  let total = 0;
  let productsRows: string | number | boolean | (JSX.Element | 0)[] | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | null | undefined = [];

  if (pizzaItemsAll.length) {
    total = getTotal();
    let products = getProductsDetailed();

    productsRows = products.map(
      (product: IPizzaDetailsPartial) => {
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
                onChange={(cnt: number) => dispatch(cartChangeItem(
                  userDocID, product.id as string, cnt))}
              />
            </td>
            <td>{product.price * product.cnt}</td>
            <td>
              <button onClick={() => dispatch(cartRemoveItem(
                userDocID, product.id as string))}>
                X
              </button>
            </td>
          </tr>
        );
      });
  }


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
};

export default Cart;
