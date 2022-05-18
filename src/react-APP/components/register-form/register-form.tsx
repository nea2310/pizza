import React, { FC, useState } from 'react';
import './register-form.scss';

interface FormProps {
  title: string;
  handleClick: (
    email: string,
    pass: string,
    name: string,
    surname: string) => void
}


const RegisterForm: FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  return (
    <div className='register-form'>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
      />
      <input
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <input
        type="surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="surname"
      />
      <button className='register-form__button'
        onClick={() => handleClick(name, surname, email, pass)}
      >
        {title}
      </button>
    </div>
  );
};

export { RegisterForm };