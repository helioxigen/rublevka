import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import { media } from '@utils';

const OfficeLocation = dynamic(() => import('@components/Location/OfficeLocation'));

const Location = ({ className }) => {
    return (
        <section className={className}>
            <h3>Как нас найти</h3>
            <p>Наш офис находится по адресу:</p>
            <address>Рублёво-Успенское шоссе, Жуковка, 44А</address>
            <OfficeLocation />
        </section>
    );
};

export default styled(Location)`
    text-align: center;
    h3,
    p {
        margin: 0;
    }
    h3 {
        margin: 0;
        line-height: 32px;
        font-size: 24px;

        ${media.xs`
            line-height: 48px;
            font-size: 40px;
        `}

        ${media.md`
            line-height: 56px;
            font-size: 48px;
        `}
    }

    p,
    address {
        margin: 0;
        line-height: 24px;
        font-size: 15px;
        margin-top: 12px;

        ${media.xs`
            margin-top: 16px;
            line-height: 28px;
            font-size: 18px;
        `}

        ${media.md`
            line-height: 34px;
            font-size: 21px;
        `}
    }

    address {
        margin: 0 0 16px;
        font-style: normal;

        ${media.xs`
            margin: 0 0 24px;
        `}

        ${media.xs`
            font-weight: bold;
            margin: 0 0 32px;
        `}
    }

    .map-container {
        width: 100%;
        height: 300px;

        ${media.xs`
            height: 522px;
        `}

        ${media.lg`
            height: 640px;
        `}
    }
`;
