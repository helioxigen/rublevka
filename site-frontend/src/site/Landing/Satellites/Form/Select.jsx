import React from 'react';
import Downshift from 'downshift';
import styled from 'styled-components';

const itemToString = (item) => {
  if (item) {
    return item.label;
  }

  return '';
};

const Dropdown = styled.div`
  width: 100%;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 12px 14px 12px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  line-height: 15px;
  font-size: 15px;
  font-weight: 500;
  color: #232323;

  &::-webkit-placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border: 1px solid #999999;
  }
`;

const Menu = styled.ul`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 3;
  max-width: 100%;
  max-height: 150px;
  padding: 8px 12px;
  list-style: none;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  overflow-y: auto;
`;

const Item = styled.li`
  margin: 0;
  padding: 8px 0px;
  line-height: 15px;
  font-size: 13px;
  color: #232323;
  font-weight: 500;

  &:hover {
    cursor: pointer;
    color: #3498db;
  }
`;

export default class Select extends React.Component {
  getItems = (inputValue) => {
    const { prefix, type = 'from', bound } = this.props;
    let values = [];

    if (type === 'from') {
      values = [{ id: 1, label: `1 ${prefix}`, value: 1 }];

      for (let i = 10; i <= bound; i += 10) {
        values = [...values, { id: i, label: `${i} ${prefix}`, value: i }];
      }
    } else {
      for (let i = Math.max(bound, 10); i <= 300; i += 10) {
        values = [...values, { id: i, label: `${i} ${prefix}`, value: i }];
      }
    }

    if (inputValue) {
      return values.filter(item => item.label.startsWith(inputValue));
    }

    return values;
  };

  blurInput = () => {
    if (this.input) {
      this.input.blur();
    }
  };

  render() {
    const { placeholder, onChange } = this.props;

    return (
      <Downshift
        onSelect={this.blurInput}
        onChange={value => onChange(value)}
        itemToString={i => itemToString(i)}
      >
        {({
          getRootProps,
          getInputProps,
          getMenuProps,
          getItemProps,
          isOpen,
          openMenu,
          closeMenu,
          setState,
          selectedItem,
          inputValue,
        }) => (
          <Dropdown {...getRootProps({ refKey: 'innerRef' })}>
            <Input
              innerRef={el => (this.input = el)}
              {...getInputProps({
                isOpen,
                placeholder,
                onFocus: () => openMenu(),
                onBlur: () => {
                  if (!inputValue) {
                    setState({ selectedItem: null });
                  } else {
                    setState({ inputValue: selectedItem.label });
                  }

                  closeMenu();
                },
                onKeyDown: (e) => {
                  if (inputValue === (selectedItem || {}).label && e.keyCode === 8) {
                    setState({ inputValue: null });
                  }
                },
              })}
            />
            {isOpen && (
              <Menu {...getMenuProps({ refKey: 'innerRef', isOpen })}>
                {this.getItems(
                  selectedItem !== null && inputValue === selectedItem.label ? '' : inputValue,
                ).map((item, index) => (
                  <Item
                    key={item.id}
                    {...getItemProps({
                      refKey: 'innerRef',
                      item,
                      index,
                    })}
                  >
                    {itemToString(item)}
                  </Item>
                ))}
              </Menu>
            )}
          </Dropdown>
        )}
      </Downshift>
    );
  }
}
