import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { routesMap } from '../../routes/routes';
import { orderChangeField, orderSetLastOrderCache } from '../../store/actions/order';
import { useAppDispatch, useAppSelector } from '../../hooks';

import {
  TConst
} from '../../interface.d';

export default function () {

  // useLocation - используется для извлечения пропсов, передаваемых странице во втором параметре функции navigate 
  // (см. страницу cart -->  onClick={() => { navigate(routesMap.order, { state: { total } }) })

  const { total } = (useLocation() as TConst).state;

  const props: any = useAppSelector(state => {
    return state;
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [isShown, setShown] = useState(false);

  const confirm = () => {
    setShown(false);
    dispatch(orderSetLastOrderCache());
    navigate(routesMap.result, { state: { total } });
  };

  let orderModel = props.order;
  let formFields = [];

  for (let name in orderModel.formData) {
    let field = orderModel.formData[name];

    formFields.push(
      <Form.Group key={name} controlId={'order-form-' + name}>
        <Form.Label>{field.label}</Form.Label>
        <Form.Control
          type="text"
          value={field.value}
          onChange={(e) => dispatch(orderChangeField(name, e.target.value))}
        />
        {field.valid === null || field.valid ? '' :
          <Form.Text className="text-muted">
            {field.errorText}
          </Form.Text>
        }
      </Form.Group>
    );
  }

  let productsRows = orderModel.cartItemsDetailed.map(
    (product: any) => {
      return (
        <tr key={product.id}>
          <td>{product.title}</td>
          <td>{product.price}</td>
          <td>{product.cnt}</td>
          <td>{product.price * product.cnt}</td>
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
          <strong>Total: {total}</strong>
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