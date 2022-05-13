import React from 'react';
import PropTypes from 'prop-types';

interface Props {
  nativeProps: { type: string, name?: string, className: any },
  value: number | string,
  onChange: Function,
}
interface PrevProps {
  value: number | string,
}

export default class extends React.Component<Props> {
  static defaultProps = {
    onChange: function () { },
    nativeProps: {}
  }

  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func,
    nativeProps: PropTypes.object
  }

  nativeInput = React.createRef<HTMLInputElement>();

  componentDidUpdate(prevProps: PrevProps) {
    let inp = this.nativeInput.current;

    if (prevProps.value !== this.props.value &&
      this.props.value != inp.value
    ) {
      inp.value = String(this.props.value);
    }
  }

  setValue(value: string) {
    this.nativeInput.current.value = value;
  }

  checkChange = (e: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.value.toString() !== e.target.value) {
      this.props.onChange(e);
    }
  }

  checkEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      this.checkChange(e as unknown as
        React.FocusEvent<HTMLInputElement>);
    }
  }

  render() {
    return (
      <input {...this.props.nativeProps}
        defaultValue={this.props.value}
        onBlur={this.checkChange}
        onKeyUp={this.checkEnterKey}
        ref={this.nativeInput}
      />
    );
  }
}