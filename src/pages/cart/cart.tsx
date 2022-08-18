import { Link, useNavigate } from 'react-router-dom';
import { navigate } from "@reach/router";
import './cart.scss';
import { routesMap } from '../../routes/routes';
import AppMinMax from '../../components/inputs/minmax/minmax';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { cartChangeItem, cartRemoveItem } from '../../store/actions/cart';

const Cart = () => {
  const props: any = useAppSelector(state => {
    return state;
  });

  const navigate = useNavigate();

  const pizzaItemsAll = props.pizzaItems.pizzaItemsAll;
  const cartItems = props.cart.cartItems;
  const dispatch = useAppDispatch();
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
        <button
          className="btn btn-warning"
          onClick={() => {
            navigate(routesMap.home)
          }}
        >
          На главную
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
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
