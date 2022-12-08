
import { Link } from 'react-router-dom';
import './login-page.scss'
import Login from '../../components/login/Login';

const LoginPage: React.FC = () => {

  return (
    <div className='login-page'>
      <h1 className='login-page__header'>Войти</h1>
      <Login />
      <p>или <Link to={'/register'}>Зарегистрироваться</Link></p>
    </div>
  );
};


export default LoginPage;