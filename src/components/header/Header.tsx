import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserInfo from '../user-info/UserInfo';
import { useAppSelector } from '../../hooks';
import { routesMap } from '../../routes/routes';
import logo from './img/logo.png';
import './header.scss';

interface IRoutesMap {
  [index: string]: { name: string };
}

const Header: React.FC = () => {
  const [details, setDetails] = useState(false);

  const contentClassName = details ? 'header__content_active' : '';
  const contentClasses = ['header__content', contentClassName];

  const burgerClassName = details ? 'header__burger-button_active' : '';
  const burgerClasses = ['header__burger-button', burgerClassName];
  const { token, name, surname } = useAppSelector((state) => state.user);

  const isAuthed = !!token;

  /*в зависимости от того, авторизован ли пользователь, отображаем либо приветствие, 
либо форму для ввода логина и пароля*/
  const loginForm = isAuthed ? (
    <div className="header__auth">
      <UserInfo username={name} usersurname={surname}></UserInfo>
    </div>
  ) : (
    <div className="header__auth">
      <span>
        <Link className="header__auth-link" to={'/login'}>
          Войти
        </Link>
      </span>
      <span className="header__auth-text">Еще не зарегистрированы?</span>
      <span>
        <Link className="header__auth-link" to={'/register'}>
          Зарегистрироваться
        </Link>
      </span>
    </div>
  );

  const cart = (
    <Link
      onClick={() => setDetails(false)}
      className="header__cart"
      to={routesMap.cart}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <title>Корзина</title>
        <path
          d="M176 416C149.49 416 128 437.49 128 464S149.49 512 176 512S224 490.51 224 464S202.51 416 176 416ZM464 416C437.49 416 416 437.49 416 464S437.49 512 464 512S512 490.51 512 464S490.51 416 464 416ZM569.529 44.734C563.42 36.641 554.107 32 543.967 32H121.957L119.578 19.51C117.422 8.189 107.523 0 96 0H24C10.746 0 0 10.744 0 24C0 37.254 10.746 48 24 48H76.141L136.424 364.488C138.58 375.809 148.479 384 160.002 384H488C501.254 384 512 373.254 512 360C512 346.744 501.254 336 488 336H179.859L170.717 288H489.123C503.406 288 515.959 278.531 519.885 264.797L574.748 72.797C577.529 63.047 575.623 52.828 569.529 44.734ZM477.049 240H161.574L131.1 80H522.77L477.049 240Z"
          fill="#FFF5E2"
        />
      </svg>
    </Link>
  );

  /*основное меню*/

  const menuItems: JSX.Element[] = [];
  const list: IRoutesMap = {
    about: { name: 'О нас' },
    deals: { name: 'Акции' },
    blog: { name: 'Блог' },
  };

  for (let key in routesMap) {
    if (key in list) {
      const name = list[key].name;
      const menuItem = (
        <li className="header__nav-item" key={routesMap[key]}>
          <Link
            onClick={() => setDetails(false)}
            className="header__nav-link"
            to={routesMap[key]}
          >
            {name}
          </Link>
        </li>
      );
      menuItems.push(menuItem);
    }
  }

  return (
    <header className="header">
      <button
        aria-label="главное меню"
        className={burgerClasses.join(' ')}
        onClick={() => setDetails((prev) => !prev)}
      >
        <div className="header__burger"></div>
      </button>
      <div className="header__wrapper">
        <div className="header__logo">
          <Link className="header__nav-link" to={routesMap.pizzaItems}>
            <img
              className="header__nav-img"
              src={logo}
              alt="главная страница"
            />
          </Link>
        </div>
        <div className={contentClasses.join(' ')}>
          <nav className="header__nav">
            <ul className="header__nav-list">{menuItems}</ul>
          </nav>
          <div className="header__user">
            {loginForm}
            {cart}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
