import React from 'react';
import styled from 'styled-components';
import { Button } from '@components/UI';
import { media } from '../../utils';

const Block = ({ className, title, text, children }) => (
    <section className={className}>
        {title && <h3>{title}</h3>}
        {text && <p>{text}</p>}
        {children}
    </section>
);

export default styled(Block)`
    background: linear-gradient(115.53deg, #eeeeee 0%, rgba(238, 238, 238, 0.25) 100%);
    box-sizing: border-box;

    padding: 32px 15px;

    ${media.at(css => ({
        phoneL: css`
            padding: 0 45px;
            text-align: left;

            display: flex;
            justify-content: center;
            flex-direction: column;

            height: 530px;
            min-height: 100%;
        `,
        tablet: css`
            align-items: flex-start;
        `,
    }))}

    h3, p {
        margin: 0;
    }

    h3 {
        font-size: 24px;
        text-align: inherit;
        line-height: 1.3;

        ${media.at(css => ({
            phoneL: css`
                font-size: 40px;
                margin: 0 0 16px;
            `,
            desktop: css`
                font-size: 48px;
                margin: 0 0 28px;
            `,
        }))}
    }

    p {
        font-size: 15px;
        line-height: 1.5;

        margin: 12px 0 16px;

        ${media.at(css => ({
            phoneL: css`
                font-size: 16px;
                margin: 12px 0 20px;
            `,
            tablet: css`
                font-size: 18px;
                margin: 12px 0 36px;
            `,
        }))}
    }

    .sell-button {
        font-size: 17px;
    }

    ${media.tablet.at(
        css => css`
            ${Button} {
                font-size: 17px;
            }
        `
    )}
`;
