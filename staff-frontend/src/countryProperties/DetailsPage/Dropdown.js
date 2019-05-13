import React, { useRef } from 'react';
import Downshift from 'downshift';
import styled from 'styled-components';

const Dropdown = styled.div`
  width: 100%;
  position: relative;
`;

const Input = styled.input`
  width: calc(100% - 24px);
  padding: 16px 12px 13px 12px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  appearance: none;

  font-weight: bold;
  font-size: 13px;
  line-height: 15px;
  text-transform: uppercase;
  color: #232323;

  &::placeholder {
    color: #aaaaaa;
  }

  &:focus {
    border: 1px solid #999999;
    outline: none;
  }
`;

const Menu = styled.ul`
  padding: 8px 12px;
  max-width: 100%;
  max-height: 145px;

  position: absolute;
  top: 32px;
  left: 0;
  right: 0;
  z-index: 1;

  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  list-style: none;
  overflow: auto;
`;

const Option = styled.li`
  padding: 8px 0px;
  font-weight: bold;
  font-size: 13px;
  line-height: 15px;
  text-transform: uppercase;

  color: #232323;

  &:hover {
    cursor: pointer;
    color: #3174f6;
  }
`;

export default ({
  placeholder,
  onOpen,
  onSelect,
  onInputValueChange,
  data,
}) => {
  const downshift = useRef(null);
  const textInput = useRef(null);

  const clearState = () => downshift.current.clearSelection();

  return (
    <Downshift
      ref={downshift}
      itemToString={i => (i || {}).name}
      onSelect={() => textInput.current.blur()}
      onChange={(item) => {
        if (item) {
          onSelect(item.id);
          clearState();
        }
      }}
      onInputValueChange={onInputValueChange}
    >
      {({
        getRootProps,
        getInputProps,
        getMenuProps,
        getItemProps,
        isOpen,
        openMenu,
      }) => (
        <Dropdown {...getRootProps()}>
          <Input
            {...getInputProps({
              ref: textInput,
              type: 'text',
              onFocus: () => {
                openMenu();
                onOpen();
              },
              placeholder,
            })}
          />
          {isOpen && (
            <Menu {...getMenuProps()}>
              {data.map((item, index) => (
                <Option {...getItemProps({ key: item.id, item, index })}>
                  {item.name}
                </Option>
              ))}
            </Menu>
          )}
        </Dropdown>
      )}
    </Downshift>
  );
};
