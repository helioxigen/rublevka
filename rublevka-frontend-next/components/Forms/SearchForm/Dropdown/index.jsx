import React from 'react';
import styled from 'styled-components';

import Downshift from 'downshift';
import DropdownToggle from './DropdownToggle';
import Options from '../Options';
import { media } from '../../../../utils';
import Range from '../Range';

const Dropdown = ({ className, onChange, label, placeholder, items = [], withRange }) => (
    <Downshift
        onChange={item => onChange(item.value)}
        itemToString={item => `${item}`}
        initialSelectedItem={{ value: null }}
    >
        {({ getToggleButtonProps, isOpen, selectedItem, getMenuProps, getItemProps, selectItem }) => (
            <div className={className} data-open={isOpen}>
                <DropdownToggle
                    label={label}
                    value={selectedItem.value || placeholder}
                    getToggleButtonProps={getToggleButtonProps}
                />
                <Options.Menu
                    getToggleButtonProps={getToggleButtonProps}
                    getMenuProps={getMenuProps}
                    isResetButtonActive={selectedItem.value !== null}
                    resetButtonCallback={() => selectItem({ value: null })}
                >
                    {withRange && <Range onChange={onChange} />}
                    {items && <Options.List getMenuProps={getMenuProps} getItemProps={getItemProps} items={items} />}
                </Options.Menu>
            </div>
        )}
    </Downshift>
);

export default styled(Dropdown)`
    margin-top: 8px;
    margin-left: 4px;
    margin-right: 4px;
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
    `}
`;
