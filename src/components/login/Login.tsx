import { useNavigate } from 'react-router-dom';
import Form from '../login-form/LoginForm';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setUser } from '../../store/slices/userSlice';

const Login: React.FC = () => {

  const { token } = useAppSelector(state => state.user);
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
      title="sign in"
      handleClick={(email, password) => dispatch(setUser({ email, password }))}
    />
  );
};

export default Login;