import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { routesMap } from '~r/routes';
import { withRouter } from '~/wrapper';
import { IProps } from '~/interface.d';
import { connect } from 'react-redux';
import order from '~/store-1/order';
import { orderChangeField, orderSetLastOrderCache } from '~s/actions/order';


interface Props extends IProps {
  navigate: Function;
}
interface State {
  showModal: boolean
}


class Order extends React.Component<any, any> {
  props: any;
  constructor(props: any) {
    super(props);
    this.state = { showModal: false };
    this.props = props;
  }


  get productsDetailed() {
    if (this.props.products.productItems.length) {
      return this.props.cart.cartItems.map((pr: any) => {
        let product = this.props.products.productItems.find(
          (product: any) => product.id === pr.id);
        return { ...product, cnt: pr.cnt };
      });
    } else return [];
  }

  get total() {
    return this.productsDetailed.reduce(
      (t: any, pr: any) => t + pr.price * pr.cnt, 0);
  }



  show = () => {
    this.setState({ showModal: true });
  };

  hide = () => {
    this.setState({ showModal: false });
  };

  confirm = () => {
    this.hide();
    this.props.setCache();
    // this.props.stores.cart.clean();
    this.props.navigate(routesMap.result);
  };


  render() {
    let orderModel = this.props.order;
    // let cartModel = this.props.cart;
    let formFields = [];

    for (let name in orderModel.formData) {
      let field = orderModel.formData[name];

      formFields.push(
        <Form.Group key={name} controlId={'order-form-' + name}>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            type="text"
            value={field.value}
            onChange={(e) => this.props.change(name, e.target.value)}
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
        <Link className="btn btn-warning" to={routesMap.home}>
          Back to cart
        </Link>
        &nbsp;
        <Button variant="primary"
          onClick={this.show}
          disabled={!orderModel.formValid}>
          Apply order
        </Button>
        <Modal
          show={this.state.showModal}
          backdrop="static"
          onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title>Check information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table>
              <tbody>
                {productsRows}
              </tbody>
            </table>
            <strong>Total: {this.total}</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hide}>
              Ooops
            </Button>
            <Button variant="primary" onClick={this.confirm}>
              All right
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

let mapDispatchToProps = (dispatch: any) => {
  return {
    change: (name: any, value: any) =>
      dispatch(orderChangeField(name, value)),
    setCache: () =>
      dispatch(orderSetLastOrderCache()),

  };
};

let mapStateToProps = (state: any) => {
  return {
    products: state.productItems,
    cart: state.cart,
    order: state.order,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));