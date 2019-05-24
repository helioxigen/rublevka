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
  showOnly,
  name,
}) => (
  <Checkbox
    className={className}
    checked={checked}
    handleChange={() => onChange(name, checked)}
  >
    <CheckboxLabel>{label}</CheckboxLabel>
    {showOnly && (
      <a tabIndex={0} onClick={onOnlyClick(name)} role="button">
        Только
      </a>
    )}
  </Checkbox>
);

export default styled(FilterCheckbox)`
  padding: 6px;
  margin-left: -6px;
  transition: background-color 0.2s;

  a {
    color: #f44336;
    display: none;

    position: absolute;
    right: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(242, 242, 242, 1) 29%
    );
    padding-left: 14%;

    &:hover {
      text-decoration: underline;
    }
  }

  .label {
    justify-content: space-between;
    position: relative;
  }

  &:hover {
    background: #f2f2f2;
    border-radius: 2px;

    a {
      display: block;
    }
  }
`;
