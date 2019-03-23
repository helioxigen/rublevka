import React from 'react';
import styled from 'styled-components';
import { theme } from '.';

const Buttons = styled.div`
  display: flex;
  justify-content: start;
  flex-flow: row wrap;
  width: 100%;
  margin-bottom: 25px;
`;

const Button = styled.button`
  padding: 6px 12px 3px 12px;
  box-sizing: border-box;
  border-radius: 18px;
  border: 1px solid ${({ selected }) => (selected ? theme.blue : 'transparent')};
  cursor: pointer;
  white-space: nowrap;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: ${({ selected }) =>
    (selected ? theme.blue : theme.buttonGray)};
  color: ${({ selected }) => (selected ? '#fff' : '#333')};
  line-height: 26px;
  font-size: 14px;

  &:last-child {
    margin-right: 0;
  }

  &:active,
  &:focus {
    outline: 0;
  }
`;

export default ({ selected = [], options = [], onChange }) => (
  <Buttons>
    {options.map(({ label, value }) => (
      <Button
        type="button"
        selected={selected.includes(value)}
        key={value}
        onClick={() => onChange(value)}
      >
        {label}
      </Button>
    ))}
  </Buttons>
);
