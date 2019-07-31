import React from 'react';
import styled from 'styled-components';
import { media } from '@utils';

const ListNav = ({ className, list }) => (
    <aside className={className}>
        <ul>
            {list.map((item, idx) => (
                <li key={`${idx + 1}`}>{item}</li>
            ))}
        </ul>
    </aside>
);

export default styled(ListNav)`
    display: none;
    position: absolute;
    visibility: hidden;
    top: 0;
    bottom: 0;
    right: -13px;

    ${media.xs`
        display: block;
    `}

    ul {
        position: sticky;
        visibility: visible;
        top: 0;
        margin: 0;
        padding: 48px 0px;
        list-style: none;

        ${media.md`
            top: 30px;
            padding: 56px 0px;
        `}
    }

    li {
        line-height: 16px;
        font-size: 13px;
        text-align: center;
        font-weight: bold;
        text-transform: uppercase;

        color: rgba(35, 35, 35, 0.3);

        &:hover {
            color: #232323;
            cursor: pointer;
        }

        &:not(:last-child)::after {
            display: block;
            content: '•';
            line-height: 16px;
            font-size: 13px;
            text-align: center;
            font-weight: bold;

            color: rgba(35, 35, 35, 0.3);
        }
    }
`;
