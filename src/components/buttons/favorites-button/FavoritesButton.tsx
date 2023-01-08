import { useState } from 'react';
import { updateUserFavItems } from '../../../store/slices/userSlice';
import { useAppDispatch } from '../../../hooks';
import './favorites-button.scss';

type TProps = {
  infav: boolean;
  userdocid: string;
  pizzaid: string;
};

const FavoritesButton: React.FC<TProps> = (props) => {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(!props.infav);

  let classname = 'favorites-button';
  if (!isAdding) {
    classname = 'favorites-button favorites-button_in-fav';
  }

  return (
    <button
      aria-label="добавить в избранное"
      className={classname}
      onClick={() => {
        setIsAdding(!isAdding);
        dispatch(
          updateUserFavItems({
            user: props.userdocid,
            pizzaItem: props.pizzaid,
            isAdding,
          })
        );
      }}
    />
  );
};

export default FavoritesButton;
