import React from 'react';
import styled from 'styled-components';
import { Summary } from '@components/Item';
import { Button, Content } from '@components/UI';
import { media, sc } from '@utils';

const Hero = ({ className, breadcrumbs, children }) => (
    <header className={className}>
        <Content>{breadcrumbs}</Content>
        <div className="hero-container">
            <section className="hero-content">{children}</section>
        </div>
    </header>
);

export default styled(Hero)`
    background: url('/static/settlements/hero.png') center / cover no-repeat;
    background-attachment: fixed;

    padding-top: 48px;

    ${media.desktop.at(
        css => css`
            padding: 60px 50px 0;
        `
    )}

    ${Summary} {
        justify-content: space-around;
        text-align: center;

        .summary-value {
            font-size: 48px;
            font-weight: 900;
            margin-bottom: 4px;
        }
        .summary-label {
            color: white;
            font-size: 18px;
        }
    }

    .hero-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .hero-container > ${Button} {
        display: block;
        font-size: 15px;
        font-weight: 600;

        margin-bottom: 64px;
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

    height: ${sc.ifProp('item')(600, 400)}px;

    color: white;

    .summary-label {
        color: white;
    }
`;
