import { Link } from 'react-router-dom';
import './product-card.scss';
import { urlBuilder } from '../../../routes/routes';

type TProps = {
  image: string;
  isavl: any;
  name: string;
  pizzaid: string;
  price: number;
};

export default function (props: TProps) {

  return (
    <>
      <Link className='product-card__link'
        to={urlBuilder('productPage', { id: props.pizzaid }) as string}>
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
        <strong className='product-card__avl'>{props.isavl}</strong>
      </div>
    </>
  );
}