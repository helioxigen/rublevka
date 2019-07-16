import React from 'react';
import styled from 'styled-components';
import { media, sc } from '@utils';
import { Breadcrumbs } from '@components';
import { Summary } from '@components/Item';
import { Button } from '@components/UI';
import { SearchForm } from '@components/Forms';

const Hero = ({ className, breadcrumbs, children }) => (
    <header className={className}>
        <div className="hero-container">
            {breadcrumbs}
            <section className="hero-content">{children}</section>
        </div>
    </header>
);

export default styled(Hero)`
    background: url('/static/settlements/hero.png') center / cover no-repeat;
    background-attachment: fixed;

    ${media.lg`
        padding-top: 60px;
    `}

    ${Breadcrumbs} {
        width: 100%;
    }

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

    .hero-content {
        width: 925px;
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

    height: ${sc.ifProp('item', 600, 400)}px;

    color: white;

    .summary-label {
        color: white;
    }
`;
