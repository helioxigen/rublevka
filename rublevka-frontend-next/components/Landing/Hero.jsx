import React from 'react';
import styled from 'styled-components';
import { Header } from '../UI';
import { app } from '../../utils';
import Tabs from './Tabs';
// import Form from '../../../rublevka-frontend/src/Landing/Satellites/Form';

const LandingHero = ({ className }) => (
    <section className={className}>
        <Header.Landing>
            Начните поиск лучших
            <br />
            домов на {app.ifDomain('Рублёвке', 'Новой Риге')}
        </Header.Landing>
        {/* <Form /> */}
        {/* <Tabs
            tabs={{
                objectNumber: '№ объекта',
                sell: 'Продажа',
                rent: 'Аренда',
                settlements: 'Посёлки',
            }}
        >

        </Tabs> */}
    </section>
);

export default styled(LandingHero)`
    background-image: url('/static/landing/background.jpg');
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
`;
