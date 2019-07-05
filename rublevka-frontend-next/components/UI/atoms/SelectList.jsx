import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const SelectList = ({ className, selected, values, onChange }) => (
    <ul role="menu" className={className}>
        {values.map(([value, label]) => (
            <li
                data-selected={value === selected}
                role="menuitem"
                tabIndex={0}
                onKeyPress={() => onChange(value)}
                onClick={() => onChange(value)}
                key={value}
            >
                {label} {value === selected && <Icon name="checkmark" />}
            </li>
        ))}
    </ul>
);

export default styled(SelectList)`
    background: #ffffff;
    color: #232323;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
    border-radius: 8px;

    font-size: 16px;

    margin: 0;
    padding: 8px 0;

    list-style: none;

    top: 170%;

    ${Icon} {
        display: inline-block;
        width: 13px;
        height: 10px;
    }

    li {
        padding: 8px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        outline: none;
    }

    li[data-selected='true'] {
        background: #f44336;
        color: #ffffff;
    }

    li:not([data-selected='true']) {
        cursor: pointer;

        &:hover {
            background: rgba(244, 102, 92, 0.25);
        }
    }
`;
