import './radio-buttons.scss';

type TProps = {
  canFocus: boolean;
  radioName: string;
  catName: string;
  onClick: (value: string) => void;
};

const RadioButtons: React.FC<TProps> = ({
  onClick,
  radioName,
  catName,
  canFocus,
}) => {
  return (
    <fieldset className="radio">
      <legend className="radio__legend">{catName}</legend>
      <div className="radio__group">
        <label className="radio__item">
          <input
            tabIndex={canFocus ? 0 : -1}
            className="radio__radiobutton"
            type="radio"
            name={radioName}
            value="да"
            onChange={(e) => {
              const value = e.target.value;
              onClick(value);
            }}
          />
          <span className="radio__radiomark"></span>
          да
        </label>
        <label className="radio__item">
          <input
            tabIndex={canFocus ? 0 : -1}
            className="radio__radiobutton"
            type="radio"
            name={radioName}
            value="нет"
            onChange={(e) => {
              const value = e.target.value;
              onClick(value);
            }}
          />
          <span className="radio__radiomark"></span>
          нет
        </label>
        <label className="radio__item">
          <input
            tabIndex={canFocus ? 0 : -1}
            className="radio__radiobutton"
            type="radio"
            name={radioName}
            value="не важно"
            onChange={(e) => {
              const value = e.target.value;
              onClick(value);
            }}
          />
          <span className="radio__radiomark"></span>
          не важно
        </label>
      </div>
    </fieldset>
  );
};

export default RadioButtons;
