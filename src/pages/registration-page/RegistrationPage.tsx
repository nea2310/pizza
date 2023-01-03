import { Link } from 'react-router-dom';
import Registration from '../../components/registration/Registration';
import './registration-page.scss';

const RegistrationPage: React.FC = () => {
  return (
    <div className="registration-page">
      <h1 className="registration-page__header">Регистрация</h1>
      <Registration />
      <p>
        {' '}
        Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
      </p>
    </div>
  );
};

export default RegistrationPage;
