import { RefObject, useRef } from 'react';
import './favourites-button.scss';
import { useAppDispatch } from '../../../hooks';
import { userUpdateFavItems } from '../../../store/actions/user';

type TProps = {
  infav: boolean;
  userdocid: string;
  pizzaid: string;
};

export default function (props: TProps) {

  const dispatch = useAppDispatch();
  const btnRef = useRef<SVGSVGElement>() as RefObject<SVGSVGElement>;
  const toggleFav = (elem: SVGSVGElement) => {
    if (elem.classList) {
      elem.classList.toggle('favourites-button_in-fav');
    }
  };

  let classname = '';
  let isAdding = true;
  if (props.infav) {
    classname = 'favourites-button_in-fav';
    isAdding = false;
  }

  return (
    <button className='favourites-button'
      onClick={() => {
        if (!btnRef || !btnRef.current) return;
        toggleFav(btnRef.current);
        dispatch(userUpdateFavItems(
          props.userdocid,
          props.pizzaid, isAdding));
      }
      }>
      <svg ref={btnRef} className={classname} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.97 62.859C438.776 41.922 408.87 32 378.722 32C341.234 32 303.376 47.344 275.693 75.922L256.005 96.25L236.318 75.922C208.631 47.34 170.78 32 133.289 32C103.149 32 73.231 41.922 49.04 62.859C-13.103 116.652 -16.197 212.516 39.822 270.484L232.975 470.195C239.295 476.73 247.627 480 255.958 480C264.294 480 272.626 476.73 278.946 470.195L472.095 270.484C528.211 212.516 525.118 116.648 462.97 62.859ZM460.595 259.359L267.447 459.07C264.372 462.25 260.294 464 255.962 464C251.627 464 247.548 462.25 244.474 459.07L51.325 259.367C27.396 234.602 14.568 200.297 16.127 165.238C17.705 129.875 33.111 97.812 59.513 74.961C79.887 57.32 105.403 48 133.289 48C167.421 48 200.784 62.234 224.826 87.055C248.929 111.938 239.361 102.062 256.005 119.242C271.958 102.773 263.786 111.211 287.184 87.055C311.227 62.234 344.594 48 378.726 48C406.612 48 432.123 57.32 452.498 74.957C478.908 97.812 494.314 129.883 495.872 165.246C497.419 200.297 484.564 234.602 460.595 259.359Z" /></svg>
    </button>
  );
}