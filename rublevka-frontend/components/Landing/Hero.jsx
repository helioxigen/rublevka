import React from 'react';
import styled from 'styled-components';
import { SearchForm } from '@components/Forms';
import { app, media } from '@utils';
import Tabs from './Tabs';
import Header from './Header';
// import Form from '../../../rublevka-frontend/src/Landing/Satellites/Form';

const LandingHero = ({ className }) => (
    <section className={className}>
        <Header>
            Начните поиск лучших
            <br />
            домов на {app.ifDomain('Рублёвке', 'Новой Риге')}
        </Header>
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
    grid:
        auto 2fr 56px 3fr auto /
        [start] 10%
        [border-start] 1fr
        [middle-start]
        repeat(2, 4fr)
        [middle-end] 1fr
        [border-end] 10%
        [end];

    /* grid-template-rows: auto 1fr 56px 1fr auto; */

    ${media.phoneL.to(
        css => css`
            display: block;
            padding: 0 0 24px;
            height: auto;
            background: url('/static/landing/background.jpg?size=480') top / 100% 180px no-repeat;
            background-color: white;
        `
    )}

    ${media.phoneL.at(
        css => css`
            min-height: 100vh;
        `
    )}

    background: url('/static/landing/background.jpg') center / cover no-repeat;

    ${Header} {
        grid-row: 2;
        grid-column: border-start / span border-end;

        align-self: end;

        ${media.desktop.at(
            css => css`
                grid-column: border-start / span [middle-end];
            `
        )}
    }

    ${Tabs} {
        grid-row: 4;
        grid-column: border-start / border-end;

        ${media.desktopL.at(
            css => css`
                grid-column: middle-start / span middle-end;
            `
        )}
    }

    ${SearchForm} {
        padding: 0 15px;
        ${media.phoneL.at(
            css => css`
                padding: 0;
            `
        )}
    }
`;
