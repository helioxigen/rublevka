import React from 'react';
import styled from 'styled-components';
import { media, sc } from '@utils';
import { Breadcrumbs } from '@components';

const Hero = ({ className, children }) => (
    <header className={className}>
        <div className="hero-container">{children}</div>
    </header>
);

export default styled(Hero)`
    background: url('/static/settlements/hero.png') center / cover no-repeat;
    background-attachment: fixed;
    box-sizing: border-box;

    ${media.lg`
        padding-top: 60px;
    `}

    ${Breadcrumbs} {
        width: 100%;
        margin-bottom: 40px;
    }

    h1 {
        margin: 0 auto 32px;
    }

    height: ${sc.ifProp('item', 600, 400)}px;
`;
