import React from 'react';
import styled from 'styled-components';
import { media } from '@utils';

const OptionsList = ({ className, getItemProps, onItemClick, selectedItem = {}, items = [] }) => (
    <ul className={className}>
        {items.map((item, index) => (
            <li
                key={item.label + item.name}
                {...getItemProps({
                    key: item.label,
                    index,
                    item,
                    // refKey: 'innerRef',
                    onClick: onItemClick ? e => onItemClick(e, item) : undefined,
                })}
                data-selected={selectedItem.value === item.value}
            >
                {item.label}
            </li>
        ))}
    </ul>
);

export default styled(OptionsList)`
    min-width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    font-weight: 500;

    ${media.xs`
        box-sizing: border-box;
    `}

    li {
        line-height: 20px;
        font-size: 16px;

        text-transform: uppercase;
        padding: 8px 16px;
        color: #232323;

        &[data-selected='true'] {
            background: #f44336;
            color: white;
        }
        &:not([data-selected='true']):hover {
            background: rgba(244, 67, 54, 0.25);
            cursor: pointer;
        }
    }
`;
