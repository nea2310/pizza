import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './header.scss';
import UserInfo from '../user-info/user-info';
import { useAppSelector } from '../../hooks';
import { IStore } from '../../interface';
import { routesMap } from '../../routes/routes';

interface IRoutesMap {
  [index: string]: { name: string; };
}

export default function () {
  const props: IStore = useAppSelector(state => {
    return state;
  });

  const [details, setDetails] = useState(false);

  const contentClassName = details ? 'header__content_active' : '';
  const contentClasses = ['header__content', contentClassName];

  const burgerClassName = details ? 'header__burger-button_active' : '';
  const burgerClasses = ['header__burger-button', burgerClassName];

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
        <span><Link className='header__auth-link' to={'/login'}>Войти</Link></span>
        <span className='header__auth-text'>Еще не зарегистрированы?</span>
        <span>
          <Link className='header__auth-link' to={'/register'}>Зарегистрироваться</Link></span>
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
  const pizzaItemsIMG = require('./img/logo.png');
  const list: IRoutesMap =
  {
    about: { name: 'О нас' },
    deals: { name: 'Акции' },
    blog: { name: 'Блог' },
  };
  for (let key in routesMap) {
    if (key in list) {
      const name = list[key].name;
      const menuItem = (
        <li
          className='header__nav-item'
          key={routesMap[key]}>
          <NavLink
            className='header__nav-link'
            to={routesMap[key]}>
            {name}
          </NavLink>
        </li>
      );
      menuItems.push(menuItem);
    }
  }

  return (
    <header className='header'>
      <button
        aria-label="навигация"
        className={burgerClasses.join(' ')}
        onClick={() => setDetails(prev => !prev)}
      >
        <div
          className='header__burger'>
        </div>
      </button>
      <div className='header__wrapper'>
        <div className='header__logo'>
          <NavLink
            className='header__nav-link'
            to={routesMap.pizzaItems}>
            <img
              className='header__nav-img'
              src={pizzaItemsIMG} alt="" />
          </NavLink>
        </div>
        <div className={contentClasses.join(' ')}>
          <nav className='header__nav'>
            <ul className='header__nav-list'>
              {menuItems}
            </ul>
          </nav>
          <div className='header__user'>
            {loginForm}
            {cart}
          </div>
        </div>
      </div>
    </header>
  );
};



