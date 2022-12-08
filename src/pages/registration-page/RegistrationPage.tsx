import { Link } from 'react-router-dom';
import './registration-page.scss';
import Registration from '../../components/registration/Registration';

const RegistrationPage: React.FC = () => {

  return (
    <div className='registration-page'>
      <h1 className='registration-page__header'>Регистрация</h1>
      <Registration />
      <p> Уже зарегистрированы? <Link to={'/login'}>Войти</Link></p>
    </div>
  );
};


export default RegistrationPage;