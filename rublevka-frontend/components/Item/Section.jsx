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

    ${media.desktop.at(
        css => css`
            padding: 10px 0 0;
        `
    )}

    header {
        margin: 0 0 20px 0;
    }

    h2 {
        font-size: 1em;
        font-weight: bold;
        margin: 0;
    }

    ${media.tablet.to(
        css => css`
            header {
                margin: 0 0 15px 0;
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
