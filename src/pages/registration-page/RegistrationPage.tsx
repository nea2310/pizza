import { Link } from 'react-router-dom';
import './registration-page.scss';
import { SignUp } from '../../components/registration/Registration';

const RegisterPage = () => {
  return (
    <div className='registration-page'>
      <h1 className='registration-page__header'>Регистрация</h1>
      <SignUp />
      <p> Уже зарегистрированы? <Link to={'/login'}>Войти</Link></p>
    </div>
  );
};


export default RegisterPage;