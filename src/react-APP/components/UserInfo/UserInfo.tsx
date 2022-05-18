
import './userinfo.scss';
import React, { useState, useRef, RefObject, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { userUnset, userGetData } from '~s/actions/user';

import { colors } from "../../../assets/styles/global";

import Avatar from "../Avatar/Avatar";


const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  closeMenu: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      closeMenu();
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, closeMenu]);
};

const StyledMenu = styled.div<{ open: boolean }>`
transition: transform 0.3s ease-in-out;
transform: ${({ open }) =>
    (open ? "translateX(0)" : "translateX(200%)")};
    `;
type Props = {
  username: string;
  usersurname: string
}
export const UserInfo = (props: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);
  const node = useRef<HTMLDivElement>(null);
  useOnClickOutside(node, () => setOpen(false));
  return (
    <div ref={node}>
      <Avatar open={open} setOpen={setOpen} />
      <StyledMenu
        className="user-info"
        open={open}>
        <span
          className="user-info__name">{`${props.username} ${props.usersurname}`}
        </span>
        <ul className="user-info__links">
          <li className="user-info__link-wrapper">
            <a
              className="user-info__link"
              onClick={() => true}>Мои баллы</a>
          </li>
          <li className="user-info__link-wrapper">
            <a
              className="user-info__link"
              onClick={() => true}>Мои адреса доставки</a>
          </li>
          <li className="user-info__link-wrapper">
            <a
              className="user-info__link"
              onClick={() => true}>Пригласить друга</a>
          </li>
        </ul>
        <button
          className='user-info__exit'
          onClick={() => {
            dispatch(userUnset());
          }}
        >
          Выход
        </button>
      </StyledMenu>
    </div>
  );
};

export default UserInfo;