import React from 'react';
import styled from 'styled-components';
import theme from './theme';

const StInput = styled.input`
  outline: none;
  width: 100%;
  display: block;
  transition: border-bottom 0.3s ease-in-out;
  border: none;
  border-bottom: 1px solid ${({ errors }) => (errors ? theme.red : theme.alto)};
  padding: 10px 0px;
  font-family: 'FSElliotPro';
  color: #333;
  font-size: 20px;
  background-color: transparent;

  &:focus {
    border-bottom: 2px solid
      ${({ errors }) => (errors ? theme.red : theme.blue)};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &::placeholder {
    opacity: .25;
  }
}
`;

const enterKeyCode = 13;

function formatCurrency(source) {
  const number = String(source)
    .replace(/\s/g, '')
    .replace(/[^0-9.]/g, '');
  const value = new Intl.NumberFormat('ru-RU', {
    useGrouping: true,
  }).format(number);

  return value;
}

export default class Input extends React.PureComponent {
  state = {
    inputValue: '',
  };

  componentDidMount() {
    this.setState({ inputValue: this.props.defaultValue });
  }

  componentWillUnmount() {
    this.removeKeyboardListener();
  }

  onKeyDown = (event) => {
    if (event.keyCode === enterKeyCode) {
      this.submit();
    }
  };

  addKeyboardListener = () => {
    document.addEventListener('keydown', this.onKeyDown, false);
  };

  removeKeyboardListener = () => {
    document.removeEventListener('keydown', this.onKeyDown, false);
  };

  onBlur = () => {
    this.setState({
      isFocused: false,
    });
    this.removeKeyboardListener();
    this.submit();
  };

  onFocus = () => {
    this.setState({
      isFocused: true,
    });
    this.addKeyboardListener();
  };

  onChange = (e) => {
    const { value } = e.target;

    this.setState({ inputValue: value }, () => {
      this.props.onChange(value);
    });
  };

  submit = () => {
    const { onSubmit } = this.props;
    const { inputValue } = this.state;

    if (onSubmit) {
      onSubmit(inputValue);
    }
  };

  render() {
    const { isCurrency } = this.props;
    const { isFocused, inputValue } = this.state;
    const value = isCurrency ? formatCurrency(inputValue) : inputValue;

    return (
      <StInput
        {...this.props}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
        isFocused={isFocused}
        value={value}
      />
    );
  }
}
