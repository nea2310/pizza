import { Link } from 'react-router-dom';
import './product-single.scss';

type TProps = {
  backUrl: string;
  image: string;
  ingredients: Array<string>;
  name: string;
  price: number;
};

const ProductSingle: React.FC<TProps> = (props) => {
  const ingredients = props.ingredients.join(', ');

  return (
    <section className="product-single">
      <h1 className="product-single__name">{props.name}</h1>
      <span className="product-single__ingredients">Состав: {ingredients}</span>
      <img className="product-single__img" src={props.image} alt={props.name} />
      <span className="product-single__price">Цена: {props.price}р.</span>

      <Link className="product-single__back-link" to={props.backUrl}>
        Вернуться к меню
      </Link>
    </section>
  );
};

export default ProductSingle;
