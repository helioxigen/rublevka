import React from 'react';
import styled from 'styled-components';
import { Content } from '@components/UI';
import { media } from '@utils';

const Hero = ({ className, breadcrumbs, children }) => (
    <header className={className}>
        <Content className="content">
            {breadcrumbs}
            {children}
        </Content>
    </header>
);

export default styled(Hero)`
    background: url('/static/settlements/hero.png') center / cover no-repeat;
    background-attachment: fixed;

    ${media.tablet.to(
        css => css`
            padding: 0 15px;
        `
    )}

    .content {
        padding-top: 28px;
        padding-bottom: 28px;
        box-sizing: border-box;
        height: 400px;
        display: grid;
        grid:
            'nav nav nav' 15px
            '. title .' 1fr
            '. form .' 1fr
            '. . .' 15px
            /
            minmax(0, 1fr)
            minmax(auto, 925px)
            minmax(0, 1fr);

        row-gap: 16px;

        > h1 {
            grid-area: title;

            align-self: end;

            ${media.desktop.at(
                css => css`
                    margin: 0 0 16px;
                `
            )}
        }

        > form {
            grid-area: form;
        }
    }

    /* padding: 0 15px; */
    box-sizing: border-box;

    ${media.desktop.at(
        css => css`
            /* padding: 0 50px; */
        `
    )}
    /* 
    > h1,
    > form {
        grid-column: content-start / span content-end;
    } */

    .breadcrumbs {
        margin: 0;
        /* margin: 0 0 0 16px; */
    }
`;
