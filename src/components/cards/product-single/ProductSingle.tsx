import { LinkProps } from 'react-router-dom';
import './product-single.scss';

type TProps = {
  backUrl: string;
  image: string;
  ingredients: Array<string>;
  linkComponent: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
  name: string;
  price: number;
};

const ProductSingle: React.FC<TProps> = (props) => {

  const ingredients = props.ingredients.join(', ');

  return (
    <div className='product-single'>
      <h1 className='product-single__name'>{props.name}</h1>
      <div className='product-single__ingredients'>
        <strong>Состав: {ingredients}</strong>
      </div>

      <div className='product-single__img-wrapper'>
        <img className='product-single__img'
          src={props.image} alt={props.name} />
      </div>

      <div className='product-single__price'>
        <strong>Цена: {props.price}р.</strong>
      </div>

      <props.linkComponent
        className='product-single__back-link'
        to={props.backUrl}>Вернуться к меню</props.linkComponent>
    </div>
  );
}

export default ProductSingle;