
import { RegisterForm } from '../../components/register-form/register-form';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { userReg } from '../../store/actions/user';

const SignUp = () => {

  const props: any = useAppSelector(state => {
    return state;
  });
  /*проверяем, авторизован ли пользователь*/
  const isAuthed = !!props.user.user.token;

  // const auth = getAuth(); // auth - данные для коннекта с firebase
  const dispatch = useAppDispatch();
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
};

export { SignUp };