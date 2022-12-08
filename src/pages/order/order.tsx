import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { TConst, IPizzaDetailsPartial } from '../../interface';
import { clearCart } from '../../store/slices/cartSlice';
import { orderChangeField, orderSetLastOrderCache } from '../../store/slices/orderSlice';
import { routesMap } from '../../routes/routes';


const Order: React.FC = () => {

  /* useLocation - используется для извлечения пропсов, передаваемых странице во втором параметре функции navigate 
   (см. страницу cart -->  onClick={() => { navigate(routesMap.order, { state: { total } }) }) */

  const { total } = (useLocation() as TConst).state;
  const { userDocID } = useAppSelector(state => state.user);
  const orderModel = useAppSelector(state => state.order);


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
          onChange={(event) => dispatch(orderChangeField({ name, value: event.target.value }))}
        />
        {field.valid === null || field.valid ? '' :
          <Form.Text className="text-muted">
            {field.errorText}
          </Form.Text>
        }
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
    });


  return (

    <div>
      <h2>Order</h2>
      <hr />
      <Form>
        {formFields}
      </Form>
      <Link className="btn btn-warning" to={routesMap.cart}>
        Back to cart
      </Link>
      &nbsp;
      <Button variant="primary"
        onClick={() => setShown(true)}
        disabled={!orderModel.formValid}>
        Apply order
      </Button>
      <Modal
        show={isShown}
        backdrop="static"
        onHide={() => setShown(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Check information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <tbody>
              {productsRows}
            </tbody>
          </table>
          <strong>Итого: {`${total} руб.`}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShown(false)}>
            Ooops
          </Button>
          <Button variant="primary" onClick={confirm}>
            All right
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Order;