import React from 'react';
import styled from 'styled-components';
import { media, sc } from '@utils';

const Section = ({ className, title, children }) => (
    <section className={className}>
        {title && <h2>{title}</h2>}
        {children}
    </section>
);

export default styled(Section)`
    ${sc.ifProp('wide')('', 'max-width: 925px;')}

    h2,
    p {
        margin: 0;
    }
    h2 {
        text-align: center;

        font-size: 28px;
        line-height: 1.28;
        margin: 0 0 12px;

        ${media.at(css => ({
            tablet: css`
                font-size: 17px;
                margin: 0 0 24px;
            `,
            desktop: css`
                font-size: 44px;
                line-height: 48px;
            `,
        }))}
    }
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
