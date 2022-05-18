

import './header.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userUnset, userGetData } from '~s/actions/user';
import { Link } from 'react-router-dom';
import { routesMap } from '~r/routes';
import { NavLink } from 'react-router-dom';
import { Login } from '~c/Login/Login';
import UserInfo from '~c/UserInfo/UserInfo';
import { Form, Button, Modal } from 'react-bootstrap';

interface IRoutesMap {
  [index: string]: { name: string; img?: any };
}

const Header = () => {
  const props: any = useSelector(state => {
    return state;
  });
  const dispatch = useDispatch();

  const [isInfoShown, changeInfoShown] = useState(false);

  const email = props.user.user.email;
  const name = props.user.user.name;
  const surname = props.user.user.surname;
  const isAuthed = !!props.user.user.token;
  const cartImg = require('./img/cart-shopping.svg').default;



  /*в зависимости от того, авторизован ли пользователь, отображаем либо приветстсвие, 
либо форму для ввода логина и пароля*/
  const loginForm =
    isAuthed ? (
      <div className='header__auth'>
        <UserInfo
          username={name}
          usersurname={surname}
        ></UserInfo>
      </div >
    ) :
      (<div className='header__auth'>
        <p className='header__auth-link'><Link to={'/login'}>Войти</Link></p>
        <p>Еще не зарегистрированы?</p>
        <p
          className='header__auth-link'>
          <Link to={'/register'}>Зарегистрироваться</Link></p>
      </div>);

  const cart = (
    <NavLink
      to={routesMap.cart}>
      <div className='header__cart'>
        <img
          className='header__cart-img'
          src={cartImg} alt="корзина" />
      </div>
    </NavLink>
  );


  /*основное меню*/

  // eslint-disable-next-line no-undef
  const menuItems: JSX.Element[] = [];
  const pizzaItemsIMG = require('./img/logo.png').default;
  const list: IRoutesMap =
  {
    pizzaItems: { name: 'Главная', img: pizzaItemsIMG },
    about: { name: 'О нас' },
    deals: { name: 'Акции' },
    blog: { name: 'Блог' },
  };
  for (let key in routesMap) {
    if (key in list) {
      const hasImg = !!list[key].img;
      const name = hasImg ? '' : list[key].name;
      const menuItem = (
        <li
          className='header__nav-item'
          key={routesMap[key]}>
          <NavLink
            className='header__nav-link'
            to={routesMap[key]}>
            <img
              className='header__nav-img'
              src={list[key].img} alt="" />
            {name}
          </NavLink>
        </li>
      );
      menuItems.push(menuItem);
    }
  }



  return (
    <header className='header'>
      <nav className='header__nav'>
        <ul className='header__nav-list'>
          {menuItems}
        </ul>
      </nav>
      <div className='header__user'>
        {loginForm}
        {cart}
      </div>
    </header>
  );



};

export { Header };

