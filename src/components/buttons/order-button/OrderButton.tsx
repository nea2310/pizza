import { Button } from 'react-bootstrap';
import './order-button.scss';
import { useAppDispatch } from '../../../hooks'
import { addCartItem, removeCartItem } from '../../../store/slices/cartSlice';

type TProps = {
  incart: boolean;
  isavl: boolean;
  userdocid: string;
  pizzaid: string;
};

const OrderButton: React.FC<TProps> = (props) => {

  const dispatch = useAppDispatch();
  let isAdding = true;
  let type = "success";
  let text = "Заказать";

  let handleClick = (user: string, pizzaItem: string) => {
    dispatch(addCartItem({ user, pizzaItem }));
  };

  if (props.incart) {
    isAdding = false;
    type = "danger";
    text = "Отменить заказ";
    handleClick = (user: string, pizzaItem: string) => {
      dispatch(removeCartItem({ user, pizzaItem }));
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

export default OrderButton;

