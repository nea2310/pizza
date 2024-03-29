import { Link } from 'react-router-dom';
import Login from '../../components/login/Login';
import './login-page.scss';

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <h1 className="login-page__header">Войти</h1>
      <Login />
      <p>
        или <Link to={'/register'}>Зарегистрироваться</Link>
      </p>
    </div>
  );
};

export default LoginPage;
