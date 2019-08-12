import React from 'react';
import styled from 'styled-components';
import { Button, Content } from '@components/UI';
import { media } from '@utils';

const Hero = ({ className, children }) => (
    <header className={className}>
        <Content className="content">{children}</Content>
        {/* <div className="hero-container">{children}</div> */}
    </header>
);

export default styled(Hero)`
    background: url('/static/settlements/hero.png') center / cover no-repeat;
    background-attachment: fixed;

    ${media.at(css => ({
        tablet: css`
            margin: 0 0 28px;
        `,
        desktop: css`
            margin: 0 0 40px;
        `,
    }))}

    .content {
        display: grid;
    grid: 
        'title' auto / 1fr;

    padding: 48px 0;


    ${media.desktop.at(
        css => css`
            grid:
                'nav nav' 58px
                'title form' 350px
                'span span' 58px / auto 375px;

            padding: 0 8%;

            grid-column-gap: 8%;
            /* height: 440px; */
        `
    )}
    }

    .breadcrumbs {
        margin: 0 0 11px;
        align-self: end;

    }

    .title {
        align-self: center;

        h1 {
            color: white;
        }

        ${media.desktop.to(
            css => css`
                text-align: center;
            `
        )}
    }

    .hero-container {
        max-width: 1110px;
        /* display: flex;
        align-items: center;
        justify-content: space-between; */
        
        margin: 0 auto;
        position: relative;
        box-sizing: border-box;

        height: 240px;
        padding: 48px 0;

        ${media.tablet.at(
            css => css`
                height: 440px;
                padding: 58px 0;
            `
        )}
        /* grid:
            'breadcrumbs' min-content
            75px
            'title' min-content
            'button' 28px / min-content 98px min-content; */
    }

    .breadcrumbs {
        /* position: absolute;
        top: 32px; */
    }

    .title {
        grid-area: title;
    }

    .callback-form {
        grid-area: form;

        display: none;

        ${media.desktop.at(
            css => css`
                display: flex;
                flex-direction: column;
                justify-content: center;
            `
        )}
    }

    h1 {
        font-size: 28px;
        line-height: 36px;

        ${media.desktop.at(
            css => css`
                font-size: 44px;
                line-height: 56px;
            `
        )}
    }

    ${media.desktop.to(
        css => css`
            .desktop-only {
                display: none;
            }
        `
    )}

    ${media.desktop.at(
        css => css`
            .phone-only {
                display: none;
            }
        `
    )}

    .hero-container > ${Button} {
        display: block;
        font-size: 15px;
        font-weight: 600;

        grid-area: title;
    }

    .subheader {
        margin-bottom: 40px;
    }

    .item-header {
        margin: 65px 0 24px;
    }

    .list-header {
        margin: 40px 0 32px;
    }

    color: white;

    .summary-label {
        color: white;
    }
`;
