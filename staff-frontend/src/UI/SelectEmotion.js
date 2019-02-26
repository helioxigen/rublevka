import React from 'react';
import styled from 'styled-components';
import { Body, theme } from '.';

const emotionData = [
  {
    name: '👎 Плохое',
    value: 'bad',
  },
  {
    name: '👌 Нормальное',
    value: 'normal',
  },
  {
    name: '👍 Хорошее',
    value: 'good',
  },
  {
    name: '⭐ Отличное',
    value: 'great',
  },
];

const SelectBubble = styled.div`
  display: flex;
  justify-content: start;
  flex-flow: row wrap;
  width: 100%;
  margin-bottom: 25px;
`;

const SelectBubbleItem = styled.div`
  padding: 6px 12px 3px 12px;
  box-sizing: border-box;
  border-radius: 18px;
  border: ${({ selected }) =>
    selected ? `1px solid ${theme.blue}` : 'inherit'};
  cursor: pointer;
  white-space: nowrap;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: ${theme.buttonGray};

  &:last-child {
    margin-right: 0;
  }
`;

const SelectBubbleTitle = styled(Body)``;

export default ({ selected = '' }) => (
  <SelectBubble>
    {emotionData.map(selectDataItem => (
      <SelectBubbleItem
        selected={selected.toString() === selectDataItem.value.toString()}
        key={selectDataItem.name}
      >
        <SelectBubbleTitle>{selectDataItem.name}</SelectBubbleTitle>
      </SelectBubbleItem>
    ))}
  </SelectBubble>
);
