import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Downshift from 'downshift';
import DropdownToggle from './DropdownToggle';
import Options from '../Options';
import { media } from '../../../../utils';
import Range from '../Range';
import CurrencySelector from './CurrencySelector';
import { setCurrency } from '@store';

const getRangeName = ({ from, to }, template) => {
    if (!from && !to) {
        return '';
    }

    if ((from && to) || (from === 0 && !!to)) {
        return template(`${from} - ${to}`);
    }

    if (from || from === 0) {
        return template(`От ${from}`);
    }

    if (to) {
        return template(`До ${to}`);
    }

    return '';
};

const Dropdown = ({
    className,
    onChange,
    initialValue = { value: null },
    children,
    label,
    placeholder,
    items = [],
    showCurrency,
    type,
    range,
}) => {
    const currency = useSelector(state => state.user.currency);
    const dispatch = useDispatch();
    const handleCurrencyChange = cur => dispatch(setCurrency(cur));

    const [isMenuOpen, setIsOpen] = useState(false);
    const rangeInputRef = useRef(null);

    useEffect(() => {
        if (rangeInputRef.current && isMenuOpen) {
            rangeInputRef.current.focus();
        }
    }, [isMenuOpen]);

    return (
        <Downshift
            onChange={item => onChange(item.value)}
            itemToString={item => `${item}`}
            initialSelectedItem={initialValue}
            onStateChange={s => setIsOpen(s.isOpen)}
            id={type}
        >
            {({
                getToggleButtonProps,
                isOpen,
                closeMenu,
                selectedItem,
                getMenuProps,
                getItemProps,
                getInputProps,
                selectItem,
            }) => (
                <div className={className} data-open={isOpen}>
                    <DropdownToggle
                        label={label}
                        value={selectedItem.label || placeholder}
                        getToggleButtonProps={getToggleButtonProps}
                    />
                    <Options.Menu
                        getToggleButtonProps={getToggleButtonProps}
                        getMenuProps={getMenuProps}
                        isResetButtonActive={selectedItem.value !== null}
                        resetButtonCallback={() => selectItem({ value: null })}
                    >
                        {type === 'range' && (
                            <Range
                                closeMenu={closeMenu}
                                inputRef={rangeInputRef}
                                getInputProps={getInputProps}
                                getItemProps={getItemProps}
                                options={range.options}
                                value={selectedItem.value || {}}
                                onChange={value =>
                                    selectItem(
                                        {
                                            label: getRangeName(
                                                {
                                                    ...selectedItem.value,
                                                    ...value,
                                                },
                                                range.template
                                            ),
                                            value: {
                                                ...selectedItem.value,
                                                ...value,
                                            },
                                        },
                                        {
                                            isOpen: true,
                                        }
                                    )
                                }
                            />
                        )}
                        {type === 'list' && (
                            <Options.List
                                selectedItem={selectedItem}
                                getMenuProps={getMenuProps}
                                getItemProps={getItemProps}
                                items={items}
                            />
                        )}
                    </Options.Menu>
                    {showCurrency && (
                        <CurrencySelector onOpen={closeMenu} onChange={handleCurrencyChange} initialValue={currency} />
                    )}
                </div>
            )}
        </Downshift>
    );
};

export default styled(Dropdown)`
    background: #ffffff;
    outline: none;
    width: 100%;

    &:first-child,
    &:first-of-type {
        flex-basis: 100%;
    }

    &[data-open='false'] ${Options.Menu} {
        display: none;
    }

    position: relative;

    ${media.md`
      margin: 0px;
      flex-basis: 33.3333333%;
      border: none;
      padding: 1.5px;

      &:hover {
        cursor: pointer;
      }

      transition: box-shadow 0.2s;

      &[data-open="true"] {
          box-shadow: inset 0px 0px 6px rgba(153, 153, 153, 0.4);
      }
    `}
`;
