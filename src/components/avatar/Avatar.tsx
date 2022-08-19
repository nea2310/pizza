import styled from 'styled-components';
import './avatar.scss';

type TProps = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};

export default function (props: TProps) {

  const StyledAvatar = styled.button<{ open: boolean }>``;
  const avatarImage = require('./img/avatar.png');

  return (
    <StyledAvatar
      className='avatar'
      open={props.open}
      onClick={() => props.setOpen(!props.open)}
    >
      <img className='avatar__image' src={avatarImage}></img>
    </StyledAvatar>)
};


