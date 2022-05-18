import React, { useEffect, useState, useRef } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './product.scss';
import E404 from '~c/errors/404/404';
import { IProps, IProduct } from '~/interface.d';
import { withParams } from '~/wrapper';
import ProductSingle from '~c/cards/product-single/product-single';
import { routesMap } from '~r/routes';
import { userUpdateFavItems } from '~s/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import OrderButton from '~c/buttons/order-button/order-button';
import './product.scss';
interface Props extends IProps {
  params: { [id: string]: number };
}

const Product = (data: any) => {
  const props: any = useSelector(state => {
    return state;
  });

  const id = data.params.id;
  const product =
    props.pizzaItems.pizzaItemsAll.find((item: any) => item.id == id);
  const cart = props.user.user.cart;
  const userDocID = props.user.user.userDocID;

  let inCart: any;
  if (cart != undefined) {
    inCart = cart.includes(id);
  }

  if (!id) {
    return <E404 />;
  }
  else if (product) {
    return <section className='product-page'>
      <div className='product-page__product-single product-single'>
        <ProductSingle
          name={product.name}
          price={product.price}
          image={product.image}
          ingredients={product.ingredients}
          backUrl={routesMap.pizzaItems}
          linkComponent={Link}
        />
      </div>

      <div className='product-page__order-button order-button'>
        <OrderButton
          incart={inCart}
          userdocid={userDocID}
          pizzaid={product.id}
          isavl={!product.available}
        />
      </div>
    </section>;

  } else return null;
};

export default withParams(Product);




