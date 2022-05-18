
import React from 'react';
import { Form } from '~c/Form/Form';
import { RegisterForm } from '~c/register-form/register-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userReg } from '~s/actions/user';

const SignUp = () => {

  const props: any = useSelector(state => {
    return state;
  });
  /*проверяем, авторизован ли пользователь*/
  const isAuthed = !!props.user.user.token;

  // const auth = getAuth(); // auth - данные для коннекта с firebase
  const dispatch = useDispatch();
  const navigate = useNavigate();


  /*если пользователь авторизован -  перекинуть на главную (пользователь зарегистрировался)*/
  if (isAuthed) {
    navigate('/');
  }

  return (
    <RegisterForm
      title="register"
      handleClick={(name, surname, email, pass) =>
        dispatch(userReg({ name, surname, email, pass }))}
    />
  );

  // return (
  //   <Form
  //     title="register"
  //     handleClick={(email, pass) =>
  //       dispatch(userReg(email, pass))}
  //   />
  // );

};

export { SignUp };