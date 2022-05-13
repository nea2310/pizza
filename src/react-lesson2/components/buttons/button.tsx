import React from 'react';
import PropTypes from 'prop-types';

interface Props {
  nativeProps: {
    type: 'button' | 'submit' | 'reset',
    className: string
  },
  buttonName: string
  onClick: () => void,
}

export default class extends React.Component<Props> {
  static defaultProps = {
    onClick: function () { },
    nativeProps: {}
  }

  static propTypes = {
    onClick: PropTypes.func,
  }


  render() {
    return (
      <button {...this.props.nativeProps}
        onClick={this.props.onClick}>{this.props.buttonName}</button>
    );
  }
}