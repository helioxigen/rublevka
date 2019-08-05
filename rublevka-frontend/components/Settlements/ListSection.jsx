import React from 'react';
import styled from 'styled-components';
import { media } from '@utils';

const ListSection = ({ className, children }) => <section className={className}>{children}</section>;

export default styled(ListSection)`
    h2 {
        flex: 0 0 100%;
        margin: 0 0 10px;

        font-size: 36px;
        line-height: 40px;
        font-weight: bold;
        color: #232323;
        text-transform: uppercase;
    }

    a {
        flex: 0 300px;
        padding: 6px 0;
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

        ${media.at(css => ({
            phoneL: css`
                padding: 8px 0;
            `,
            tablet: css`
                padding: 9px 0;
            `,
        }))}
    }

    > div {
        display: flex;
        flex-wrap: wrap;
    }
`;
