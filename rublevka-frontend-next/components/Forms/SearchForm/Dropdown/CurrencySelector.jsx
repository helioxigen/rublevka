import React from 'react';
import styled from 'styled-components';

import Downshift from 'downshift';
import Options from '../Options';
import { media } from '../../../../utils';
import config from '@config';

const Dropdown = ({ className, onChange, initialValue }) => (
    <Downshift onChange={item => onChange(item)} itemToString={item => `${item}`} initialSelectedItem={initialValue}>
        {({ getToggleButtonProps, isOpen, selectedItem, getMenuProps, getItemProps }) => (
            <div className={className} data-open={isOpen}>
                <div className="toggle" {...getToggleButtonProps()}>
                    {selectedItem.label}
                </div>
                <div className="menu" {...getMenuProps()}>
                    <Options.List
                        getMenuProps={getMenuProps}
                        getItemProps={getItemProps}
                        selectedItem={selectedItem}
                        items={config.currencies.map(v => ({
                            label: v.symbol,
                            value: v.code,
                        }))}
                    />
                </div>
            </div>
        )}
    </Downshift>
);

export default styled(Dropdown)`
    outline: none;
    flex-basis: calc(50% - 8px);
    width: 100%;
    z-index: 100;

    color: #232323;
    font-size: 18px;

    position: absolute;
    width: auto;

    padding: 15px;
    right: 0;
    bottom: 0;

    &:first-child,
    &:first-of-type {
        flex-basis: 100%;
    }

    .menu {
        position: absolute;
        width: 100%;
        border-radius: 8px;
        max-height: 300px;
        padding: 8px 0;
        border: 1px solid #d9d9d9;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
        background: white;

        width: auto;
        top: 110%;
        right: 10%;
    }

    .toggle {
        display: flex;
        align-items: center;

        &::after {
            content: '';
            display: block;
            margin-left: 4px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 4px 4px 0 4px;
            border-color: #232323 transparent transparent transparent;
        }
    }

    li {
        padding: 8px 16px;
    }

    ${media.md`
      margin: 0px;
      flex-basis: 33.3333333%;
      border: none;

      &:hover {
        cursor: pointer;
      }

      .menu {
          display: none;
      }

      &[data-open="true"] .menu {
          display: block;
      }
    `}
`;
