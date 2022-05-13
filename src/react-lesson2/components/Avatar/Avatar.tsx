import './avatar.scss';
import React from "react";
import styled from "styled-components";

import { colors } from "../../../assets/styles/global";

const StyledAvatar = styled.button<{ open: boolean }>`

`;

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};
const avatar = require('./img/avatar.png').default;

const Avatar = (props: Props) => (
  <StyledAvatar
    className='avatar'
    open={props.open}
    onClick={() => props.setOpen(!props.open)}
  >
    <div className='avatar__wrapper'>
      <img className='avatar__img' src={avatar}></img>
    </div>
  </StyledAvatar>
);

export default Avatar;

