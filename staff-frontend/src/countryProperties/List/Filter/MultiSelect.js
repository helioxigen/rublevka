import React, { useState, useRef } from 'react';
import Downshift from 'downshift';
import styled from 'styled-components';
import Block from './Block';

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

const SelectedOptions = styled.div`
  margin: 2px -2px -2px -2px;
  display: flex;
  flex-wrap: wrap;
`;

const SelectedOption = styled.div`
  margin: 2px;
  display: flex;
  align-items: baseline;
  width: fit-content;
  height: fit-content;
  padding: 8px 10px 5px 12px
  border-radius: 4px;
  background: #fff;
  border: 1px solid #d9d9d9;
`;

const Label = styled.p`
  margin: 0;
  font-size: 14px;
  color: #232323;
`;

const DeleteButton = styled.button`
  margin-left: 2px;
  padding: 4px;
  border: none;
  background: none;
  font-size: 10px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export default ({
  title,
  currentValue = null,
  remove,
  placeholder,
  onOpen,
  onSelect,
  onInputValueChange,
  data,
}) => {
  const [selected, updateSelected] = useState([]);
  const downshift = useRef(null);
  const textInput = useRef(null);

  const clearState = () => downshift.current.clearSelection();

  return (
    <Block
      title={title}
      hasValue={(currentValue || []).length > 0}
      remove={() => {
        updateSelected([]);
        clearState();
        remove();
      }}
    >
      <Downshift
        ref={downshift}
        itemToString={i => (i || {}).name}
        onSelect={() => textInput.current.blur()}
        onChange={(item) => {
          if (item) {
            updateSelected(() => {
              const newValues = [...selected, item];

              onSelect(newValues.map(el => el.id));
              return newValues;
            });

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
          inputValue,
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
                onKeyDown: (e) => {
                  if (!inputValue && e.keyCode === 8 && selected.length > 0) {
                    updateSelected(() => {
                      const newValues = selected.slice(0, selected.length - 1);

                      onSelect(newValues.map(el => el.id));
                      return newValues;
                    });
                  }
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
      <SelectedOptions>
        {selected.map((el, index) => (
          <SelectedOption key={el.id}>
            <Label>{el.name}</Label>
            <DeleteButton
              onClick={() => {
                updateSelected(() => {
                  const newValues = [
                    ...selected.slice(0, index),
                    ...selected.slice(index + 1, selected.length),
                  ];

                  onSelect(newValues.map(item => item.id));
                  return newValues;
                });
              }}
            >
              ✕
            </DeleteButton>
          </SelectedOption>
        ))}
      </SelectedOptions>
    </Block>
  );
};
