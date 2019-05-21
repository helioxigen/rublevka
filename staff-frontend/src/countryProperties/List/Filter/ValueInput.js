import React from 'react';
import styled from 'styled-components';
import Block from './Block';
import { Input as InputBase } from '../../../UI';

const Input = styled(InputBase)`
  width: calc(100% - 24px);
  padding: 16px 12px 13px 12px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  appearance: none;

  font-weight: bold;
  font-size: 13px;
  line-height: 15px;
  text-transform: uppercase;
  color: #232323;

  &::placeholder {
    color: #aaaaaa;
    opacity: 1;
  }

  &:focus {
    border: 1px solid #999999;
    outline: none;
  }
`;

export default function ValueInput({
  title,
  currentValue,
  remove,
  update,
  placeholder,
}) {
  const hasValue = !!currentValue;

  return (
    <Block title={title} remove={remove} hasValue={hasValue}>
      <Input
        defaultValue={currentValue}
        placeholder={placeholder}
        onSubmit={value => update(value)}
      />
    </Block>
  );
}
