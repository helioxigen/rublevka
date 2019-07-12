import React from 'react';
import styled from 'styled-components';
import { Header } from '../UI';
import { app } from '../../utils';
import Tabs from './Tabs';
import { SearchForm } from '../Forms';
// import Form from '../../../rublevka-frontend/src/Landing/Satellites/Form';

const LandingHero = ({ className }) => (
    <section className={className}>
        <Header.Landing>
            Начните поиск лучших
            <br />
            домов на {app.ifDomain('Рублёвке', 'Новой Риге')}
        </Header.Landing>
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
    background: url('/static/landing/background.jpg') center / 100%;
    height: 100vh;

    display: grid;
    grid: repeat(2, 1fr) 56px 1fr repeat(2, 1fr) / 10% 1fr repeat(2, 4fr) 1fr 10%;

    ${Header.Landing} {
        grid-row: 2;
        grid-column: 2 / span 2;
    }

    ${Tabs} {
        grid-row: 4;
        grid-column: 3 / span 2;
    }
`;
