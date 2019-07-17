import React from 'react';
import styled from 'styled-components';
import { media } from '../../utils';
import { Button } from '@components/UI';

const Block = ({ className, title, text, children }) => (
    <section className={className}>
        <h3>{title}</h3>
        <p>{text}</p>
        {children}
    </section>
);

export default styled(Block)`
    background: linear-gradient(115.53deg, #eeeeee 0%, rgba(238, 238, 238, 0.25) 100%);

    color: #232323;

    text-align: center;

    ${media.xs`
        text-align: left;
    `}

    ${media.xsMax`
        padding: 32px 15px;
        box-sizing: border-box;
    `}

    h3 {
        margin: 0;
        line-height: 32px;
        font-size: 24px;

        ${media.xs`
            margin-bottom: 16px;
            line-height: 48px;
            font-size: 40px;
            text-align: left;
        `}

        ${media.md`
            margin-bottom: 28px;
            line-height: 56px;
            font-size: 48px;
            text-align: center;
        `}
    }

    p {
        margin: 0;
        margin-top: 12px;
        margin-bottom: 16px;
        line-height: 24px;
        font-size: 15px;

        ${media.xs`
            margin: 0;
            margin-bottom: 20px;
            line-height: 26px;
            font-size: 16px;
            text-align: left;
        `}

        ${media.md`
            margin-bottom: 36px;
            line-height: 30px;
            font-size: 18px;
        `}
    }

    padding: 32px 15px;

    ${media.xs`
        ${Button} {
            padding: 0 28px;
        }

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    `}
`;
