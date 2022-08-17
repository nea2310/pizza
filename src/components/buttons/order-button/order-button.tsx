import React from 'react';
import './order-button.scss';
import { Button } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../../hooks'
import { cartAddItem, cartRemoveItem } from '../../../store/actions/cart';

export default function (props: any) {
  const dispatch = useAppDispatch();
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