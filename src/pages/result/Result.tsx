import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { TConst } from '../../interface';
import { routesMap } from '../../routes/routes';

const Result: React.FC = () => {

  const { total } = (useLocation() as TConst).state;
  const orderModel = useAppSelector(state => state.order);

  return (
    <div>
      <h2>Congratulations!</h2>
      <p>Hi, {orderModel.lastOrderCache.name}!</p>
      <p><strong>Total: {total}</strong></p>
      <div>
      </div>
      <Link to={routesMap.pizzaItems} className="btn btn-warning">
        На главную
      </Link>
    </div>
  );
}

export default Result;