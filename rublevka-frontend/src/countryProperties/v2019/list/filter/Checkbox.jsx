import React from 'react';

import UI from '../../../../ui/v2019';
import { CheckboxLabel } from './styled';
import styled from 'styled-components';

const { Checkbox } = UI;

const FilterCheckbox = ({
  className,
  label,
  checked,
  onChange,
  onOnlyClick,
  name,
}) => (
  <Checkbox
    className={className}
    checked={checked}
    handleChange={() => onChange(name, checked)}
  >
    <CheckboxLabel>{label}</CheckboxLabel>
    {onOnlyClick && (
      <a tabIndex={0} onClick={onOnlyClick(name)} role="button">
        Только
      </a>
    )}
  </Checkbox>
);

export default styled(FilterCheckbox)`
  padding: 6px;
  transition: background-color 0.2s;

  a {
    color: #f44336;
    display: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .label {
    justify-content: space-between;
  }

  &:hover {
    background: #f2f2f2;
    border-radius: 2px;

    a {
      display: block;
    }
  }
`;
