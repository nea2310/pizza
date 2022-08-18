import { Link, useLocation } from 'react-router-dom';

import { routesMap } from '../../routes/routes';

import { useAppSelector } from '../../hooks';
import {
  TConst
} from '../../interface.d';



export default function () {

  const { total } = (useLocation() as TConst).state;

  const props: any = useAppSelector(state => {
    return state;
  });

  const orderModel = props.order;

  return (
    <div>
      <h2>Congratulations!</h2>
      <p>Hi, {orderModel.lastOrderCache.name}!</p>
      <p><strong>Total: {total}</strong></p>
      <div>
      </div>
      <Link to={routesMap.home} className="btn btn-warning">
        На главную
      </Link>
    </div>
  );
}