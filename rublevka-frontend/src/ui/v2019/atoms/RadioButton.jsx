import React from 'react';
import styled from 'styled-components';

const RadioInput = styled.input.attrs({ type: 'radio' })`
  margin: 0;
  position: absolute;
  margin: 0;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
`;

const RadioLabel = styled.label`
  display: block;
  padding: 8px 0px;
  padding-left: 30px;
  position: relative;
  line-height: 20px;
  font-size: 16px;
  color: #232323;

  &:hover {
    cursor: pointer;
  }
`;

const RadioIcon = styled.span`
  position: absolute;
  left: 0;
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='19' height='19' rx='9.5' fill='white' fill-opacity='0.01' stroke='%23D9D9D9'/%3E%3C/svg%3E%0A");

  ${RadioInput}:focus + & {
    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='19' height='19' rx='9.5' fill='white' fill-opacity='0.01' stroke='%23999999'/%3E%3C/svg%3E%0A");
  }

  ${RadioInput}:checked + & {
    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='19' height='19' rx='9.5' fill='white' fill-opacity='0.01' stroke='%23999999'/%3E%3Crect x='5.5' y='5.5' width='9' height='9' rx='4.5' fill='%23999999' stroke='%23999999'/%3E%3C/svg%3E%0A");
  }
`;

export default () => ({ text, name, value, handleChange, checked }) => (
  <RadioLabel>
    <RadioInput
      id={name}
      value={value}
      onChange={handleChange}
      checked={checked}
    />
    <RadioIcon />
    {text}
  </RadioLabel>
);
