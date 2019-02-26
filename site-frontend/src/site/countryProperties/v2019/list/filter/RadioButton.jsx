import React from 'react';
import styled from 'styled-components';

const RadioInput = styled.input`
  margin: 0;
  appearance: none;
`;

const RadioLabel = styled.label`
  display: block;
  padding: 8px 0px;
  padding-left: 30px;
  position: relative;
  line-height: 20px;
  font-size: 16px;
  color: #232323;

  &:before {
    content: '';
    width: 20px;
    height: 20px;
    position: absolute;
    left: 0;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
  }

  ${({ checked }) =>
    checked &&
    `
    &:before {
      border: 1px solid #999999;
      content: '\\2022';
      color: #999999;
      font-size: 37px;
      text-align: center;
      line-height: 10px;
    }
  `}

  &:hover {
    cursor: pointer;
  }
`;

const RadioButton = ({ text, name, value, handleChange, checked }) => (
  <RadioLabel checked={checked}>
    <RadioInput type="radio" id={name} value={value} onChange={handleChange} checked={checked} />
    {text}
  </RadioLabel>
);

export default RadioButton;
