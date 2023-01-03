import { Link } from 'react-router-dom';
import FavoritesButton from '../../../components/buttons/favorites-button/FavoritesButton';
import OrderButton from '../../../components/buttons/order-button/OrderButton';
import { urlBuilder } from '../../../routes/routes';
import './product-card.scss';

type TProps = {
  image: string;
  isavl: boolean;
  name: string;
  pizzaid: string;
  price: number;
  incart: boolean;
  userdocid: string | null;
  infav: boolean;
};

const ProductCard: React.FC<TProps> = (props) => {
  let isAvl = null;
  if (!props.isavl) {
    isAvl = 'Нет в наличии';
  }

  const imageClassName = isAvl ? 'product-card__img_inactive' : '';
  const imageClasses = ['product-card__img', imageClassName];
  return (
    <article className="product-card">
      {props.userdocid && (
        <div className="product-card__favorites-button">
          <FavoritesButton
            infav={props.infav}
            userdocid={props.userdocid}
            pizzaid={props.pizzaid}
          />
        </div>
      )}
      <div className="product-card__content">
        <h2 className="product-card__header">
          <Link
            className="product-card__link"
            to={urlBuilder('productPage', { id: props.pizzaid })}
          >
            {props.name}
          </Link>
        </h2>
        <img
          className={imageClasses.join(' ')}
          src={props.image}
          alt={props.name}
        />
      </div>

      <div className="product-card__bottom">
        <div className="product-card__info">
          <span className="product-card__price">Цена: {props.price}р.</span>
          {isAvl && <span className="product-card__avl">{isAvl}</span>}
        </div>

        <div className="product-card__order-button">
          {props.userdocid && (
            <OrderButton
              incart={props.incart}
              userdocid={props.userdocid}
              pizzaid={props.pizzaid}
              isavl={props.isavl}
            />
          )}
          {!props.userdocid && (
            <Link className="product-card__login" to={'/login'}>
              Заказать
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
