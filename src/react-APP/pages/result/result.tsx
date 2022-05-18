import React from 'react';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import { routesMap } from '~r/routes';

import { connect } from 'react-redux';
import {
  IOrder, ICart, IProducts,
} from '~/interface.d';

interface Props {
  stores?: {
    cart: ICart,
    order: IOrder,
    products: IProducts,
  }
}

class Result extends React.Component<any> {
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
  render() {

    const orderModel = this.props.order;
    return (
      <div>
        <h2>Congratulations!</h2>
        <p>Hi, {orderModel.lastOrderCache.name}!</p>
        <p><strong>Total: {this.total}</strong></p>
        <div>
        </div>
        <Link to={routesMap.home} className="btn btn-warning">
          На главную
        </Link>
      </div>
    );
  }
}

let mapStateToProps = (state: any) => {
  return {
    products: state.productItems,
    cart: state.cart,
    order: state.order,
  };
};

export default connect(mapStateToProps)(Result);