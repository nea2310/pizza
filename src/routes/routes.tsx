import Home from '../pages/home/home';
import Cart from '../pages/cart/cart';
import Order from '../pages/order/order';
import Result from '../pages/result/result';
import Page404 from '../pages/error404/error404';
import Product from '../pages/product/product';
import LoginPage from '../pages/login/login';
import PizzaItems from '../pages/pizzaItems/pizzaItems';
import RegisterPage from '../pages/register/register';
import Blog from '../pages/blog/blog';
import AboutUs from '../pages/about/about';
import Deals from '../pages/deals/deals';

interface IRoute {
  name?: string;
  url: string
  // eslint-disable-next-line no-undef
  component: JSX.Element,
  exact?: boolean
}

interface IRoutesMap {
  [index: string]: string;
}

let routes: IRoute[] = [
  {
    name: 'pizzaItems',
    url: '/',
    component: <PizzaItems />,
    exact: true
  },
  {
    name: 'home',
    url: '/home',
    component: <Home />,
    exact: true
  },
  {
    name: 'cart',
    url: '/cart',
    component: <Cart />,
    exact: true
  },

  {
    name: 'order',
    url: '/order',
    component: <Order />,
    exact: true
  },
  {
    name: 'result',
    url: '/done',
    component: <Result />,
    exact: true
  },
  {
    name: 'productPage',
    url: '/product/:id',
    component: <Product />,
    exact: true
  },
  {
    name: 'login',
    url: '/login',
    component: <LoginPage />,
    exact: true
  },
  {
    name: 'register',
    url: '/register',
    component: <RegisterPage />,
    exact: true
  },
  {
    name: 'about',
    url: '/about',
    component: <AboutUs />,
    exact: true
  },
  {
    name: 'deals',
    url: '/deals',
    component: <Deals />,
    exact: true
  },
  {
    name: 'blog',
    url: '/blog',
    component: <Blog />,
    exact: true
  },

  {
    url: '*',
    component: <Page404 />
  }
];

let routesMap = {} as IRoutesMap;

routes.forEach((route) => {
  // eslint-disable-next-line no-prototype-builtins
  if (route.hasOwnProperty('name') && route.name) {
    routesMap[route.name] = route.url;
  }
});

let urlBuilder = function (name: any, params: any) {

  // eslint-disable-next-line no-prototype-builtins
  if (!routesMap.hasOwnProperty(name)) {
    return null;
  }

  let url = routesMap[name]; // news/:id

  for (let key in params) {
    url = url.replace(':' + key, params[key]);
  }

  return url;
};

export default routes;
export { routesMap, urlBuilder };