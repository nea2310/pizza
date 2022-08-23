import { Link } from 'react-router-dom';
import E404 from '../../components/errors/404/404';
import { withParams } from '../../wrapper';
import ProductSingle from '../../components/cards/product-single/ProductSingle';
import { routesMap } from '../../routes/routes';
import { useAppSelector } from '../../hooks';
import { IStore, IPizzaDetails } from '../../interface';
import OrderButton from '../../components/buttons/order-button/OrderButton';
import './product.scss';

interface IData {
  params: {
    id: string
  }
}

const Product = (data: IData) => {

  const props: IStore = useAppSelector(state => {
    return state;
  });

  const id = data.params.id;
  const product =
    props.pizzaItems.pizzaItemsAll.find((item: IPizzaDetails) => item.id == id);
  const cart = props.cart;
  const userDocID = props.user.userDocID;

  let inCart: boolean = false;
  if (cart != undefined) {
    inCart = Boolean(cart.cartItems.find((item: any) => item[id]));
  }

  if (!id) {
    return <E404 />;
  }
  else if (product) {
    return <section className='product-page'>
      <div className='product-page__product-single product-single'>
        <ProductSingle
          name={product.name}
          price={product.price}
          image={product.image}
          ingredients={product.ingredients}
          backUrl={routesMap.pizzaItems}
          linkComponent={Link}
        />
      </div>

      <div className='product-page__order-button order-button'>
        <OrderButton
          incart={inCart}
          userdocid={userDocID}
          pizzaid={product.id}
          isavl={!product.available}
        />
      </div>
    </section>;

  } else return null;
};

export default withParams(Product);




