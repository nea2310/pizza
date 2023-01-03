import { useAppDispatch } from '../../../hooks';
import { addCartItem, removeCartItem } from '../../../store/slices/cartSlice';
import './order-button.scss';

type TProps = {
  incart: boolean;
  isavl: boolean;
  userdocid: string;
  pizzaid: string;
};

const OrderButton: React.FC<TProps> = (props) => {
  const dispatch = useAppDispatch();
  let isAdding = true;
  let type = 'order-button order-button_type_order';
  let text = 'Заказать';

  let handleClick = (user: string, pizzaItem: string) => {
    dispatch(addCartItem({ user, pizzaItem }));
  };

  if (props.incart) {
    isAdding = false;
    type = 'order-button order-button_type_cancel';
    text = 'Отменить';
    handleClick = (user: string, pizzaItem: string) => {
      dispatch(removeCartItem({ user, pizzaItem }));
    };
  }

  return (
    <button
      className={type}
      disabled={!props.isavl}
      onClick={() => handleClick(props.userdocid, props.pizzaid)}
    >
      {text}
    </button>
  );
};

export default OrderButton;
