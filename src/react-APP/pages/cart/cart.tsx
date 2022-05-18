import React from 'react';
import { Link } from 'react-router-dom';
import './cart.scss';
import { routesMap } from '~r/routes';
import AppMinMax from '~c/inputs/minmax/minmax';
import { IProduct } from '~/interface.d';

import { useDispatch, useSelector } from 'react-redux';
import { cartChangeItem, cartRemoveItem } from '~s/actions/cart';

const Cart = () => {
  const props: any = useSelector(state => {
    return state;
  });

  const pizzaItemsAll = props.pizzaItems.pizzaItemsAll;
  const cartItems = props.cart.cartItems;
  const dispatch = useDispatch();
  const userDocID = props.user.user.userDocID;

  const getProductsDetailed = (): any => {
    if (pizzaItemsAll.length) {
      const items = cartItems.map((cartItem: any) => {
        let product = pizzaItemsAll.find(
          (product: any) => product.id in cartItem);
        const item = { ...product, cnt: cartItem[product.id] };
        return item;
      });
      return items;
    } else return [];
  };

  const getTotal = () => {
    return getProductsDetailed().reduce(
      (t: any, pr: any) => t + pr.price * pr.cnt, 0);
  };

  let total = 0;
  let productsRows: any = [];

  if (pizzaItemsAll.length) {
    total = getTotal();
    let products = getProductsDetailed();

    productsRows = products.map(
      (product: any) => {
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
        <Link to={routesMap.home} className="btn btn-warning">
          На главную
        </Link>
        <Link to={routesMap.order} className="btn btn-primary">
          Заказать
        </Link>
      </div>
    </div>
  );
};

export default Cart;
