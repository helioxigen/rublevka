import React from 'react';
import styled from 'styled-components';
import { Body, theme } from '.';

const currencies = [
  {
    symbol: '₽',
    value: 1,
  },
  {
    symbol: '$',
    value: 2,
  },
  {
    symbol: '€',
    value: 3,
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

export default ({ selected = '' }) => (
  <Switcher>
    {currencies.map(SwitcherDataItem => (
      <SwitcherItem
        selected={selected.toString() === SwitcherDataItem.value.toString()}
        key={SwitcherDataItem.symbol}
      >
        <Currency
          selected={selected.toString() === SwitcherDataItem.value.toString()}
          isRuble={SwitcherDataItem.symbol === '₽'}
        >
          {SwitcherDataItem.symbol}
        </Currency>
      </SwitcherItem>
    ))}
  </Switcher>
);
