
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../registration-form/RegistrationForm';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { registerUser } from '../../store/slices/userSlice';

const Registration: React.FC = () => {

  /*проверяем, авторизован ли пользователь*/
  const { token } = useAppSelector(state => state.user);

  const isAuthed = !!token;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  /*если пользователь авторизован -  перекинуть на главную (пользователь зарегистрировался)*/
  if (isAuthed) {
    navigate('/');
  }

  return (
    <RegistrationForm
      title="Зарегистрироваться"
      handleClick={(name, surname, email, password) =>
        dispatch(registerUser({ name, surname, email, password }))}
    />
  );
};

export default Registration;