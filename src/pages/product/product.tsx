import { Link } from 'react-router-dom';
import E404 from '../../components/errors/404/404';
import { withParams } from '../../wrapper';
import ProductSingle from '../../components/cards/product-single/product-single';
import { routesMap } from '../../routes/routes';
import { useAppSelector } from '../../hooks';
import OrderButton from '../../components/buttons/order-button/order-button';
import './product.scss';

const Product = (data: any) => {
  const props: any = useAppSelector(state => {
    return state;
  });

  const id = data.params.id;
  const product =
    props.pizzaItems.pizzaItemsAll.find((item: any) => item.id == id);
  const cart = props.user.user.cart;
  const userDocID = props.user.user.userDocID;

  let inCart: any;
  if (cart != undefined) {
    inCart = cart.includes(id);
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




