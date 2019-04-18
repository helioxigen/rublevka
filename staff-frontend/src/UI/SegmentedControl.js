import React from 'react';
import styled from 'styled-components';
import { theme } from '.';

const Switcher = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 12px;
  border: 1px solid ${p => (p.selected ? theme.blue : theme.alto)};
  border-right-color: ${p => (p.selected ? theme.blue : 'transparent')};
  box-sizing: border-box;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
  line-height: 1;
  color: ${p => (p.selected ? '#fff' : '#333')};
  background-color: ${p => (p.selected ? theme.blue : '#fff')};
  ${p => p.isFullWidth && 'width: 100%;'}

  &:focus,
  &:active {
    outline: none;
  }

  &:hover {
    border: 1px solid ${theme.blue};

    :last-child {
      border-right-color: ${theme.blue};
    }

    & + button {
      border-left-color: transparent;
    }
  }

  & + button {
    border-left-color: ${p => p.selected && 'transparent'};
  }

  &:first-child {
    border-radius: 4px 0px 0px 4px;
  }

  &:last-child {
    border-radius: 0px 4px 4px 0px;
    border-right: 1px solid ${p => (p.selected ? theme.blue : theme.alto)};
  }
`;

// const Currency = styled(Body)`
//   color: ${({ selected }) => (selected ? theme.white : 'inherit')};
//   font-weight: ${({ selected }) => (selected ? 'bold' : 'inherit')};
//   line-height: ${({ isRuble }) => (isRuble ? 'initial' : 'inherit')};
// `;

export default ({
  selected,
  options = [],
  onChange,
  isFullWidth,
  className,
}) => (
  <Switcher className={className}>
    {options.map(({ label, value }) => (
      <Button
        type="button"
        selected={String(selected) === String(value)}
        key={value}
        onClick={() => onChange(value)}
        isFullWidth={isFullWidth}
      >
        {label}
      </Button>
    ))}
  </Switcher>
);
