import { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { TConst, IPizzaDetailsPartial } from '../../interface';
import { clearCart } from '../../store/slices/cartSlice';
import {
  orderChangeField,
  orderSetLastOrderCache,
} from '../../store/slices/orderSlice';
import { routesMap } from '../../routes/routes';
import './order.scss';

const Order: React.FC = () => {
  /* useLocation - используется для извлечения пропсов, передаваемых странице во втором параметре функции navigate 
   (см. страницу cart -->  onClick={() => { navigate(routesMap.order, { state: { total } }) }) */

  // const { total } = (useLocation() as TConst).state; - так не работают тесты
  const { total } = useLocation().state as { total: number };
  const { userDocID } = useAppSelector((state) => state.user);
  const orderModel = useAppSelector((state) => state.order);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [isShown, setShown] = useState(false);

  const confirm = () => {
    setShown(false);
    dispatch(orderSetLastOrderCache());
    /* очистить корзину */
    if (userDocID) {
      dispatch(clearCart(userDocID));
    }

    navigate(routesMap.result, { state: { total } });
  };

  let formFields = [];

  for (let name in orderModel.formData) {
    let field = orderModel.formData[name];

    formFields.push(
      <Form.Group key={name} controlId={'order-form-' + name}>
        <Form.Label>{field.label}</Form.Label>
        <Form.Control
          type="text"
          value={field.value}
          onChange={(event) =>
            dispatch(orderChangeField({ name, value: event.target.value }))
          }
        />
        {field.valid === null || field.valid ? (
          ''
        ) : (
          <Form.Text className="text-muted">{field.errorText}</Form.Text>
        )}
      </Form.Group>
    );
  }

  let productsRows = orderModel.orderItemsDetailed.map(
    (product: IPizzaDetailsPartial) => {
      return (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{`${product.cnt} шт.`}</td>
          <td>{`${product.price} руб. за 1 штуку`}</td>
        </tr>
      );
    }
  );

  return (
    <div className="order">
      <h1>Ваш заказ</h1>
      <hr />
      <Form className="order__form">{formFields}</Form>
      <Link
        className="order__button order__button_type_back"
        to={routesMap.cart}
      >
        Вернуться в корзину
      </Link>
      &nbsp;
      <button
        className="order__button order__button_type_order"
        onClick={() => setShown(true)}
        disabled={!orderModel.formValid}
      >
        Заказать
      </button>
      <Modal show={isShown} backdrop="static" onHide={() => setShown(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Детали заказа</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <tbody>{productsRows}</tbody>
          </table>
          <strong>Итого: {`${total} руб.`}</strong>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="order__button order__button_type_cancel"
            onClick={() => setShown(false)}
          >
            Отменить
          </button>
          <button
            className="order__button order__button_type_confirm"
            onClick={confirm}
          >
            ОК
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Order;
