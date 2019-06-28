import React from 'react';
import Downshift from 'downshift';
import styled from 'styled-components';
import { isEqual } from 'lodash';

const itemToString = item => {
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
    appearance: none;
    line-height: 15px;
    font-size: 15px;
    font-weight: 500;
    color: #232323;

    &::-webkit-input-placeholder {
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

    &:empty {
        display: none;
    }
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
    dropdown = React.createRef();

    inputRef = React.createRef();

    componentDidUpdate(prevProps) {
        const { items } = this.props;

        if (!isEqual(items, prevProps.items)) {
            this.dropdown.current.selectItem(null);
        }
    }

    getItems = (selectedItem, inputValue) => {
        if (selectedItem !== null && inputValue === selectedItem.label) return [];

        const { items, type = 'from', bound } = this.props;

        const filter = {
            from: item => item.value <= (bound || 100000),
            to: item => item.value >= (bound || -1),
        };

        const filteredItems = items.filter(filter[type]);

        if (inputValue) {
            return filteredItems.filter(item => item.label.startsWith(inputValue));
        }

        return filteredItems;
    };

    blurInput = () => {
        if (this.input) {
            this.input.current.blur();
        }
    };

    render() {
        const { placeholder, onChange, initialValue } = this.props;

        return (
            <Downshift
                ref={this.dropdown}
                onSelect={this.blurInput}
                onChange={value => onChange(value)}
                itemToString={i => itemToString(i)}
                initialSelectedItem={initialValue}
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
                            innerRef={this.input}
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
                                onKeyDown: e => {
                                    if (inputValue === (selectedItem || {}).label && e.keyCode === 8) {
                                        setState({ inputValue: null });
                                    }
                                },
                            })}
                        />
                        <Menu {...getMenuProps({ refKey: 'innerRef', isOpen })}>
                            {this.getItems(selectedItem, inputValue).map((item, index) => (
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
                    </Dropdown>
                )}
            </Downshift>
        );
    }
}
