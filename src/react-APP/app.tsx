
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes }
  from 'react-router-dom';
import routes, { routesMap } from '~r/routes';
import './app.scss';

import { connect } from 'react-redux';
import { productsFetchData, productsFetchDataFS } from '~s/actions/products';
import { cartFetchData } from '~s/actions/cart';
import { userFetch } from '~s/actions/user';
import { pizzaItemsFetchData } from '~s/actions/pizzaItems';
import base from './firebase';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '~c/Login/Login';
import { userUnset } from '~s/actions/user';
import { Link } from 'react-router-dom';
import { Header } from '~c/header/header';
import { Footer } from '~c/Footer/Footer';




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


  const props: any = useSelector(state => {
    return state;
  });




  const isAuthed = !!props.user.user.token;
  const email = props.user.user.email;
  const name = props.user.user.name;
  const surname = props.user.user.surname;

  const userDocID = props.user.user.userDocID;

  const dispatch = useDispatch();

  useEffect(() => {
    /*запрашиваем продукты с сервера*/
    dispatch(productsFetchData());
    /*запрашиваем корзину с сервера*/
    dispatch(pizzaItemsFetchData());
    //  dispatch(cartFetchData());
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
