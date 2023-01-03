import { useState, useRef, RefObject, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { userUnset } from '../../store/slices/userSlice';
import './user-info.scss';
import Avatar from '../avatar/Avatar';

const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  closeMenu: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      closeMenu();
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, closeMenu]);
};

type Props = {
  username: string | null;
  usersurname: string | null;
};

const UserInfo: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);
  useOnClickOutside(node, () => setOpen(false));

  const userInfoClassName = open ? 'user-info_active' : '';
  const userInfoClasses = ['user-info', userInfoClassName];

  return (
    <div ref={node}>
      <Avatar open={open} setOpen={setOpen} />
      <div className={userInfoClasses.join(' ')}>
        <span className="user-info__name">
          {`${props.username} ${props.usersurname}`}
        </span>
        <ul className="user-info__links">
          <li className="user-info__link-wrapper">
            <Link
              className="user-info__link"
              to={'/favorites'}
              tabIndex={open ? 0 : -1}
            >
              Избранное
            </Link>
          </li>
          <li className="user-info__link-wrapper">
            <a className="user-info__link" onClick={() => true}>
              Мои баллы
            </a>
          </li>
          <li className="user-info__link-wrapper">
            <a className="user-info__link" onClick={() => true}>
              Мои адреса доставки
            </a>
          </li>
          <li className="user-info__link-wrapper">
            <a className="user-info__link" onClick={() => true}>
              Пригласить друга
            </a>
          </li>
        </ul>
        <button
          className="user-info__exit"
          tabIndex={open ? 0 : -1}
          onClick={() => {
            dispatch(userUnset());
          }}
        >
          Выход
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
