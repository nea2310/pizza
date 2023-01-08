import E404 from '../../components/errors/e-404/E404';
import { IPizzaDetails } from '../../interface';
import OrderButton from '../../components/buttons/order-button/OrderButton';
import ProductSingle from '../../components/cards/product-single/ProductSingle';
import { routesMap } from '../../routes/routes';
import { useAppSelector } from '../../hooks';
import { withParams } from '../../wrapper';
import './product.scss';

interface IData {
  params: {
    id: string;
  };
}

const Product: React.FC<IData> = (data) => {
  const id = data.params.id;
  const { pizzaItemsAll } = useAppSelector((state) => state.pizzaItems.data);
  const product = pizzaItemsAll.find((item: IPizzaDetails) => item.id == id);
  const cart = useAppSelector((state) => state.cart.cartItems);
  const { userDocID } = useAppSelector((state) => state.user);

  let inCart: boolean = false;
  if (cart != undefined) {
    inCart = Boolean(cart.find((item: any) => item[id]));
  }

  if (!id) {
    return <E404 />;
  } else if (product) {
    return (
      <div className="product-page">
        <div className="product-page__product-single">
          <ProductSingle
            name={product.name}
            price={product.price}
            image={product.image}
            ingredients={product.ingredients}
            backUrl={routesMap.pizzaItems}
          />
        </div>

        {userDocID && (
          <div className="product-page__order-button">
            <OrderButton
              incart={inCart}
              userdocid={userDocID}
              pizzaid={product.id}
              isavl={product.available}
            />
          </div>
        )}
      </div>
    );
  } else return null;
};

export default withParams(Product);
