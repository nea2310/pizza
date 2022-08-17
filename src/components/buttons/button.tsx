import PropTypes from 'prop-types';

interface Props {
  nativeProps: {
    type: 'button' | 'submit' | 'reset',
    className: string
  },
  buttonName: string
  onClick: () => void,
}

export default function (props: Props) {

  const defaultProps = {
    onClick: function () { },
    nativeProps: {}
  }

  const propTypes = {
    onClick: PropTypes.func,
  }

  return (
    <button {...props.nativeProps}
      onClick={props.onClick}>{props.buttonName}</button>
  );
}