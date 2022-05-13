import './radio-buttons.scss';
import React from 'react';
import { useSelector } from 'react-redux';


const RadioButtons = ({ onClick, radioName, catName }: any) => {

  const props: any = useSelector(state => {
    return state;
  });

  const pizzaItemsFiltered = props.pizzaItems.pizzaItemsFiltered;
  const currentQuery = props.pizzaItems.currentQuery;

  // const inList = (avl: boolean) => {
  //   if (currentQuery != radioName) {
  //     return pizzaItemsFiltered.some((item: any) =>
  //       item[radioName] === avl);
  //   } else return true;
  // };


  return (
    <fieldset className='radio'>{catName}
      <ul className='radio-list'>
        <li
          className='radio-list__item'
        >
          <label className='radio-list__item-label'>
            <input
              className='radio-list__item-radio'
              type="radio"
              name={radioName}
              value="да"
              //   disabled={!inList(true)}
              onChange={(e) => {
                const value = e.target.value;
                onClick(value);
              }}
            />
            да
          </label>
        </li>

        <li
          className='radio-list__item'
        >
          <label className='radio-list__item-label'>
            <input
              className='radio-list__item-radio'
              type="radio"
              name={radioName}
              value="нет"
              //   disabled={!inList(false)}
              onChange={(e) => {
                const value = e.target.value;
                onClick(value);
              }}
            />
            нет
          </label>
        </li>

        <li
          className='radio-list__item'
        >
          <label className='radio-list__item-label'>
            <input
              className='radio-list__item-radio'
              type="radio"
              name={radioName}
              value="не важно"
              onChange={(e) => {
                const value = e.target.value;
                onClick(value);
              }}
            />
            не важно
          </label>
        </li>
      </ul>
    </fieldset>
  );
};

export { RadioButtons };