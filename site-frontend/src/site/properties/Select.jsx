import React from 'react';
import styled from 'styled-components';

const StSelect = styled.select`
  font-size: 16px;
  color: #f44336;
  outline: none;
  float: right;
  width: auto;
  text-align-last: right;
  appearance: none;
  background-color: transparent;
  border: none;
`;

const StOption = styled.option`
  direction: rtl;
`;

const Select = ({ selected, options = [], placeholder, onChange }) => (
  <StSelect value={selected || 'placeholder'} onChange={e => onChange(e.target.value)}>
    <StOption value="placeholder" disabled>
      {placeholder}
    </StOption>
    {options.map(option => (
      <StOption value={option.value}>{option.label}</StOption>
    ))}
  </StSelect>
);

export default Select;
