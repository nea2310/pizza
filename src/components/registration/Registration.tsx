
import { RegisterForm } from '../registration-form/RegistrationForm';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { userReg } from '../../store/actions/user';
import { IStore } from '../../interface';

const SignUp = () => {

  const props: IStore = useAppSelector(state => {
    return state;
  });
  /*проверяем, авторизован ли пользователь*/
  const isAuthed = !!props.user.token;

  // const auth = getAuth(); // auth - данные для коннекта с firebase
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  /*если пользователь авторизован -  перекинуть на главную (пользователь зарегистрировался)*/
  if (isAuthed) {
    navigate('/');
  }

  return (
    <RegisterForm
      title="Зарегистрироваться"
      handleClick={(name, surname, email, pass) =>
        dispatch(userReg({ name, surname, email, pass }))}
    />
  );
};

export { SignUp };