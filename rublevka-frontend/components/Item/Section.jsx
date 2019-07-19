import React from 'react';
import styled from 'styled-components';
import { media } from '@utils';

const Section = ({ className, title, children }) => (
    <section className={className}>
        <header>
            <h2>{title}</h2>
        </header>
        {children}
    </section>
);

export default styled(Section)`
    font-size: 21px;

    header {
        margin: 0 0 20px 0;
    }

    h2 {
        font-size: 1em;
        font-weight: bold;
        margin: 0;
    }

    ${media.mediaquery.tablet.to(
        css => css`
            header {
                margin: 0 0 12px 0;
            }
            h2 {
                font-size: 16px;
            }

            & + & {
                margin-top: 17px;
            }
        `
    )}
`;
