

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
    </footer>
  );
};

export { Footer };

