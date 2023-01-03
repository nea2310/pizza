import { FC, useState } from 'react';
import './login-form.scss';

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

const LoginForm: FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-form">
      <input
        className="login-form__input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        className="login-form__input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="пароль"
      />
      <button
        className="login-form__button"
        onClick={() => handleClick(email, password)}
      >
        {title}
      </button>
    </div>
  );
};

export default LoginForm;
