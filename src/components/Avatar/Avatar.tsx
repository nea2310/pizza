import './avatar.scss';
import styled from "styled-components";
const StyledAvatar = styled.button<{ open: boolean }>``;

type Props = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};
const avatar = require('./img/avatar.png');

const Avatar = (props: Props) => (
  <StyledAvatar
    className='avatar'
    open={props.open}
    onClick={() => props.setOpen(!props.open)}
  >
    <img className='avatar__image' src={avatar}></img>
  </StyledAvatar>
);

export default Avatar;

