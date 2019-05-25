// FIXME
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import styled from 'styled-components';

class Checkbox extends Component {
  handleChange = () => {
    const { reference, checked } = this.props;
    this.props.handleChange(reference, !checked);
  };

  render() {
    const { className } = this.props;

    return (
      <label className={className}>
        <input
          type="checkbox"
          ref={this.props.reference}
          onChange={this.handleChange}
          checked={this.props.checked}
        />
        <span className="label">{this.props.children}</span>
      </label>
    );
  }
}

export default () => styled(Checkbox)`
  display: flex;
  align-items: center;
  margin-bottom: 3px;
  cursor: pointer;

  .label {
    display: flex;
    align-items: center;
    flex: 1;
  }

  input {
    position: relative;
    width: 20px;
    height: 20px;
    margin: 0;

    border: 1px solid #d9d9d9;
    border-radius: 2px;
    outline: none;
    cursor: pointer;

    background: white;

    appearance: none;

    &:checked {
      background: white
        url("data:image/svg+xml,%3Csvg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.15 5.5C0.05 5.4 0 5.25 0 5.15C0 5.05 0.05 4.9 0.15 4.8L0.85 4.1C1.05 3.9 1.35 3.9 1.55 4.1L1.6 4.15L4.35 7.1C4.45 7.2 4.6 7.2 4.7 7.1L11.4 0.15H11.45C11.65 -0.05 11.95 -0.05 12.15 0.15L12.85 0.85C13.05 1.05 13.05 1.35 12.85 1.55L4.85 9.85C4.75 9.95 4.65 10 4.5 10C4.35 10 4.25 9.95 4.15 9.85L0.25 5.65L0.15 5.5Z' fill='black'/%3E%3C/svg%3E")
        50% no-repeat;
      border-color: #999999;
      outline: none;
    }
  }
`;
