import React from 'react';
import styled from 'styled-components';
import { Body, theme } from '.';

const Select = styled.div`
  display: flex;
  justify-content: start;
  flex-flow: row nowrap;
  margin-bottom: 25px;
`;

const SelectItem = styled.div`
  padding: 5px 15px 3px 15px;
  border: 1px solid ${props => (props.selected ? theme.blue : theme.alto)};
  border-right-color: ${props => (props.selected ? theme.blue : 'transparent')};
  box-sizing: border-box;
  cursor: pointer;
  white-space: nowrap;
  background-color: ${props =>
    props.filled && props.selected ? theme.lightBlue : '#fff'};

  &:hover {
    border: 1px solid ${theme.blue};

    :last-child {
      border-right-color: ${theme.blue};
    }
  }

  :first-child {
    border-radius: 4px 0px 0px 4px;
  }

  :last-child {
    border-radius: 0px 4px 4px 0px;
    border-right: 1px solid ${theme.alto};
  }
`;

const SelectName = styled(Body)``;

export default ({ selectData = [], selected = '', filled }) => (
  <Select>
    {selectData.map(selectDataItem => (
      <SelectItem
        selected={selected.toString() === selectDataItem.value.toString()}
        key={selectDataItem.name}
        filled={filled}
      >
        <SelectName
          selected={selected.toString() === selectDataItem.value.toString()}
          filled={filled}
        >
          {selectDataItem.name}
        </SelectName>
      </SelectItem>
    ))}
  </Select>
);
