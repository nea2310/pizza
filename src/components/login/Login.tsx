import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/slices/userSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Form from '../login-form/LoginForm';

const Login: React.FC = () => {
  const { token } = useAppSelector((state) => state.user);
  /*проверяем, авторизован ли пользователь*/
  const isAuthed = !!token;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /*если пользователь авторизован -  перекинуть на главную (пользователь залогинился)*/
  if (isAuthed) {
    navigate('/');
  }

  return (
    <Form
      title="Войти"
      handleClick={(email, password) => dispatch(setUser({ email, password }))}
    />
  );
};

export default Login;
