import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import dynamic from 'next/dynamic';
import { RadioGroup } from '@components/UI';
import DropdownToggle from './DropdownToggle';
import Options from '../Options';
import { media } from '../../../../utils';
import Range from '../Range';
import CurrencySelector from './CurrencySelector';
import { setCurrency } from '@store';
import PriceRangeNative from '../Range/RangeNative';
import config from '@config';
import { getRangeName } from '../templates';

const Downshift = dynamic(() => import('downshift'));

const Dropdown = ({
    className,
    onChange,
    initialValue = { value: null },
    label,
    placeholder,
    items = [],
    showCurrency,
    type,
    range,
}) => {
    const currency = useSelector(state => state.user.currency);
    const dispatch = useDispatch();
    const handleCurrencyChange = selectItem => cur => {
        selectItem({ value: null }, { isOpen: true });
        dispatch(setCurrency(cur));
    };

    const [isClosing, setIsClosing] = useState(true);

    const [isMenuOpen, setIsOpen] = useState(false);
    const rangeInputRef = useRef(null);

    useEffect(() => {
        if (isMenuOpen && !isClosing) {
            setIsClosing(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsClosing(false);
            }, 230);
        }

        if (rangeInputRef.current && isMenuOpen) {
            rangeInputRef.current.focus();
        }
    }, [isMenuOpen, isClosing]);

    return (
        <Downshift
            onChange={item => onChange(item.value)}
            itemToString={item => `${item}`}
            initialSelectedItem={initialValue}
            onStateChange={s => setIsClosing(!s.isOpen)}
            id={type}
        >
            {({
                getToggleButtonProps,
                isOpen,
                closeMenu,
                selectedItem = {},
                getMenuProps,
                getItemProps,
                getInputProps,
                selectItem,
            }) => (
                <div className={className} data-open={isOpen} data-closing={isClosing}>
                    <DropdownToggle
                        label={label}
                        value={selectedItem.label || placeholder}
                        postfix={
                            <span className="touch-only">
                                {' '}
                                {showCurrency && selectedItem.value
                                    ? config.currencies.find(c => c.code === currency).symbol
                                    : ''}
                            </span>
                        }
                        getToggleButtonProps={getToggleButtonProps}
                    />
                    {type === 'list' && (
                        <select
                            className="native-select touch-only"
                            value={selectedItem.value || 'any'}
                            onChange={e =>
                                selectItem(
                                    e.target.value === 'any'
                                        ? { value: null }
                                        : items.find(i => i.value.toString() === e.target.value.toString())
                                )
                            }
                        >
                            <option key="placeholder" value="any">
                                {placeholder}
                            </option>
                            {items.map(item => (
                                <option key={item.label + item.name} value={item.value} {...getItemProps({ item })}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    )}
                    <Options.Menu
                        getToggleButtonProps={getToggleButtonProps}
                        getMenuProps={getMenuProps}
                        isResetButtonActive={selectedItem.value !== null}
                        onReset={() => selectItem({ value: null })}
                    >
                        {type === 'range' && (
                            <PriceRangeNative
                                className="touch-only native-range"
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
                        {showCurrency && (
                            <RadioGroup
                                className="touch-only"
                                entries={config.currencies.map(({ code, symbol, label: curLabel }) => [
                                    code,
                                    `${curLabel} (${symbol})`,
                                ])}
                                onChange={e => handleCurrencyChange(selectItem)(e.target.value)}
                                value={currency}
                            />
                        )}
                        {type === 'range' && (
                            <Range
                                className="pointer-only"
                                closeMenu={closeMenu}
                                inputRef={rangeInputRef}
                                getInputProps={getInputProps}
                                getItemProps={getItemProps}
                                options={range.options}
                                value={selectedItem.value || {}}
                                isOpen={isOpen}
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
                                className="pointer-only"
                                selectedItem={selectedItem}
                                getMenuProps={getMenuProps}
                                getItemProps={getItemProps}
                                items={items}
                            />
                        )}
                    </Options.Menu>
                    {showCurrency && (
                        <CurrencySelector
                            onOpen={closeMenu}
                            onChange={handleCurrencyChange(selectItem)}
                            initialValue={currency}
                        />
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

    ${Options.Menu} {
        transition: opacity 225ms, transform 225ms;
    }

    &[data-open='true'] ${Options.Menu} {
        transform: translateY(0rem);
        opacity: 1;
    }

    &[data-open='false'] ${Options.Menu} {
        transform: translateY(1rem);
        opacity: 0;
        pointer-events: none;
    }

    position: relative;

    ${media.nonTouch} {
        .touch-only {
            display: none;
        }
    }

    ${media.touch} {
        .pointer-only {
            display: none;
        }
    }

    .native-select {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0;
    }

    ${CurrencySelector} {
        ${media.desktop.to(
            css => css`
                display: none;
            `
        )}
    }

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
