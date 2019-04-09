import React from 'react';
import styled from 'styled-components';

const StLabel = styled.label`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StSelect = styled.select`
  font-size: 16px;
  font-weight: 500;
  color: #f44336;
  outline: none;
  float: right;
  width: auto;
  direction: rtl;
  appearance: none;
  background-color: transparent;
  border: none;
`;

const StOption = styled.option`
  direction: rtl;
`;

const Caret = styled.span`
  margin-top: 2px;
  margin-left: 4px;
  margin-right: 6px;
  width: 8px;
  height: 5px;
  background-image: url("data:image/svg+xml,%3Csvg width='8' height='5' viewBox='0 0 8 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.49994 0H0.500038C0.364534 0 0.247392 0.0549715 0.148419 0.164823C0.0494456 0.274796 0 0.404958 0 0.555431C0 0.705903 0.0494456 0.836156 0.148419 0.946068L3.64838 4.83496C3.74746 4.94494 3.86461 5 4 5C4.13539 5 4.25265 4.94494 4.35154 4.83496L7.8515 0.946038C7.95036 0.836156 8 0.705903 8 0.5554C8 0.404958 7.95039 0.274796 7.8515 0.164793C7.75261 0.0548498 7.63536 0 7.49994 0Z' fill='%23F44336'/%3E%3C/svg%3E%0A");
`;

const Select = ({ selected, options = [], placeholder, onChange }) => (
  <StLabel>
    <StSelect
      value={selected || 'placeholder'}
      onChange={e => onChange(e.target.value)}
    >
      <StOption value="placeholder" disabled>
        {placeholder}
      </StOption>
      {options.map(option => (
        <StOption value={option.value}>{option.label}</StOption>
      ))}
    </StSelect>
    <Caret />
  </StLabel>
);

export default Select;
