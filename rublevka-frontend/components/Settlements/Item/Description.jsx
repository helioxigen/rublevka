import React from 'react';
import styled from 'styled-components';
import { media } from '@utils';

const Description = ({ className, text }) => (
    <section className={className}>
        <h2 className="description-title">О посёлке</h2>
        <p className="description-text">{text}</p>
    </section>
);

export default styled(Description)`
    p {
        text-align: center;

        font-size: 15px;
        line-height: 1.55;

        ${media.at(css => ({
            tablet: css`
                font-size: 17px;
            `,
            desktop: css`
                font-size: 20px;
            `,
        }))}
    }
`;
