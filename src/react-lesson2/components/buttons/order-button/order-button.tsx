import React, { Dispatch } from 'react';
import './order-button.scss';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { userUpdateFavItems } from '~s/actions/user';
import { cartAddItem, cartRemoveItem } from '~s/actions/cart';

import {
  ICartFetchDataSuccess,
  ICartAddDataSuccess,
  ICartChangeItemSuccess,
  ICartRemoveItemSuccess,
  ICartItemsRaw
} from '~/interface';


export default function (props: any) {
  const dispatch = useDispatch();
  let isAdding = true;
  let type = "success";
  let text = "Заказать";

  let handleClick = (user: string, pizza: string) => {
    dispatch(cartAddItem(user, pizza));
  };

  if (props.incart) {
    isAdding = false;
    type = "danger";
    text = "Отменить заказ";
    handleClick = (user: any, pizza: any) => {
      dispatch(cartRemoveItem(user, pizza));
    };
  }

  return (
    <Button
      variant={type}
      disabled={props.isavl}
      onClick={() => handleClick(props.userdocid,
        props.pizzaid)}
    >
      {text}
    </Button>
  );
}