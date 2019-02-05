import React from 'react';
import styled from 'styled-components';

const FormSt = styled.form``;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  font-size: 24px;
  line-height: 1;
  display: block;
  box-sizing: border-box;
  border: 0;

  &:focus,
  &:active {
    outline: 2px solid #3678f2;
  }
`;

const Form = ({
  onChange, value, onSubmit, disabled,
}) => (
  <FormSt onSubmit={onSubmit}>
    <Input
      disabled={disabled}
      value={value}
      onChange={onChange}
      placeholder="Введите ID объектов..."
      autoFocus
      type="text"
    />
  </FormSt>
);

export default Form;
