import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../utils';

const OptionsList = ({ className, getMenuProps, getItemProps, selectedItem = {}, items = [] }) => (
    <ul className={className} {...getMenuProps({ refKey: 'innerRef' })}>
        {items.map((item, index) => (
            <li
                key={item.value}
                {...getItemProps({
                    key: item.value,
                    index,
                    item,
                    refKey: 'innerRef',
                })}
                selected={selectedItem.value === item.value}
            >
                {item.name}
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
        background-color: #fff;
        padding: 16px 20px;
        box-sizing: border-box;
        border-radius: 8px;
        max-height: 300px;
        border: 1px solid #d9d9d9;
    `}

    li {
        line-height: 18px;
        font-size: 15px;
        font-weight: bold;

        text-transform: uppercase;
        padding: 8px 0px;
        color: #232323;

        &[selected='true'] {
            color: #f44336;
        }

        &:hover {
            color: #f44336;
            cursor: pointer;
        }
    }
`;
