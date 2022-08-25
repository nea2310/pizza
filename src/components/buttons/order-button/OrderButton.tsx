import { Button } from 'react-bootstrap';
import './order-button.scss';
import { useAppDispatch } from '../../../hooks'
import { cartAddItem, cartRemoveItem } from '../../../store/actions/cart';

type TProps = {
  incart: boolean;
  isavl: boolean;
  userdocid: string;
  pizzaid: string;
};

export default function (props: TProps) {

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
    handleClick = (user: string, pizza: string) => {
      dispatch(cartRemoveItem(user, pizza));
    };
  }

  return (
    <Button
      variant={type}
      disabled={!props.isavl}
      onClick={() => handleClick(props.userdocid,
        props.pizzaid)}
    >
      {text}
    </Button>
  );
}