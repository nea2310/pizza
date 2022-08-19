
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink }
  from 'react-router-dom';
import routes, { routesMap } from './routes/routes';
import './App.scss';

import { userFetch } from './store/actions/user';
import { pizzaItemsFetchData } from './store/actions/pizzaItems';
import { useAppDispatch } from './hooks';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';





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



const App = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    /*запрашиваем корзину с сервера*/
    dispatch(pizzaItemsFetchData());

    /*запрашиваем пользователя с сервера*/
    dispatch(userFetch());
  }, []);

  // eslint-disable-next-line no-undef
  const menuItems: JSX.Element[] = [];

  const list: IRoutesMap =
  {
    pizzaItems: 'Главная',
    cart: 'Корзина',
    order: 'Заказать сейчас',
    home: 'OLD',
  };
  for (let key in routesMap) {
    if (key in list) {
      const menuItem = (
        <li key={routesMap[key]} className='aside-menu__item'>
          <NavLink className='aside-menu__link' to={routesMap[key]}>
            {list[key]}
          </NavLink>
        </li>);
      menuItems.push(menuItem);
    }
  }

  let routesComponents = routes.map((route: IRoute) => {
    return <Route path={route.url}
      element={route.component}
      key={route.url}
    />;
  });



  return (
    <Router>
      <Header />
      <main className='main'>
        <Routes>
          {routesComponents}
        </Routes>
      </main>
      <Footer />
    </Router>
  );

};


export default App;
