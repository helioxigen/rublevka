import React from 'react';
import styled from 'styled-components';
import { media } from '@utils';

const ListSection = ({ className, children }) => <section className={className}>{children}</section>;

export default styled(ListSection)`
    h2 {
        flex: 0 0 100%;
        margin: 0;
        margin-bottom: 10px;
        line-height: 40px;
        font-size: 32px;
        font-weight: bold;
        color: #232323;

        ${media.md`
            line-height: 48px;
            font-size: 40px;
            margin-bottom: 8px;
        `}
        ${media.lg`
            line-height: 58px;
            font-size: 48px;
            margin-bottom: 9px;
        `}
    }

    a {
        flex: 0 300px;
        padding-top: 6px;
        padding-bottom: 6px;
        display: block;
        line-height: 24px;
        font-size: 16px;
        font-weight: 500;
        color: #232323;
        text-decoration: none;

        &:hover {
            cursor: pointer;
            color: #f44336;
        }

        ${media.xs`
            padding-top: 8px;
            padding-bottom: 8px;
        `}

        ${media.md`
            padding-top: 9px;
            padding-bottom: 9px;
        `}
    }

    > div {
        display: flex;
        flex-wrap: wrap;
    }
`;
