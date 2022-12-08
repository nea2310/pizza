import { FC, useState } from 'react';
import './registration-form.scss';

interface FormProps {
  title: string;
  handleClick: (
    email: string,
    password: string,
    name: string,
    surname: string) => void
}


const RegistrationForm: FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  return (
    <div className='registration-form'>
      <input
        className="registration-form__input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        className="registration-form__input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <input
        className="registration-form__input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
      />
      <input
        className="registration-form__input"
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="surname"
      />
      <button className='registration-form__button btn btn-warning'
        onClick={() => handleClick(name, surname, email, password)}
      >
        {title}
      </button>
    </div>
  );
};

export default RegistrationForm;