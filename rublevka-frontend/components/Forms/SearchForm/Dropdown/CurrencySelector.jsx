import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import dynamic from 'next/dynamic';
import Options from '../Options';
import config from '@config';

const Downshift = dynamic(() => import('downshift'));

const Dropdown = ({ className, onChange, onOpen, initialValue }) => {
    const [isMenuOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            onOpen();
        }
    }, [isMenuOpen]);

    return (
        <Downshift
            id="currency-selector"
            onChange={item => onChange(item.value)}
            itemToString={item => `${item}`}
            onStateChange={s => setIsOpen(s.isOpen)}
            initialSelectedItem={{ value: initialValue }}
        >
            {({ getToggleButtonProps, isOpen, selectedItem, getMenuProps, getItemProps }) => (
                <div className={className} data-open={isOpen}>
                    <div className="toggle" {...getToggleButtonProps()}>
                        {config.currencies.find(v => v.code === selectedItem.value).symbol}
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
};

export default styled(Dropdown)`
    outline: none;
    flex-basis: calc(50% - 8px);
    width: 100%;
    z-index: 100;

    color: #232323;
    font-size: 18px;
    font-weight: 600;

    position: absolute;
    width: auto;

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
        padding: 15px;

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

    margin: 0px;
    flex-basis: 33.3333333%;
    border: none;

    &:hover {
        cursor: pointer;
    }

    .menu {
        display: none;
    }

    &[data-open='true'] .menu {
        display: block;
    }
`;
