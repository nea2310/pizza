import styled from 'styled-components';
import avatarImage from './img/avatar.png';
import './avatar.scss';

type TProps = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};

/*Создаем styled-component вне компонента, иначе будем получать предупреждение вида
The component styled.button with the id of 'sc-gsnTZi' has been created dynamically.
You may see this warning because you've called styled inside another component.
To resolve this only create new StyledComponents outside of any render method and function component. */

const StyledAvatar = styled.button<{ open: boolean }>``;
const Avatar: React.FC<TProps> = (props) => {
  return (
    <StyledAvatar
      className="avatar"
      open={props.open}
      onClick={() => props.setOpen(!props.open)}
    >
      <img className="avatar__image" src={avatarImage}></img>
    </StyledAvatar>
  );
};

export default Avatar;
