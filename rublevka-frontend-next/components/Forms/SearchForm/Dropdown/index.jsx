import React from 'react';
import styled from 'styled-components';

import Downshift from 'downshift';
import DropdownToggle from './DropdownToggle';
import Options from '../Options';
import { media } from '../../../../utils';
import Range from '../Range';

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
    type,
    range,
}) => (
    <Downshift
        onChange={item => onChange(item.value)}
        itemToString={item => `${item}`}
        initialSelectedItem={initialValue}
    >
        {({ getToggleButtonProps, isOpen, selectedItem, getMenuProps, getItemProps, getInputProps, selectItem }) => (
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
                            getInputProps={getInputProps}
                            getItemProps={getItemProps}
                            options={range}
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
                {children}
            </div>
        )}
    </Downshift>
);

export default styled(Dropdown)`
    margin: 8px 4px 0;
    background: #ffffff;
    outline: none;
    flex-basis: calc(50% - 8px);
    width: 100%;

    &:first-child,
    &:first-of-type {
        flex-basis: 100%;
    }

    ${media.xs`
        position: relative;
    `}

    ${media.md`
      margin: 0px;
      flex-basis: 33.3333333%;
      border: none;
      padding: 1.5px;

      &:hover {
        cursor: pointer;
      }

      ${Options.Menu} {
          display: none;
      }

      &[data-open="true"] ${Options.Menu} {
          display: block;
      }

      transition: box-shadow 0.2s;

      &[data-open="true"] {
          box-shadow: inset 0px 0px 6px rgba(153, 153, 153, 0.4);
      }
    `}
`;
