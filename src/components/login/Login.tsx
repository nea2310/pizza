import { useNavigate } from 'react-router-dom';
import { Form } from '../login-form/LoginForm';
import { userSet } from '../../store/actions/user';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { IStore } from '../../interface';



const Login = () => {

  const props: IStore = useAppSelector(state => {
    return state;
  });

  /*проверяем, авторизован ли пользователь*/
  const isAuthed = !!props.user.token;
  //const auth = getAuth(); // auth - данные для коннекта с firebase
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /*если пользователь авторизован -  перекинуть на главную (пользователь залогинился)*/
  if (isAuthed) {
    navigate('/');
  }

  return (
    <Form
      title="sign in"
      handleClick={(email, pass) => dispatch(userSet(email, pass))}
    />
  );
};

export { Login };