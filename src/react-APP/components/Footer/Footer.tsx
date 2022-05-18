

import './footer.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userUnset, userGetData } from '~s/actions/user';
import { Link } from 'react-router-dom';
import { routesMap } from '~r/routes';
import { NavLink } from 'react-router-dom';
import { Login } from '~c/Login/Login';
import UserInfo from '~c/UserInfo/UserInfo';
import { Form, Button, Modal } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__image'></div>
      <div className='footer__info'>
        <div className='footer__info-column'>
          <header className='footer__info-column-header'>
            ждем вас в наших ресторанах
          </header>
          <p className='footer__info-column-block'>
            <span className='footer__info-column-row'>Уфа, центр</span>
            <span className='footer__info-column-row'>Парковая, 1</span>
            <span className='footer__info-column-row'>123-45-67</span>
          </p>
          <p className='footer__info-column-block'>
            <span className='footer__info-column-row'>Уфа, Цветы Башкирии</span>
            <span className='footer__info-column-row'>Цветочная, 1</span>
            <span className='footer__info-column-row'>123-45-67</span>
          </p>
          <p className='footer__info-column-block'>
            <span className='footer__info-column-row'>Уфа, р-н Молодежный</span>
            <span className='footer__info-column-row'>Молодежная, 1</span>
            <span className='footer__info-column-row'>123-45-67</span>
          </p>
        </div>
        <div className='footer__info-column'>
          <header className='footer__info-column-header'>
            мы открыты для вас
          </header>
          <p className='footer__info-column-block'>
            <span className='footer__info-column-row'>
              понедельник - четверг
            </span>
            <span className='footer__info-column-row'>9:00 - 22:00</span>
          </p>
          <p className='footer__info-column-block'>
            <span className='footer__info-column-row'>
              пятница - воскресенье
            </span>
            <span className='footer__info-column-row'>11:00 - 24:00</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };

