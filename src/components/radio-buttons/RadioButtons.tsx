import './radio-buttons.scss';

type TProps = {
  radioName: string;
  catName: string;
  onClick: (value: string) => void;
}

const RadioButtons = ({ onClick, radioName, catName }: TProps) => {

  return (
    <fieldset className='radio'>{catName}
      <ul className='radio-list'>
        <li
          className='radio-list__item'
        >
          <label className='radio-list__item-label'>
            <input
              className='radio-list__item-radiobutton'
              type="radio"
              name={radioName}
              value="да"
              onChange={(e) => {
                const value = e.target.value;
                onClick(value);
              }}
            />
            <span
              className='radio-list__item-radiomark'>
            </span>
            да
          </label>
        </li>

        <li
          className='radio-list__item'
        >
          <label className='radio-list__item-label'>
            <input
              className='radio-list__item-radiobutton'
              type="radio"
              name={radioName}
              value="нет"
              onChange={(e) => {
                const value = e.target.value;
                onClick(value);
              }}
            />
            <span
              className='radio-list__item-radiomark'>
            </span>
            нет
          </label>
        </li>
        <li
          className='radio-list__item'
        >
          <label className='radio-list__item-label'>
            <input
              className='radio-list__item-radiobutton'
              type="radio"
              name={radioName}
              value="не важно"
              onChange={(e) => {
                const value = e.target.value;
                onClick(value);
              }}
            />
            <span
              className='radio-list__item-radiomark'>
            </span>
            не важно
          </label>
        </li>
      </ul>
    </fieldset>
  );
};

export { RadioButtons };