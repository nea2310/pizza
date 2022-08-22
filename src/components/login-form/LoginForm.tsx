import { FC, useState } from 'react';
import './login-form.scss'


interface FormProps {
  title: string;
  handleClick: (email: string, pass: string) => void
}

const Form: FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className='login-form'>
      <input
        className='login-form__input'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        className='login-form__input'
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
      />
      <button
        className='login-form__button btn btn-warning'
        onClick={() => handleClick(email, pass)}
      >
        {title}
      </button>
    </div>
  );
};

export { Form };