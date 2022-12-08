import { Link } from 'react-router-dom';
import './product-card.scss';

import FavoritesButton from '../../../components/buttons/favorites-button/FavoritesButton';
import OrderButton from '../../../components/buttons/order-button/OrderButton';
import { urlBuilder } from '../../../routes/routes';

type TProps = {
  image: string;
  isavl: boolean;
  name: string;
  pizzaid: string;
  price: number;
  incart: boolean;
  userdocid: string;
  infav: boolean;
};

const ProductCard: React.FC<TProps> = (props) => {

  let isAvl = null;
  if (!props.isavl) {
    isAvl = <span> Нет в наличии</span>;
  }
  return (
    <>
      <div className='product-card'>
        <Link className='product-card__link'
          to={urlBuilder('productPage', { id: props.pizzaid })}>
          <h4
            className='product-card__header'>{props.name}</h4>
          <div className='product-card__img-wrapper'>
            <img
              className='product-card__img'
              src={props.image} alt="" />
          </div>

        </Link>
        <div className='product-card__info'>
          <strong className='product-card__price'>
            Цена: {props.price}р.</strong>
          <strong className='product-card__avl'>{isAvl}</strong>
        </div>

        <div className='product-card_order-button'>
          <OrderButton
            incart={props.incart}
            userdocid={props.userdocid}
            pizzaid={props.pizzaid}
            isavl={props.isavl}
          />
        </div>

        <div className='product-card__favorites-button'>
          <FavoritesButton
            infav={props.infav}
            userdocid={props.userdocid}
            pizzaid={props.pizzaid}
          />
        </div>
      </div>
    </>
  );
}

export default ProductCard;