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
    (selected ? theme.blue : theme.buttonGray)};

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
    (selected && unselectable ? 'block' : 'none')};
  margin-left: 7px;
`;

export default class extends React.PureComponent {
  state = {
    expand: false,
  };

  render() {
    const {
      options,
      selected = '',
      unselectable = 0,
      onCloseClick,
      onChange,
    } = this.props;
    const { expand } = this.state;
    const dataLength = options.length;
    return (
      <SelectBubble>
        {options.map((selectDataItem, i) => {
          const { value } = selectDataItem;
          const isSelected = String(selected) === String(value);
          if (i > 1 && !expand) {
            return null;
          }

          return (
            <SelectBubbleItem
              selected={isSelected}
              key={selectDataItem.label}
              onClick={() => onChange(value)}
            >
              <SelectBubbleTitle selected={isSelected}>
                {selectDataItem.label}
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
          <SelectBubbleItem onClick={() => this.setState({ expand: true })}>
            <SelectBubbleTitle>+{dataLength - 2}</SelectBubbleTitle>
          </SelectBubbleItem>
        )}
      </SelectBubble>
    );
  }
}
