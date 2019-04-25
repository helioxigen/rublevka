import React from 'react';
import styled from 'styled-components';
import { Body, theme } from '.';

const currencies = [
  {
    symbol: '₽',
    value: 'RUB',
  },
  {
    symbol: '$',
    value: 'USD',
  },
  {
    symbol: '€',
    value: 'EUR',
  },
];

const Switcher = styled.div`
  display: inline-flex;
  justify-content: start;
  flex-flow: row nowrap;
  position: relative;
  border: 1px solid ${theme.alto};
  border-radius: 100px;
`;

const SwitcherItem = styled.div`
  width: 43px;
  height: 43px;
  display: flex;
  border-radius: 22px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background-color: ${({ selected }) => (selected ? theme.blue : 'inherit')};
`;

const Currency = styled(Body)`
  color: ${({ selected }) => (selected ? theme.white : 'inherit')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'inherit')};
  line-height: ${({ isRuble }) => (isRuble ? 'initial' : 'inherit')};
`;

export default ({ selected = '', onChange }) => (
  <Switcher>
    {currencies.map(item => (
      <SwitcherItem
        selected={selected.toString() === item.value.toString()}
        key={item.symbol}
        onClick={() => {
          onChange(item.value);
        }}
      >
        <Currency
          selected={selected.toString() === item.value.toString()}
          isRuble={item.value === 'RUB'}
        >
          {item.symbol}
        </Currency>
      </SwitcherItem>
    ))}
  </Switcher>
);
