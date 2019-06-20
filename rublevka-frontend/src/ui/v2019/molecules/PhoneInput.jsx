import React from 'react';
import Input from '../atoms/Input';

export default ({ onChange, value, hasError }) => (
  <Input
    hasError={hasError}
    type="tel"
    mask="(999) 999-99-99"
    placeholder="Телефон"
    onChange={onChange}
    value={value}
  />
);
