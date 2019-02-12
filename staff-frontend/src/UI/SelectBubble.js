import React from 'react';
import styled from 'styled-components';
import closeIcon from './images/close-icon.svg';
import { Body, theme } from '.';

const SelectBubble = styled.div`
  display: flex;
  justify-content: start;
  flex-flow: row wrap;
  width: 100%;
  margin-bottom: 10px;
`;

const SelectBubbleItem = styled.div`
  padding: 6px 12px 3px 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
  border-radius: 18px;
  cursor: pointer;
  margin-bottom: 10px;
  white-space: nowrap;
  margin-right: 10px;
  background-color: ${({ selected }) =>
    selected ? theme.blue : theme.buttonGray};

  &:last-child {
    margin-right: 0;
  }
`;

const SelectBubbleTitle = styled(Body)`
  color: ${({ selected }) => (selected ? theme.white : 'inherit')};
`;

const CloseIcon = styled.img`
  width: 8px;
  height: 8px;
  display: ${({ selected, unselectable }) =>
    selected && unselectable ? 'block' : 'none'};
  margin-left: 7px;
`;

export default class extends React.PureComponent {
  state = {
    expand: false,
  };

  render() {
    const {
      selectData,
      selected = '',
      unselectable = 0,
      onCloseClick,
    } = this.props;
    const { expand } = this.state;
    const dataLength = selectData.length;
    return (
      <SelectBubble>
        {selectData.map((selectDataItem, i) => {
          const isSelected =
            selected.toString() === selectDataItem.value.toString();
          if (i > 1 && !expand) {
            return null;
          }

          return (
            <SelectBubbleItem selected={isSelected} key={selectDataItem.name}>
              <SelectBubbleTitle selected={isSelected}>
                {selectDataItem.name}
              </SelectBubbleTitle>
              <CloseIcon
                src={closeIcon}
                unselectable={unselectable ? 1 : 0}
                selected={isSelected}
                onClick={onCloseClick}
              />
            </SelectBubbleItem>
          );
        })}
        {dataLength > 2 && !expand && (
          <SelectBubbleItem>
            <SelectBubbleTitle onClick={() => this.setState({ expand: true })}>
              +{dataLength - 2}
            </SelectBubbleTitle>
          </SelectBubbleItem>
        )}
      </SelectBubble>
    );
  }
}
