import React from 'react';
import styled from 'styled-components';
import { app, media } from '../../utils';
import Tabs from './Tabs';
import { SearchForm } from '../Forms';
// import Form from '../../../rublevka-frontend/src/Landing/Satellites/Form';

const LandingHero = ({ className }) => (
    <section className={className}>
        <h2 className="landing-header">
            Начните поиск лучших
            <br />
            домов на {app.ifDomain('Рублёвке', 'Новой Риге')}
        </h2>
        <Tabs
            tabs={{
                objectNumber: 'Номер объекта',
                sale: 'Продажа',
                rent: 'Аренда',
                settlements: 'Посёлки',
            }}
        >
            {type => <SearchForm key={type} type={type} />}
        </Tabs>
    </section>
);

export default styled(LandingHero)`
    display: grid;
    grid: repeat(2, 1fr) 56px 1fr repeat(2, 1fr) / 10% 1fr repeat(2, 4fr) 1fr 10%;
    height: 100vh;

    background: url('/static/landing/background.jpg') center / cover no-repeat;

    .landing-header {
        margin: 0;
        line-height: 36px;
        font-size: 24px;
        color: #fff;
        font-weight: bold;

        ${media.xs`
            margin: 0;
            line-height: 48px;
            font-size: 40px;
            color: #fff;
            text-shadow: 0px 0px 25px rgba(0, 0, 0, 0.35);
        `}

        ${media.md`
            line-height: 58px;
            font-size: 48px;
            text-shadow: 0px 0px 35px rgba(0, 0, 0, 0.35);
        `}

        grid-row: 2;
        grid-column: 2 / span 2;

        ${media.upToMinDesktop`
            grid-column: 3 / span 2;
        `}

        ${media.xsMax`
            font-size: 28px;
            box-sizing: border-box;
            padding: 0 15px 1em;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            height: 180px;
        `}
    }

    ${Tabs} {
        grid-row: 4;
        grid-column: 3 / span 2;
    }

    ${media.xsMax`
        display: block;
        padding: 0 0 24px;
        height: auto;
        background: url('/static/landing/background.jpg') top / 100% 180px no-repeat;
        background-color: white;
    `}
`;
