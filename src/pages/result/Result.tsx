import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { TConst } from '../../interface';
import { routesMap } from '../../routes/routes';

import './result.scss';

const Result: React.FC = () => {
  const { total } = (useLocation() as TConst).state;
  const orderModel = useAppSelector((state) => state.order);

  return (
    <div className="order">
      <h1>Заказ успешно отправлен</h1>
      <span>{orderModel.lastOrderCache.name}, спасибо за заказ</span>
      <span>
        <strong>Итого: {total}</strong>
      </span>
      <div></div>
      <Link to={routesMap.pizzaItems} className="result__button">
        На главную
      </Link>
    </div>
  );
};

export default Result;
